import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQuestion, getBasicCompetency, reset, handleSuccess, onQuestionSelected } from './../../../redux-modules/modules/onlineQuestion'
import { apiClient } from '../../../utils/apiClient'
import { Link } from 'react-router-dom';

import Page from '../../../components/Title'
import Header from '../../global/header'
import QuestionNumber from './question-number'
import { isNull } from '../../../utils/common'
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
      success: _.get(props.data, 'success', false),
    }
    this.onClickNumber = this.onClickNumber.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickNavigation = this.onClickNavigation.bind(this)
    this.postQuestion = this.postQuestion.bind(this)
    this.getQuestion = this.getQuestion.bind(this)
    this.onQuestionSelected = this.onQuestionSelected.bind(this)
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
    this.postQuestion({
      nextNumber: number,
      questionType: questionType
    })

    if (this.state.number !== number || this.state.questionType !== questionType) {
      this.setState({
        currentPage: number,
        currentObj: index,
        questionType: questionType,
        questionLabel: questionLabel,
      })
    }
  }

  onSubmit({number, questionType}) {
    const currentObj = _.get(this.props.problem_types, this.state.currentObj, {})
    const {question_count} = currentObj
    let nextNumber = number + 1

    if (nextNumber > question_count && this.state.currentObj !== this.props.problem_types.length - 1){
      const currentObjCount = this.state.currentObj + 1
      const nextObj = _.get(this.props.problem_types, currentObjCount, {})
      questionType = nextObj.problem_type
      nextNumber = 1

      this.postQuestion({
        nextNumber: nextNumber,
        questionType: questionType
      })

      this.setState({
        currentObj: currentObjCount,
        currentPage: nextNumber,
        questionType: questionType,
        questionLabel: nextObj.problem_type_abbv,
      })
    }
    else if (nextNumber <= question_count) {
      this.postQuestion({
        nextNumber: nextNumber,
        questionType: this.state.questionType
      })
      this.setState({
        currentPage: nextNumber,
      })
    }
    else {
      this.postQuestion({
        nextNumber: nextNumber,
        questionType: this.state.questionType
      })
    }
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

  onClickNavigation({event, questionType, questionCount}) {
    const currentObj = _.get(this.props.problem_types, this.state.currentObj, {})
    const {question_count} = currentObj

    switch (event) {
      case 'prev':
        let  prevCurrentPage = this.state.currentPage - 1

        if (prevCurrentPage == 0 && this.state.currentObj !== 0){
          const currentObjCount = this.state.currentObj - 1
          const prevObj = _.get(this.props.problem_types, currentObjCount, {})
          questionType = prevObj.problem_type
          prevCurrentPage = prevObj.question_count

          this.postQuestion({
            nextNumber: prevCurrentPage,
            questionType: questionType
          })

          this.setState({
            currentObj: currentObjCount,
            currentPage: prevObj.question_count,
            questionType: questionType,
            questionLabel: prevObj.problem_type_abbv
          })
        }
        else if (prevCurrentPage !== 0){
          this.postQuestion({
            nextNumber: prevCurrentPage,
            questionType: this.state.questionType
          })

          this.setState({
            currentPage: prevCurrentPage,
          })
        }

        break
      case 'next':
        let nextCurrentPage = this.state.currentPage + 1

        if (nextCurrentPage > question_count && this.state.currentObj !== this.props.problem_types.length - 1){
          const currentObjCount = this.state.currentObj + 1
          const nextObj = _.get(this.props.problem_types, currentObjCount, {})
          questionType = nextObj.problem_type
          nextCurrentPage = 1

          this.postQuestion({
            nextNumber: nextCurrentPage,
            questionType: questionType
          })

          this.setState({
            currentObj: currentObjCount,
            currentPage: nextCurrentPage,
            questionType: questionType,
            questionLabel: nextObj.problem_type_abbv,
          })
        } else if (nextCurrentPage <= question_count){

          this.postQuestion({
            nextNumber: nextCurrentPage,
            questionType: this.state.questionType
          })

          this.setState({
            currentPage: nextCurrentPage,
          })
        }
        break
      default:
        break
    }
  }

  postQuestion({nextNumber, questionType}){
    const data = _.get(this.props.data, 'body', {})
    const problemTypes = _.get(this.props.data, 'data.problem_types', [])
    const question = _.get(this.props.data, 'data.question', {})

    let choices = data.exam_question.exam_question_choices_attributes.filter((choice, index) => {
      return choice.id != null || choice.content != ''
    })

    data.exam_question.exam_question_choices_attributes = choices

    data.exam_question.image_sources.map((image, index) => {
      image.key = `${index + 1}`
    })

    const currentProblemType = problemTypes.find(type => {
      return type.problem_type === question.problem_type
    })
    if (this.props.data.changed) {
      const url = `v1/assessments/${this.state.assessmentId}/exams/${this.state.examId}/questions`
      apiClient('post', url, data).then(() => {
        this.setState({
          success: true
        })

        if (nextNumber <= currentProblemType.question_count) {
          this.getQuestion({ number: nextNumber, questionType: questionType })
        }

      }).catch(() => {
      })
    }
    else {
      this.getQuestion({ number: nextNumber, questionType: questionType })
    }

    this.setState({
      success: false
    })
  }

  onQuestionSelected() {
    this.props.onQuestionSelected({data: this.props.bankQuestions})
  }

  render() {
    const subject = `${isNull(_.get(this.props.data, 'data.subject_name', ''))} -
      ${isNull(_.get(this.props.data, 'data.grade_name', ''))} ${isNull(_.get(this.props.data, 'data.major_name', ''))}`

      return (
        <Page title="Deskripsi">
        <Header />
        {
          this.state.success &&
          <div id="note">
            Soal berhasil disimpan.
          </div>
        }

        <div className="online-question content-wrapper">
        <div className="back-button__wrapper">
          <Link
            className="back-button__button"
            to={{pathname: '/online-exam'}}>
            <span className="chevron left"></span>Halaman Utama
          </Link>
        </div>
          <QuestionNumber
            onClickNumber={this.onClickNumber}
            currentPage={this.state.currentPage}
            currentObj={this.state.currentObj}
            questionType={this.state.questionType}
            subject={subject}
          />
          <Form
            number={this.state.currentPage}
            currentObj={this.state.currentObj}
            questionLabel={this.state.questionLabel}
            questionType={this.state.questionType}
            onSubmit={this.onSubmit}
            onClickNavigation={this.onClickNavigation}
            onQuestionSelected={this.onQuestionSelected}
          />
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  data: state.onlineQuestion,
  bankQuestions: _.get(state.bank, 'selectedQuestion', {}),
  problem_types: _.get(state, 'onlineQuestion.data.problem_types', [])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getQuestion,
  getBasicCompetency,
  reset,
  handleSuccess,
  onQuestionSelected
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);