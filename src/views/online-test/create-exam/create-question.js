import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQuestion, getBasicCompetency, reset, handleSuccess } from './../../../redux-modules/modules/onlineQuestion'
import { apiClient } from '../../../utils/apiClient'

import Page from '../../../components/Title'
import Header from '../../global/header'
import QuestionNumber from './question-number'
import _ from "lodash"

import Form from './form'

class CreateQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: props.match.params.assessment,
      examId: props.match.params.exam,
      currentPage: 1,
      currentObj: 0,
      questionType: 'multiple_choice',
      questionLabel: 'PG',
      success: _.get(props.data, 'success', false)
    }
    this.onClickNumber = this.onClickNumber.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNavigation = this.onClickNavigation.bind(this)
    this.validation = this.validation.bind(this)
    this.getQuestion = this.getQuestion.bind(this)
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

  onClickNumber({number, index, questionType, questionLabel}) {
    if (this.validation()) {
      let data = this.validation()
      apiClient(data.method, data.url, data.data).then(() => {
        this.setState({
          success: true
        })
      }).catch(() => {
      })
    }
    if (this.state.number !== number || this.state.questionType !== questionType) {
      this.setState({
        currentPage: number,
        currentObj: index,
        questionType: questionType,
        questionLabel: questionLabel,
        success: false
      })
    }
    this.getQuestion({number: number, questionType: questionType})
  }

  onSubmit({number, questionType}) {
    const nextNumber = number + 1
    if (this.validation()) {
      let data = this.validation()
      apiClient(data.method, data.url, data.data).then(() => {
        this.setState({
          success: true
        })
      }).catch(() => {
      })
    }
    this.setState({
      currentPage: nextNumber,
      questionType: questionType,
      success: false
    })
    this.getQuestion({ number: nextNumber, questionType: questionType })
  }

  getQuestion({number, questionType}) {
    this.props.getQuestion({
      assessmentId: this.state.assessmentId,
      examId: this.state.examId,
      params: {
        number: number,
        problem_type: questionType,
      }
    })
  }

  validation(){
    const data = _.get(this.props.data, 'body', {})

    let choices = data.exam_question.exam_question_choices_attributes.filter((choice, index) => {
      return choice.id != null || choice.content != ''
    })
    data.exam_question.exam_question_choices_attributes = choices

    if (data.exam_question.basic_comp_id && data.exam_question.exam_question_choices_attributes.length && data.exam_question.question && data.exam_question.weight) {
      const url = `v1/assessments/${this.state.assessmentId}/exams/${this.state.examId}/questions`
      return {method: 'post', url: url, data: data}
    }
    else {
      return false
    }
  }

  onClickNavigation({event, questionType, questionCount}) {
    const currentObj = _.get(this.props.problem_types, this.state.currentObj, {})
    const {problem_type, question_count} = currentObj

    switch (event) {
      case 'prev':
        let  prevCurrentPage = this.state.currentPage - 1
        if(!prevCurrentPage < 1) {
          if (this.validation()) {
            let data = this.validation()
            apiClient(data.method, data.url, data.data).then(() => {
              this.setState({
                success: true
              })
            }).catch(() => {
            })
          }
          this.setState({
            success: false
          })
        }

        if(prevCurrentPage == 0){
          const currentObjCount = this.state.currentObj - 1
          const prevObj = _.get(this.props.problem_types, currentObjCount, {})
          questionType = prevObj.problem_type
          prevCurrentPage = prevObj.question_count

          this.setState({
            currentObj: currentObjCount,
            currentPage: prevObj.question_count,
            questionType: questionType,
            questionLabel: prevObj.problem_type_abbv
          })
        } else {
          this.setState({
            currentPage: prevCurrentPage,
          })
        }

        this.getQuestion({number: prevCurrentPage, questionType: questionType})

        break
      case 'next':
        let nextCurrentPage = this.state.currentPage + 1
        if (this.validation()) {
          let data = this.validation()
          apiClient(data.method, data.url, data.data).then(() => {
            this.setState({
              success: true
            })
          }).catch(() => {
          })
        }

        if(nextCurrentPage > question_count){
          const currentObjCount = this.state.currentObj + 1
          const nextObj = _.get(this.props.problem_types, currentObjCount, {})
          questionType = nextObj.problem_type
          nextCurrentPage = 1

          this.setState({
            currentObj: currentObjCount,
            currentPage: nextCurrentPage,
            questionType: questionType,
            questionLabel: nextObj.problem_type_abbv,
            success: false
          })
        } else {
          this.setState({
            currentPage: nextCurrentPage,
            success: false
          })
        }

        this.getQuestion({number: nextCurrentPage, questionType: questionType})
        break
      default:
        break
    }
  }

  render() {
    // const success = _.get(this.props.data, 'success', false)

    return (
        <Page title="Deskripsi">
        <Header navbar={false} location={''}/>
        {
          this.state.success &&
          <div id="note">
            Soal berhasil disimpan.
          </div>
        }

        <div className="online-question content-wrapper">
          <QuestionNumber
            onClickNumber={this.onClickNumber}
            currentPage={this.state.currentPage}
            currentObj={this.state.currentObj}
            questionType={this.state.questionType}
          />
          <Form
            number={this.state.currentPage}
            currentObj={this.state.currentObj}
            questionType={this.state.questionLabel}
            onSubmit={this.onSubmit}
            onClickNavigation={this.onClickNavigation}
          />
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  data: state.onlineQuestion,
  problem_types: _.get(state, 'onlineQuestion.data.problem_types', [])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getQuestion,
  getBasicCompetency,
  reset,
  handleSuccess
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);