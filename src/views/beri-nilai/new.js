import React, { Component } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from './content'
import { apiClient } from '../../utils/apiClient'

let choice = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
  { value: 'e', label: 'E' },
]

export default class New extends Component {
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
    }

    this.getGenerateForm = this.getGenerateForm.bind(this)
    this.getStudent = this.getStudent.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.onChangeEssay = this.onChangeEssay.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
  }

  componentDidMount() {
    this.getStudent()
    this.getGenerateForm()
  }

  getGenerateForm() {
    const url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam}/exam_scores/${this.state.student_id}`
    console.log(url, "my url")
    apiClient('get', url).then(response => {
      console.log(response.data.data, "response get form")
      this.setState({
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

  handleSave(e, table) {
    console.log(this.state.valueData, " hit here")
    var rowData = [];
    var rows = table.getElementsByTagName('tr');
    let quest_id = {}
    this.state.question.map((array) => {
      quest_id = array.id
    })
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells[1].innerHTML === 'Essay') {
        rowData.push({
          user_id: this.props.match.params.student_id,
          exam_id: this.props.match.params.exam_id,
          class_id: this.props.match.params.class_id,
          exam_question_id: quest_id,
          ans: this.state.essay.answer,
          score: this.state.essay.score
        })


      } else {
        rowData.push({
          user_id: this.props.match.params.student_id,
          exam_id: this.props.match.params.exam_id,
          class_id: this.props.match.params.class_id,
          ans: this.state.valueData.label,
          score:this.state.score_choice,
          exam_question_id: quest_id,

        })

      }
    }
    console.log("here hit now", rowData)

  }


  onChangeEssay(e, prop) {
    e.preventDefault()
    var dv = this.state.essay
    dv[prop] = e.target.value
    this.setState({ essay: dv })

  }

  onChangeSelect(event, props) {
    console.log(event, props, "my event");
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
          />
        </div>
      </div>
    )
  }
}