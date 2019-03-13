import React, { Component } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'
import { error, modal } from './../global/modal'

import Header from '../global/header'
import Content from './content'
import { apiClient } from '../../utils/apiClient'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataScoreQuestion } from './../../redux-modules/modules/score'
import { getStudent } from './../../redux-modules/modules/student'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Page from './../../components/Title'

class New extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeMenu: 1,
      startDate: null,
      endDate: null,
      data: [],
      student: {},
      valueData: {},
      exam: props.match.params.exam_id,
      question: [],
      studentId: this.props.match.params.student_id,
      class_id: props.match.params.class_id,
      assessment_id: props.match.params.assessment_id,
      student_id: props.match.params.student_id,
      profile: {},
      score_choice: 0,
      essay: {
        answer: '',
        score: ''
      },
      choice: [],
      is_correct: ''
    }

    this.getStudent = this.getStudent.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.onChangeEssay = this.onChangeEssay.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.redirect = this.redirect.bind(this)
    this.handleSaveDate = this.handleSaveDate.bind(this)
  }

  componentDidMount() {
    this.getStudent()
    this.props.getDataScoreQuestion(this.state.assessment_id, this.state.exam, this.state.student_id, this.state.class_id, this.props.location.state.conditon)
    this.props.getStudent(this.state.student_id)
  }

  redirect() {
    this.props.history.push({
      pathname: '/assessment/' + this.state.assessment_id + '/exam/' + this.state.exam + '/class/' + this.state.class_id,
      state: { assessment_category: this.props.location.state.conditon }
    })
  }


  getStudent() {
    const url = `/v1/students/${this.state.student_id}`

    apiClient('get', url).then(response => {
      console.log(response)
      this.setState({
        student: response.data.data,
      })
    })
  }

  handleSave(e) {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose, onConfirm }) => {
        return (
          <div className="react-confirm-alert modal-alert">
            <div className="react-confirm-alert-body">
              <div className="header align-center">
                <h1>Apakah anda yakin? </h1>
              </div>
              <div className="react-confirm-alert-button-group toggle">
                <div className="align-center fullwidth">
                  <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                  <a href="javascript:void(0);" className="btn green" onClick={() => { this.handleSaveDate(); onClose(); }}>Yakin</a>
                </div>
              </div>
            </div>
          </div>
        )
      },
    })
  }

  handleSaveDate() {
    let arrayData = this.props.data_score && this.props.data_score.score && this.props.data_score.score.data && this.props.data_score.score.data.exam_question;
    let arrayDataSkill = this.props.data_score && this.props.data_score.score && this.props.data_score.score.data && this.props.data_score.score.data.question_skill;
    let type = this.props.location.state.conditon
    let data = {}
    let dataWillSave = []
    console.log(type)
    if (type === 'skill') {
      console.log(arrayDataSkill, "array skill")
      arrayDataSkill.map((x, index) => {
        x.question_score.map((data) => {
          dataWillSave.push({ ans: data.user_problem_answer.ans, exam_question_id: data.id, score: data.user_problem_answer.score })
        })
      })

    } else {
      arrayData.map((data) => {
        dataWillSave.push({ ans: data.ans, exam_question_id: data.exam_question_id, score: data.score })
      })
    }

    data['user_problem_answers'] = dataWillSave
    let url = `v1/assessments/${this.props.match.params.assessment_id}/exams/${this.props.match.params.exam_id}/exam_scores/${this.props.match.params.student_id}/bulk_fill_answers`
    apiClient('post', url, data).then(res => {
      modal({
        message: 'Berhasil',
        description: 'Data yang Anda masukkan benar',
        btns: [
          {
            label: 'Selesai',
            className: 'btn green',
            event: this.props.history.push({
              pathname: '/assessment/' + this.state.assessment_id + '/exam/' + this.state.exam + '/category/' + this.props.location.state.conditon + '/class/' + this.state.class_id,
              state: { assessment_category: this.props.location.state.conditon }
            })
          }
        ]
      })
    })
      .catch(err => {
        let response = err.response
        let data = response.data.status_code
        if (data === 400) {
          error({
            message: 'Gagal semua form harus diisi',
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


  onChangeEssay(e, prop) {
    e.preventDefault()
    var dv = this.state.essay
    dv[prop] = e.target.value
    this.setState({ essay: dv })

  }

  onChangeSelect(event, props) {
    let is_answer = ''
    props.map((array) => {
      is_answer = array.is_correct_ans
    })
    if (is_answer === null) {
      this.setState({
        valueData: event,
        score_choice: 0
      })
    } else {
      this.setState({
        score_choice: 0,
        valueData: event
      })
    }

  }

  render() {
    const path = `/assessment/${this.state.assessment_id}/exam/${this.state.exam}/category/${this.props.location.state.conditon}/class/${this.state.class_id}/flag/true`
    return (
      <Page title="Memberi Nilai">
        <Header navbar={false} location={path} />
        <div className="padding-content ">
          <div className="margin-content">
            <div className="content-block main-block bg-grey">
              <div className="content-wrapper content-wrap-custom-size ">
                <Content
                  dataProfile={this.state.profile}
                  subjects={this.state.subjects}
                  studentId={this.state.studentId}
                  form={this.state.question}
                  // student={this.state.student}
                  handleSave={this.handleSave}
                  onChangeEssay={this.onChangeEssay}
                  essay={this.state.essay}
                  onChangeSelect={this.onChangeSelect}
                  valueData={this.state.valueData}
                  score_choice={this.state.score_choice}
                  choice={this.state.choice}
                  type={this.props.location.state.conditon}
                />
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  data_score: state,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreQuestion, getStudent }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(New);

