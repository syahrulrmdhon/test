import React, { Component } from 'react'
import Header from '../global/header'
import { getData, handleSwitch, handleEvent, handleNumber } from './../../redux-modules/modules/question'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TabNumber from '../../components/TabContent/TabContent'
import Select from 'react-select'
import { questionTypes } from '../../utils/common'
import { apiClient } from '../../utils/apiClient'
import { getQuestion } from '../../utils/exam'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Choices from "./choices"
import ErrorModal from '../global/error_modal'
import { error, modal } from './../global/modal'
import Page from './../../components/Title'

var FontAwesome = require('react-fontawesome')

class Question extends Component {
  constructor(props) {
    super(props)
    this.state= {
      assessmentId: props.match.params.id,
      step: 'QuestionForm',
      examId: props.match.params.examId || '',
      activeNumber: 1,
      
      questionTypes: [],
      isError: false,
      errorMessage: '',
    }

    this.numbers = this.numbers.bind(this)
    this.toggle = this.toggle.bind(this)
    this.addChoices = this.addChoices.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getData(this.state.assessmentId, this.state.step, false, this.state.examId)
    this.props.handleNumber(this.state.activeNumber, false)
    questionTypes.call(this)
  }
  
  toggle(number) {
    if (!this.state.examId) {
      this.props.getData(this.state.assessmentId, this.state.step, number)
    }
    this.props.handleNumber(number, false)
    if (this.state.activeNumber !== number) {
      this.setState({
        activeNumber: number,
      })
    }
  }

  numbers() {
    let result = []
    if (this.props.exam.questionForm) {
      for (let counter = 1; counter <= this.props.exam.questionForm.exam.question_count; counter++) {
        result.push(counter)
      }
    }
    return result
  }

  addChoices() {
    const choices = this.props.exam.questionForm.exam.exam_questions_attributes[this.props.exam.number - 1].exam_question_choices_attributes
    
    choices.push({order: (choices.length - 1) + 1})
    this.props.handleEvent(choices, 'exam_question_choices_attributes', this.state.step)
  }

