import React, { Component } from 'react'
import Page from '../../components/Title'
import Header from '../global/header'
import BasicCompetence from './BasicCompetence'
import Form from './Form'
import { apiClient } from '../../utils/apiClient'

import './../../styles/student/description.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
        path: `/detail/${this.props.match.params.id}`,
        studentId: this.props.match.params.id,
        subjectId: this.props.match.params.subject,
        category: this.props.location.state.category
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(description, studentId, subjectId, category) {
    const url = `v1/students/${studentId}/score_details/${subjectId}/description?category=${category}`
    const body = {
      user_score: {
        description: description
      }
    }

    apiClient('post', url, body).then((response) => {
      this.props.history.push({
        pathname: `/detail/${studentId}`,
      })
    })
  }

  render() {
    return (
      <Page title="Deskripsi">
        <Header navbar={false} location={this.state.path}/>

        <div className="score-description">
          <div className="score-description__wrapper row">
            <div className="col-sm-4 score-description__content-left">
              <BasicCompetence
                studentId={this.state.studentId}
                subjectId={this.state.subjectId}
                category={this.state.category} />
            </div>
            <div className="col-sm-8 score-description__content-right">
              <Form
                studentId={this.state.studentId}
                subjectId={this.state.subjectId}
                category={this.state.category}
                handleSubmit={this.handleSubmit}/>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
