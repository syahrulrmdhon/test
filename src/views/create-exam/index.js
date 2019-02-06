import React, { Component } from 'react'

import Header from '../global/header'
import Switch from "react-switch";
import Select from 'react-select'
import { examTypes } from '../../utils/common'
import { apiClient } from '../../utils/apiClient'
import { checkProperties } from '../../utils/common'

import '../../styles/create-exam.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: props.match.params.id,
      checked: true,
      examTypes: [],
      // selectedType: null,
      form: {
          title: '',
          totalQuestion: '',
          selectedType: null
      },
    }
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this)
    this.handleTypeOptionChange = this.handleTypeOptionChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getSession = this.getSession.bind(this)
  }

  componentDidMount() {
    examTypes.call(this, {category: 'knowledge'})
    this.getSession('BasicForm')
  }

  handleCreateQuestion(checked) {
    this.setState({ checked })
  }

  handleTypeOptionChange(type) {
    this.setState({ selectedType: type});
  }

  onChange(event, prop) {
    const data = this.state.form
    data[prop] = event.target.value
    this.setState({form: data})
  }

  onClick() {
    
  }

  getSession(step) {
    let path = `v1/assessments/${this.state.assessmentId}/exams/new?step=${step}`
    apiClient('get', path).then(res => {
      const data = res.data.data
      const examType = data.exam.exam_type
      const form = this.state.form
      const selectedType = this.state.examTypes.find( type => type.value === examType );
      form.title = data.exam.name
      form.totalQuestion = data.exam.question_count
      form.selectedType = selectedType
      this.setState({form: form})
    })
  }

  render() {
    let disable = false
    
    if (checkProperties(this.state.form)) {
      console.log('aaa')
      disable = true
    }
    console.log(disable)
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
                onChange={event => this.handleTypeOptionChange(event)}
                options={this.state.examTypes} 
                placeholder='Pilih Tipe Tugas' />
              <div className={!this.state.checked ? "d-none" : ""}>
                <label className="create-exam__label">Jumlah Soal Tugas</label>
                <input type="text" className="form-control create-exam__input create-exam__input-amount mt-0" placeholder="Masukkan Jumlah Soal Tugas" disabled={this.state.checked ? false : true} value={this.state.form.totalQuestion} onChange={event => this.onChange(event, "totalQuestion")}/>
              </div>
            </div>
            <button className="create-exam__button">Lanjut</button>
          </div>
        </div>
      </div>
    )
  }
}
