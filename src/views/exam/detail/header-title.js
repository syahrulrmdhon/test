import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../../styles/exam.scss'
import { getExamQuestion } from './../../../redux-modules/modules/questionDetail'
import { bindActionCreators } from 'redux';

export class HeaderTitle extends Component {

  render() {
    const data = this.props.question && this.props.question.data && this.props.question.data.subject_competencies
    const assessment = this.props.question && this.props.question.data
    let content = []
    data && data.map((data, idx) => {
      content.push(<div key={Math.random()}>
        <div className="padding-2">
          <span className="question__subject">{data.subject_name}</span>
        </div>
        <div className="padding-2">
          <span className="question__topic">{assessment.assessment.name}</span>
        </div>
      </div>)
    })
    return (
      <div className="bg-white box-top padding-top-3 padding-bottom-3">
        <div className="padding-2">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10">
                <span className="question__title">{assessment && assessment.exam.name}</span>
              </div>
              <div className="col-sm-2">
                <span className="question__update" onClick={() => this.props.redirect('header')}>Ubah</span>
              </div>
            </div>
          </div>
        </div>
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  question: state.questionDetail
})


const mapDispatchToProps = dispatch => bindActionCreators({ getExamQuestion }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderTitle)

