import React, { Component } from 'react'

import Header from '../global/header';
import Filter from './filter'
import Content from './content'
import '../../styles/exam.scss'
import { apiClient } from "../../utils/apiClient"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: this.props.match.params.id,
      exams: {  
        size: 0,
        total_entries: 0,
        total_pages: 0,
        entries: []
      }
    }

    this.addExam = this.addExam.bind(this)
    this.deleteExam = this.deleteExam.bind(this)
  }

  componentDidMount() {
    this.getAssessments()
  }

  getAssessments() {
    const path = `v1/assessments/${this.state.assessmentId}`

    apiClient('get', path).then(response => {
      this.setState({exams: response.data.data.exams})
    })
  }

  addExam() {
    this.props.history.push({pathname: `/create-exam/${this.state.assessmentId}`})
  }

  deleteExam(id) {
    const path = `v1/assessments/${this.state.assessmentId}/exams/${id}`

    apiClient('delete', path).then(() =>{
      this.getAssessments()
    })
  }
  
  render() {
    return (
      <div className="padding-content exam">
        <Header />
        <div className="margin-8">
          <div className="content-block main-block">
            <div className="row">
              <div className="col-sm-2 col-sm-2-custom left-block">
                <Filter classes={this.state.classes}/>
              </div>
              <div className="col-sm-10 col-sm-10-custom right-block">
                <Content
                  exams={this.state.exams}
                  addExam={this.addExam}
                  delete={this.deleteExam}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
