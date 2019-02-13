import React, { Component } from 'react'
import Header from '../global/header'
import Numbers from './numbers'
import TabNumber from '../../components/TabContent/TabContent'
import Select from 'react-select'
import { questionTypes } from '../../utils/common'
import { apiClient } from '../../utils/apiClient'
import { getQuestion } from '../../utils/exam'
import { confirmAlert } from 'react-confirm-alert'
var FontAwesome = require('react-fontawesome')

import 'react-confirm-alert/src/react-confirm-alert.css'


import Choices from "./choices"

export default class question extends Component {
  constructor(props) {
    super(props)
    this.state= {
      assessmentId: props.match.params.id,
      examId: '',
      activeNumber: 1,
      filled: [],
      step: 'QuestionForm',
      data: {
        exam: {
          question_count: null
        }
      },
      form: {
        problem_type: null,
        exam_question_choices_attributes: [{order: 0, symbol: '', content: ''},],
        weight: '',
        basic_comp_id: null,
        question: '',
        school_subject_id: ''
      },
      questionTypes: [],
      selectedBasicCompetence: null,
      selectedQuestionType: null,
      is_correct_ans: 0
    }

    this.numbers = this.numbers.bind(this)
    this.toggle = this.toggle.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addChoices = this.addChoices.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
    this.reset = this.reset.bind(this)
    this.checkNextNumber = this.checkNextNumber.bind(this)
    this.setForm = this.setForm.bind(this)
  }

  componentDidMount() {
    getQuestion.call(this, this.state.assessmentId, this.state.activeNumber)
    questionTypes.call(this)
  }

  setForm(number) {
    let activeNumber = this.state.activeNumber

    if (number) {
      activeNumber = number 
    }
    const data = this.state.data.exam.exam_questions_attributes[activeNumber - 1]

    if (!this.state.data.exam.exam_questions_attributes.length || data === undefined) {
      this.reset()
      return false
    }

    const type = this.state.questionTypes.find(type => type.value === data.problem_type || null)
    const competence = this.state.data.assessment_basic_comps.find(competence => competence.value === data.basic_comp_id)
    const correctAnswer = data.exam_question_choices_attributes.find(choice => {
      return choice.is_correct_ans === true
    })
    this.setState({
      form: {
        problem_type: data.problem_type || null,
        exam_question_choices_attributes: data.exam_question_choices_attributes || [{order: 0}],
        weight: data.weight || '',
        basic_comp_id: data.basic_comp_id || null,
        question: data.question || '',
        school_subject_id: data.school_subject_id || ''
      },
      selectedQuestionType: type,
      selectedBasicCompetence: competence,
      is_correct_ans: correctAnswer.order
    })
  }
  
  componentDidUpdate(prevProps, nextState) {
    if (nextState.data !== this.state.data) {
      if (this.state.activeNumber === 1) {
        this.setForm()
      }
      else if (nextState.activeNumber === this.state.activeNumber) {
        this.setForm(this.state.activeNumber)
      }
    }
  }

  toggle(number) {
    const data = this.state.data.exam.exam_questions_attributes[number - 1]
    
    if (this.state.activeNumber !== number) {
      this.setState({
        activeNumber: number,
      })
    }
  
      this.setForm(number)
  }

  checkNextNumber(number) {
    getQuestion.call(this, this.state.assessmentId, this.state.activeNumber)
    
    if (this.state.data.exam.exam_questions_attributes.length == parseInt(this.state.data.exam.question_count) || (parseInt(this.state.data.exam.question_count) - this.state.data.exam.exam_questions_attributes.length) === 1) {
      let path = `v1/assessments/${this.state.assessmentId}/exams`
      apiClient('post', path, this.state.data).then(response => {
        this.confirmAlert()
      })
    }
    else if (this.state.data.exam.exam_questions_attributes.length < this.state.data.exam.question_count){
      this.setState({activeNumber: this.state.activeNumber + 1})
      this.setForm(number)
    }
    if (!this.state.data.exam.exam_questions_attributes.length) {
      return false
    }
  }

  numbers() {
    let result = []
    for (let counter = 1; counter <= this.state.data.exam.question_count; counter++) {
        result.push(counter)
    }
    return result
  }

  onChange(event, prop, id) {
    const data = this.state.form

    if (prop === 'problem_type') {
      data[prop] = event.value
      this.setState({selectedQuestionType: event})
    }
    else if (prop === 'basic_comp_id') {
      data[prop] = event.value
      data.school_subject_id = event.school_subject_id
      this.setState({selectedBasicCompetence: event})
    }
    else if (prop === 'symbol' || prop === 'content') {
      const index = data.exam_question_choices_attributes.findIndex(choice => {
        return choice.order === id;
      })
      data.exam_question_choices_attributes[index][prop] = event.target.value
    }
    else if (prop === 'is_correct_ans') {
      data.exam_question_choices_attributes.map(choice => delete choice[prop])
      this.state[prop] = parseInt(event.target.id)
    }
    else if (prop === 'answerEssay') {
      if (this.state.form.problem_type )
      this.state[prop] = event.target.value
    }
    else {
      data[prop] = event.target.value
    }

    this.setState({form: data})
  }

