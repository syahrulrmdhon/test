import React from 'react'
import { connect } from 'react-redux'
import NumberList from './number-list'
import _ from 'lodash'

const questionNumber = props => {
  const problemTypes = props.problemTypes

  return (
    <div className="online-question__left-wrapper main-block">
      <div className="online-question__subject-wrapper">
        <div className="online-question__subject">{props.subject}</div>
        <div className="online-question__line" />
      </div>
      <NumberList
        problemTypes={problemTypes}
        onClickNumber={props.onClickNumber}
        currentPage={props.currentPage}
        currentObj={props.currentObj}
        questionType={props.questionType}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  problemTypes: _.get(state, 'onlineQuestion.data.problem_types', [])
})

export default connect(mapStateToProps)(questionNumber);
