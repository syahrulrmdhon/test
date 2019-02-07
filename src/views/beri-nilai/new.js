import React, { Component } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from './content'
import { apiClient } from '../../utils/apiClient'

export default class New extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeMenu: 1,
      startDate: null,
      endDate: null,
      data:[],
      student:{},
      question:[],
      studentId: this.props.match.params.id,
      profile: { 
        user: {
          full_name: '',
          phone_number: '',
          nis: '',
          nisn: '',
          addresses: [{
            full_address: {}
          }],
        },
        class_rank: {
          rank: null
        },
        parents: {
          father: {},
          mother: {}
        }
      }
    }

    this.getGenerateForm = this.getGenerateForm.bind(this)
    this.getStudent = this.getStudent.bind(this)
  }

  componentDidMount() {
    this.getStudent()
    this.getGenerateForm()
  }
  
  getGenerateForm() {
    const url = `v1/assessments/6ae41268-d737-4a87-bb54-1a9cfd1d69f8/exams/b4aa7bda-f96d-4665-8dc3-fe263ed670ed/exam_scores/0eea9548-6397-4303-b980-e4b2bf34cc4a`

    apiClient('get', url).then(response => {
        console.log(response)
      this.setState({
          data: response.data.data,
          question:response.data.data.exam_questions
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

  render() {
    console.log("here data student", this.state.student)
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
        />
        </div>
      </div>
    )
  }
}