  addChoices() {
    const choices = this.state.form.exam_question_choices_attributes
    choices.push({order: (choices.length - 1) + 1})
    this.setState({
      form: {
        ...this.state.form,
        exam_question_choices_attributes: choices
      }
    })
  }

  reset() {
    this.setState({
      selectedBasicCompetence: null,
      selectedQuestionType: null,
      form: {
        exam_question_choices_attributes: [{order: 0}],
        weight: '',
        problem_type: null,
        basic_comp_id: null,
        question: '',
        school_subject_id: ''
      },
      is_correct_ans: 0

    })
  }

  saveHandler() {
    const path = `v1/assessments/${this.state.assessmentId}/exams/validate?`
    const form = this.state.form
    const data = {
      exam_question: form
    }
    const correctAnswer = this.state.is_correct_ans
    data.exam_question.exam_question_choices_attributes[correctAnswer].is_correct_ans = true
    let params = {}

    if(this.state.step !== null){
      params['step'] = this.state.step
    }

    if(this.state.activeNumber !== null) {
      params['number'] = this.state.activeNumber
    }
    apiClient('post', path, data, params).then((response) => {

    if (this.state.data.exam.question_count > 1) {
      this.checkNextNumber(this.state.activeNumber)
      this.reset()
    }
    else if (this.state.data.exam.question_count == 1) {
      let path = `v1/assessments/${this.state.assessmentId}/exams`
      apiClient('post', path, this.state.data).then(response => {
        const examId = response.data.data.exam.id
        this.setState({examId: examId})
        this.confirmAlert()
      })
    }
    })
  }

  redirect(to) {
    if (to === 'back') {
      this.props.history.push({pathname: `/exam/${this.state.assessmentId}`})
    }
    else if (to === 'next') {
      this.props.history.push({pathname: `/pariticipant-class/9${this.state.assessmentId}/assessment/${this.state.examId}/exam`})
    }
  }

  confirmAlert() {
    confirmAlert({
      customUI: ({ onClose, onConfirm, id}) => {
          return (
            <div className="create-exam">
              <div className="react-confirm-alert modal-alert ">
                  <div className="react-confirm-alert-body">
                      <div className="header align-center">
                          <h1>Tugas Berhasil Disimpan</h1>
                          <FontAwesome name="times-circle" className="close" onClick={onClose}/>
                      </div>
                      <div className="alert-body">
                        Apakah anda ingin lanjut mengisi form untuk memilih Kelas dan Peserta Didik?
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
    let choices = []
    if (this.state.form.problem_type === 'multiple_choice') {
      if(this.state.form.exam_question_choices_attributes.length > 0){
        this.state.form.exam_question_choices_attributes.map((x, idx) => {
          choices.push(
            <Choices changed={this.onChange} key={idx} id={idx} correctAnswer={this.state.is_correct_ans} data={this.state.form}/>
          )
        })
      }
    }
    
    let numbers = this.numbers()
    return (
      <div className="padding-content create-exam question-wrapper">
        <Header />
        <div className="margin-8">
          <div className="content-wrapper">
            <div className="create-exam__title-wrapper">
              <div className="create-exam__form-title">Buat Soal Online</div>
              <div className="create-exam__line"></div>
            </div>
            <div className="create-exam__form-wrapper">
              <label className="create-exam__label">Nomor Soal</label>
              <TabNumber class='create-exam__input' tab={numbers} toggle={this.toggle} activeTab={this.state.activeNumber}/>
              <label className="create-exam__label">Kompetensi Dasar</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.selectedBasicCompetence}
                onChange={event => this.onChange(event, 'basic_comp_id')}
                options={this.state.data.assessment_basic_comps}
                placeholder='Pilih Kompetensi Dasar' />
              <label className="create-exam__label">Bobot Nilai</label>
              <input type="text" className="form-control create-exam__input create-exam__input-amount" onChange={(event) => this.onChange(event, 'weight')} value={this.state.form.weight} placeholder="Masukkan Bobot Nilai" />
              <div className="create-exam__line" />
              <label className="create-exam__label">Tipe Soal</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.selectedQuestionType}
                onChange={event => this.onChange(event, 'problem_type')}
                options={this.state.questionTypes}
                placeholder='Pilih Tipe Soal' />

                { this.state.form.problem_type &&
                  <div>
                    <label className="create-exam__label">Soal</label>
                    <textarea className="form-control create-exam__input w-100" rows="5" placeholder="Berikan Pertanyaan" onChange={(event) => this.onChange(event, 'question')} value={this.state.form.question}/>
                    <div className={(this.state.selectedQuestionType.value === 'essay') ? 'd-block' : 'd-none'}>
                      <label className="create-exam__label">Berikan Jawaban</label>
                      <textarea className="form-control create-exam__input w-100" rows="5" placeholder="Berikan Jawaban" onChange={(event) => this.onChange(event, 'content', 0)} 
                        value={this.state.form.exam_question_choices_attributes[0].content}/>
                    </div>
                    <div className={(this.state.selectedQuestionType.value === 'multiple_choice') ? 'd-block' : 'd-none'}>
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
            <button className="create-exam__button" onClick={this.saveHandler}>Simpan</button>
          </div>
        </div>
      </div>
    )
  }
}