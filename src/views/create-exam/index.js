import React, { Component } from 'react'

import Header from '../global/header'
import Switch from "react-switch";
import Select from 'react-select'
import { examTypes } from '../../utils/common'
import { apiClient } from '../../utils/apiClient'
import { checkProperties } from '../../utils/common'
import { assessmentShow } from '../../utils/exam'
import '../../styles/create-exam.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: props.match.params.id,
      category: 'knowledge',
      checked: true,
      examTypes: [],
      form: {
          title: '',
          totalQuestion: '',
          selectedType: null 
      },
      data: []
    }
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getSession = this.getSession.bind(this)
    this.btnClick = this.btnClick.bind(this)
  }

  componentDidMount() {
    assessmentShow.call(this, this.state.assessmentId)
    examTypes.call(this, {category: this.state.category})
    this.getSession('BasicForm')
  }

  handleCreateQuestion(checked) {
    const form = this.state.form

    if (!checked) {
      form.totalQuestion = 0
    }

    this.setState({ checked, form: form})
  }

  onChange(event, prop) {
    const data = this.state.form

    if (prop === 'selectedType') {
      data[prop] = event
    }
    else {
      data[prop] = event.target.value
    }
    this.setState({form: data})
  }

  getSession(step) {
    const path = `v1/assessments/${this.state.assessmentId}/exams/new?step=${step}`
    
    apiClient('get', path).then(res => {
      const data = res.data.data

      if (data.hasOwnProperty('exam')) {
        const form = this.state.form
        const examType = data.exam.exam_type
        const selectedType = this.state.examTypes.find( type => type.value === examType )
        form.title = data.exam.name || ''
        form.totalQuestion = data.exam.question_count || ''
        form.selectedType = selectedType || ''
        this.setState({form: form})
      }
    })
  }

  btnClick() {
    const assessmentId = this.state.assessmentId
    let path = `v1/assessments/${assessmentId}/exams/validate?step=BasicForm`
    let data = {
      assessment_id: assessmentId,
      name: this.state.form.title,
      exam_type: this.state.form.selectedType.value,
      question_count: !this.state.form.totalQuestion.length ? 0 : this.state.form.totalQuestion,
      include_question: this.state.checked
    }

    if (!this.state.checked) {
      path = `v1/assessments/${assessmentId}/exams`
      data.exam_questions_attributes = []
    }

    apiClient('post', path, data)
    if (!this.state.checked) {
      this.props.history.push({pathname: `/exam/${assessmentId}`})
    }
    else {
      path = `v1/assessments/${assessmentId}/exams/validate?step=BasicForm`
      data.is_remedial = false
      apiClient('post', path, data).then(response => {
        if (response.status === 200){
          this.props.history.push({pathname: `/question/${assessmentId}`, data: this.state.form})
        }
      })
    }
  }

  render() {
    let disable = false
    
    if (this.state.checked) {
      if (checkProperties(this.state.form)) {
        disable = true
      }
    }
    else {
      if (this.state.data.title === '' || this.state.data.selectedType === null) {
        disable = true
      }
    }

    return (
      <div className="padding-content create-exam">
        <Header />
        <div className="margin-8">
          <div className="content-wrapper">
            <div className="create-exam__title-wrapper">
              <div className="create-exam__form-title">Tambah Tugas</div>
              <div className="create-exam__line"></div>
            </div>
            <div className="create-exam__form-wrapper">
              <div className="d-flex create-exam__input h-auto mb-5">
                <Switch
                  onChange={this.handleCreateQuestion}
                  checked={this.state.checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onHandleColor="#ffffff"
                  onColor="#1a9d7f"
                  offColor="#cccccc"
                  id="normal-switch"
                  height={18}
                  width={35} />
                <label className="create-exam__label pl-2">Buat Soal Online</label>
              </div>
              <label className="create-exam__label">Judul Tugas</label>
              <input type="text" className="form-control create-exam__input" placeholder="Masukkan Judul Tugas" onChange={event => this.onChange(event, "title")} value={this.state.form.title}/>
              <label className="create-exam__label">Tipe Tugas</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.form.selectedType}
                onChange={event => this.onChange(event, 'selectedType')}
                options={this.state.examTypes} 
                placeholder='Pilih Tipe Tugas' />
              <div className={!this.state.checked ? "d-none" : ""}>
                <label className="create-exam__label">Jumlah Soal Tugas</label>
                <input type="text" className="form-control create-exam__input create-exam__input-amount mt-0" placeholder="Masukkan Jumlah Soal Tugas" 
                  disabled={this.state.checked ? false : true} value={this.state.form.totalQuestion} onChange={event => this.onChange(event, "totalQuestion")}/>
              </div>
            </div>
            <button onClick={this.btnClick} className="create-exam__button" disabled={disable}>Lanjut</button>
          </div>
        </div>
      </div>
    )
  }
}
