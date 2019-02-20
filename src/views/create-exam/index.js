import React, { Component } from 'react'

import Header from '../global/header'
import { getData, handleSwitch, handleEvent } from './../../redux-modules/modules/question'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Switch from "react-switch";
import Select from 'react-select'
import { examTypes } from '../../utils/common'
import { apiClient } from '../../utils/apiClient'
import { checkProperties } from '../../utils/common'
import { assessmentShow } from '../../utils/exam'
import ErrorModal from '../global/error_modal'
import { error } from './../global/modal'

import 'react-confirm-alert/src/react-confirm-alert.css'
import '../../styles/create-exam.scss'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: props.match.params.id,
      examId: props.match.params.examId,
      step: 'BasicForm',
      category: 'knowledge',
      examTypes: [],
      
    }
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentDidMount() {
    if (this.state.examId) {
      this.props.getData(this.state.assessmentId, this.state.step, false, this.state.examId)
    }
    else {
      this.props.getData(this.state.assessmentId, this.state.step)      
    }
    examTypes.call(this, {category: this.state.category})
  }

  onSubmit() {
    const assessmentId = this.state.assessmentId
    const examId = this.state.examId

    let data = {
      exam: this.props.exam.basicForm
    }
    if (examId) {
      const path = `v1/assessments/${assessmentId}/exams/${examId}`
      const request = {
        exam: {
          name: data.exam.name,
          exam_type: data.exam.exam_type
        }
      }
      apiClient('put', path, request).then(() => {
        this.props.history.push({pathname: `/exam/${assessmentId}`})
      })
      return
    }

    if (data.exam.include_question === false) {
      const path = `v1/assessments/${assessmentId}/exams`
      data.exam.question_count = 0
      
      apiClient('post', path, data).then(response => {
        this.props.history.push({pathname: `/exam/${assessmentId}`})
      }).catch(err => {
        error({
          message: `Gagal membuat soal, silahkan periksa kembali data yang dibutuhkan`,
          btns: [
            {
              label: 'Ulangi',
              className: 'btn bcred cwhite'
            }
          ]
        })
      })
    }
    else if (data.exam.include_question === true) {
      const path = `v1/assessments/${assessmentId}/exams/validate?step=${this.state.step}`
      apiClient('post', path, data).then(response => {
        this.props.history.push({pathname: `/question/${assessmentId}`, data: data})
      }).catch(err => {
        if (err.response.data.errors.exam.question_count[0].case === 'check_question_count') {
          error({
            message: 'Jumlah soal tidak boleh lebih kecil dari jumlah kompetensi dasar yang terdapat di topik.',
            btns: [
              {
                label: 'Ulangi',
                className: 'btn bcred cwhite'
              }
            ]
          })
        }
        else {
          error({
            message: `Gagal membuat soal, silahkan periksa kembali data yang dibutuhkan`,
            btns: [
              {
                label: 'Ulangi',
                className: 'btn bcred cwhite'
              }
            ]
          })
        }        
      })
    }
  }


  render() {
    let disable = false
  
    if (this.props.exam.switch) {
      if (checkProperties(this.props.exam.basicForm)) {
        disable = true
      }
    }
    else {
      if (this.props.exam.basicForm) {
        if (this.props.exam.basicForm.name === '' || this.props.exam.basicForm.exam_type === '') {
          disable = true
        }
      }
    }

    let name = ''
    let question_count = ''
    let examType = null

    if (this.props.exam.basicForm) {
      name = this.props.exam.basicForm.name
      question_count = this.props.exam.basicForm.question_count
      examType = this.props.exam.basicForm.exam_type
    }
    return (
      <div className="padding-content create-exam">
        <Header />
        <div className="margin-8">
          <div className="content-wrapper">
            <div className="create-exam__title-wrapper">
              <div className="create-exam__form-title">{this.state.examId ? "Ubah Tugas" : "Tambah Tugas"}</div>
              <div className="create-exam__line"></div>
            </div>
            <div className="create-exam__form-wrapper">
              {
                !this.state.examId &&
                <div className="d-flex create-exam__input h-auto mb-5">
                  <Switch
                    onChange={this.props.handleSwitch}
                    checked={this.props.exam.switch}
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
              }
              <label className="create-exam__label">Judul Tugas</label>
              <input type="text" className="form-control create-exam__input" placeholder="Masukkan Judul Tugas" onChange={event => this.props.handleEvent(event.target.value, "name", this.state.step)} value={name}/>
              <label className="create-exam__label">Tipe Tugas</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.examTypes.find(type => {return type.value === examType})}
                onChange={event => this.props.handleEvent(event.value, 'exam_type', this.state.step)}
                options={this.state.examTypes} 
                placeholder='Pilih Tipe Tugas' />
              <div className={!this.props.exam.switch ? "d-none" : ""}>
                <label className="create-exam__label">Jumlah Soal Tugas</label>
                <input type="text" className="form-control create-exam__input create-exam__input-amount mt-0" placeholder="Masukkan Jumlah Soal Tugas" 
                value={question_count} onChange={event => this.props.handleEvent(event.target.value, "question_count", this.state.step)} disabled={this.state.examId ? true : false}/>
              </div>
            </div>
            <button onClick={this.onSubmit} className="create-exam__button" disabled={this.state.examId ? false : disable}>{this.state.examId ? "Simpan" : "Lanjut"}</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  exam: state.question,
  switch: state,
  test: state
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getData,
    handleSwitch,
    handleEvent
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Index)