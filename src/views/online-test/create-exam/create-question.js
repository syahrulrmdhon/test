import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getData } from './../../../redux-modules/modules/onlineQuestion'

import Page from '../../../components/Title'
import Header from '../../global/header'
import QuestionNumber from './question-number'
import Form from './form'

class CreateQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: props.match.params.assessment,
      examId: props.match.params.exam
    }
  }

  componentDidMount() {
    this.props.getData({
      assessmentId: this.state.assessmentId,
      examId: this.state.examId,
      params: {
        number: 1,
        problem_type: 'multiple_choice'
      }
    })
  }

  render() {
    return (
        <Page title="Deskripsi">
        <Header navbar={false} location={''}/>
        <div className="online-question content-wrapper">
          <QuestionNumber />
          <Form />
        </div>
      </Page>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getData,
}, dispatch);

export default connect(false, mapDispatchToProps)(CreateQuestion);