  onSubmit() {
    const path = `v1/assessments/${this.state.assessmentId}/exams/validate?`
    let data = {
      exam_question: this.props.exam.questionForm.exam.exam_questions_attributes[this.props.exam.number - 1]
    }
    let params = {
      step: this.state.step,
      number: this.state.activeNumber
    }
    
    if (isNaN(data.exam_question.weight)) {
      error({
        message: `Bobot nilai harus berupa angka`,
        btns: [
          {
            label: 'Ulangi',
            className: 'btn bcred cwhite'
          }
        ]
      })
      return false
    }
    else if (data.exam_question.weight > 100) {
      error({
        message: `Bobot nilai tidak boleh lebih dari 100`,
        btns: [
          {
            label: 'Ulangi',
            className: 'btn bcred cwhite'
          }
        ]
      })
      return false
    }

    if (this.state.examId) {
      const path = `v1/assessments/${this.state.assessmentId}/exams/${this.state.examId}`
      
      data = this.props.exam.questionForm.exam.exam_questions_attributes

      const request = {
        exam: {
          exam_questions_attributes: data
        }
      }

      apiClient('put', path, request).then((response) => {
        modal({
          message: 'Berhasil',
          description: `Soal berhasil disimpan`,
          btns: [
            {
              label: 'Selesai',
              className: 'btn green',
            }
          ]
        })
      })
      return
    }

    apiClient('post', path, data, params).then(() => {
      if (this.props.exam.questionForm.exam.question_count > this.props.exam.number) {
        this.setState({
          activeNumber: this.state.activeNumber + 1
        })
        this.props.handleNumber(1)
        this.props.getData(this.state.assessmentId, this.state.step, this.props.exam.number)
      }
      else if (this.props.exam.questionForm.exam.question_count == this.props.exam.number){
        let path = `v1/assessments/${this.state.assessmentId}/exams`

        this.props.getData(this.state.assessmentId, this.state.step)
        let body = {
          exam_question: this.props.exam.questionForm.exam
        }

        apiClient('post', path, body).then(response => {
          const examId = response.data.data.exam.id
          this.setState({examId: examId})
          this.confirmAlert()
        })
      }
    }).catch(err => {
      if (!err.response.data.errors.exam_questions.length) {
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
      else if (err.response.data.errors.exam.fill_exam_question_comps[0].case === 'check_all_comps'){
        error({
          message: `Ada kompetensi dasar yang belum digunakan`,
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

  redirect(to) {
    if (to === 'back') {
      this.props.history.push({pathname: `/exam/${this.state.assessmentId}`})
    }
    else if (to === 'next') {
      this.props.history.push({pathname: `/pariticipant-class/${this.state.assessmentId}/assessment/${this.state.examId}/exam`})
    }
  }

  confirmAlert(text) {
    confirmAlert({
      customUI: ({ onClose, onConfirm, id}) => {
        return (
          <div className="create-exam">
            <div className="react-confirm-alert modal-alert ">
                <div className="react-confirm-alert-body">
                    <div className="header align-center">
                        <h1>Tugas Berhasil Disimpan</h1>
                    </div>
                    <div className="alert-body">
                      Soal telah disimpan. Pilih Kelas dan Peserta Didik?
                    </div>
                    <div className="react-confirm-alert-button-group toggle">
                        <div className="align-center fullwidth">
                            <a href="javascript:void(0);" onClick={() => {this.redirect('back'); onClose(); }} className="btn default">Tidak</a>
                            <a href="javascript:void(0);" className="btn green" onClick={() => {this.redirect('next'); onClose(); }}>Ya</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )
      },
    })
  }

  render() {
    
    let data = this.props.exam.questionForm
    let basicCompetences = []
    let selectedBasicCompetence = ''
    let weight = ''
    let problem_type = ''
    let question = ''
    let index = this.state.activeNumber - 1
    let choices = []
    let numbers = this.numbers()
    let error = []
    let questionCount = ''
    
    if (data) {
      basicCompetences = this.props.exam.basicCompetencies
      selectedBasicCompetence = data.exam.exam_questions_attributes[index] ? data.exam.exam_questions_attributes[index].basic_comp_id : null
      weight = data.exam.exam_questions_attributes[index] ? data.exam.exam_questions_attributes[index].weight : ''
      problem_type = data.exam.exam_questions_attributes[index] ? data.exam.exam_questions_attributes[index].problem_type : null
      question = data.exam.exam_questions_attributes[index] ? data.exam.exam_questions_attributes[index].question : 'null'
      questionCount = data.exam.question_count
    }

    if (problem_type === 'multiple_choice') {
      if(data.exam.exam_questions_attributes[index].exam_question_choices_attributes.length > 0){
        data.exam.exam_questions_attributes[index].exam_question_choices_attributes.map((x, idx) => {
          choices.push(
            <Choices key={idx} order={idx} correctAnswer={this.props.exam.is_correct_ans}/>
          )
        })
      }
    }
    
    if (this.state.isError && this.state.errorMessage !== ''){
      error.push(<ErrorModal key={Math.random()} status="error" message={this.state.errorMessage} />)
      this.setState({
        isError: false,
      })
    }

    let menu = this.props.location.state.status
    let path = ''

    if (menu === 'create-exam') {
      path = `/create-exam/${this.state.assessmentId}`
    }
    else {
      path = `/all-question/${this.state.assessmentId}/assessment/${this.state.examId}/exam/`
    }

    return (
      <Page title="Buat Tugas">
              <Header navbar={true} location={path} />

      <div className="padding-content create-exam question-wrapper">
        {error}
        <div className="margin-content">
          <div className="content-wrapper">
            <div className="create-exam__title-wrapper">
              <div className="create-exam__form-title">{this.state.examId ? "Ubah Soal" : "Buat Soal"}</div>
              <div className="create-exam__line"></div>
            </div>
            <div className="create-exam__form-wrapper">
              <label className="create-exam__label">Nomor Soal</label>
              <TabNumber className='create-exam__input' tab={numbers} toggle={this.toggle} activeTab={this.state.activeNumber}/>
              <label className="create-exam__label">Kompetensi Dasar</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={basicCompetences.find(competence => {return competence.value === selectedBasicCompetence}) || null}
                onChange={event => this.props.handleEvent(event.value, 'basic_comp_id', this.state.step)}
                options={basicCompetences}
                placeholder='Pilih Kompetensi Dasar' />
              <label className="create-exam__label">Bobot Nilai</label>
              <input type="text" className="form-control create-exam__input create-exam__input-amount" onChange={(event) => this.props.handleEvent(event.target.value, 'weight', this.state.step)} value={weight} placeholder="Masukkan Bobot Nilai" />
              <div className="create-exam__separate" />
              <label className="create-exam__label">Tipe Soal</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.questionTypes.find(type => {return type.value === problem_type}) || null}
                onChange={event => this.props.handleEvent(event.value, 'problem_type', this.state.step)}
                options={this.state.questionTypes}
                placeholder='Pilih Tipe Soal' />

                { problem_type &&
                  <div>
                    <label className="create-exam__label">Soal</label>
                    <textarea className="form-control create-exam__input w-100" rows="5" placeholder="Berikan Pertanyaan" onChange={(event) => this.props.handleEvent(event.target.value, 'question', this.state.step)} value={question}/>
                    <div className={(problem_type === 'essay') ? 'd-block' : 'd-none'}>
                      <label className="create-exam__label">Berikan Jawaban</label>
                      <textarea className="form-control create-exam__input w-100" rows="5" placeholder="Berikan Jawaban" onChange={(event) => this.props.handleEvent(event.target.value, 'content', this.state.step, 0)} 
                        value={this.props.exam.questionForm.exam.exam_questions_attributes[this.state.activeNumber - 1].exam_question_choices_attributes[0].content}/>
                    </div>
                    <div className={(problem_type === 'multiple_choice') ? 'd-block' : 'd-none'}>
                      <label className="create-exam__label">Berikan Jawaban</label>
                      {choices}
                      <div className="add-wrapper" onClick={this.addChoices}>
                        <div className="add-icon">+</div>
                        Tambah
                      </div>
                    </div>
                  </div>
                }
            </div>
            {/* <button className="create-exam__button create-exam__button--back">Kembali</button> */}
            <button className="create-exam__button" onClick={this.onSubmit}>{this.state.examId ? "Simpan" : (this.state.activeNumber == questionCount) ? "Simpan" : "Lanjut"}</button>
          </div>
        </div>
      </div>
      </Page>
    )
  }
}


const mapStateToProps = (state, props) => ({
  exam: state.question,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getData,
    handleSwitch,
    handleEvent,
    handleNumber
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Question)