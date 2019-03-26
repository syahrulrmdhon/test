import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQuestion, getBasicCompetency } from './../../../redux-modules/modules/onlineQuestion'

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

    // this.onChangeCompetency = this.onChangeCompetency.bind(this)
  }

  componentDidMount() {
    this.props.getQuestion({
      assessmentId: this.state.assessmentId,
      examId: this.state.examId,
      params: {
        number: 1,
        problem_type: 'multiple_choice'
      }
    })
    this.props.getBasicCompetency({
      params: {
        category: 'knowledge',
        assessment_id: this.state.assessmentId
      }
    })
  }

  // onChangeCompetency(event) {
  //   console.log(event)
  // }

  render() {
    // console.log(this.props)
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  getQuestion,
  getBasicCompetency
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);