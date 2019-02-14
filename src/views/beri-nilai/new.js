import React, { Component } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from './content'
import { apiClient } from '../../utils/apiClient'
import { setError } from './../../utils/common'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataScoreQuestion } from './../../redux-modules/modules/score'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

let choice = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
  { value: 'e', label: 'E' },
]

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
      studentId: this.props.match.params.id,
      class_id: props.match.params.class_id,
      assessment_id: props.match.params.assessment_id,
      student_id:props.match.params.student_id,
      profile: {},
      score_choice: 0,
      essay: {
        answer: '',
        score: ''
      },
      choice:[],
      is_correct:''
    }

    this.getGenerateForm = this.getGenerateForm.bind(this)
    this.getStudent = this.getStudent.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.onChangeEssay = this.onChangeEssay.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.redirect = this.redirect.bind(this)
    this.handleSaveDate = this.handleSaveDate.bind(this)
  }

  componentDidMount() {
    this.getStudent()
    this.getGenerateForm()
    this.props.getDataScoreQuestion(this.state.assessment_id, this.state.exam, this.state.student_id, this.state.class_id )

  }

  redirect(){
    this.props.history.push({
      pathname:'/assessment/'+this.state.assessment_id +'/exam/'+ this.state.exam + '/class/'+ this.state.class_id,
    })
  }

  getGenerateForm() {
    const url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam}/exam_scores/${this.state.student_id}`
    console.log(url, "my url")
    apiClient('get', url).then(response => {
      let array = response.data.data.collections[0];
      let choicePG = [];
      // let correct= []
      array.exam_question_choices.map((x, i ) => {
            choicePG.push({value:x.symbol, label:x.symbol })
      })
      response.data.data.collections.map((dt,i)=>{
        dt.exam_question_choices.map((cx,i) =>{
            if(cx.is_correct_ans  === true){
                console.log('here', cx.symbol)
            }
      })
    })

    

    this.setState({

        choice:choicePG,
        data: response.data.data,
        question: response.data.data.collections
      })
    })
  }

  getStudent() {
    const url = `/v1/students/5f5bc281-9906-4b2e-b87c-29867361c7bf`

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
                            <h1> Penilaian berhasil dibuat </h1>
                        </div>
                        <div className="react-confirm-alert-button-group toggle">
                            <div className="align-center fullwidth">
                                <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                                <a href="javascript:void(0);" className="btn green" onClick={() => {this.handleSaveDate(); onClose();}}>Yakin</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
    })
  }

  handleSaveDate(){
    let arrayData =  this.props.data_score && this.props.data_score.score && this.props.data_score.score.data && this.props.data_score.score.data.exam_question;

    let data = {}
    data['user_problem_answers'] =  arrayData
    console.log("here hit now", data)
    let url = `v1/assessments/${this.props.match.params.assessment_id}/exams/${this.props.match.params.exam_id}/exam_scores/${this.props.match.params.student_id}/bulk_fill_answers`
    
    apiClient('post', url, data).then(res => {
      this.redirect()
  })
      .catch(err => {
          let response = err.response
          let data = response.data
          // if(this.state.email || this.state.password === ''){
          //     this.setState({
          //         errors: setError(data),
          //     })
          // }else{
          //     this.onShowAlert(data)
          //     console.log("or here")
          // }
          
        console.log(err)
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
    console.log("render id", this.props.data_score)
    return (
      <div className="detail bg-grey">
        <Header navbar={false} />
        <div className="content-wrapper content-wrap-custom-size ">
          <Content
            dataProfile={this.state.profile}
            subjects={this.state.subjects}
            studentId={this.state.studentId}
            form={this.state.question}
            student={this.state.student}
            handleSave={this.handleSave}
            onChangeEssay={this.onChangeEssay}
            essay={this.state.essay}
            onChangeSelect = {this.onChangeSelect}
            valueData = {this.state.valueData}
            score_choice={this.state.score_choice}
            choice={this.state.choice}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data_score: state
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreQuestion }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(New);

