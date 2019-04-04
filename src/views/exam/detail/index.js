import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../../global/header'
import '../../../styles/exam.scss'
import Head from './header-title'
import Question from './question'
import { getExamQuestion } from './../../../redux-modules/modules/questionDetail'
import { bindActionCreators } from 'redux';
import Right from './right'

class index extends Component {
  constructor(props) {
    super(props)


    this.redirect = this.redirect.bind(this)
  }

  componentDidMount() {
    console.log(this.props.match.params.exam_id, this.props.match.params.assessment_id, "aalalsaasd")
    this.props.getExamQuestion(this.props.match.params.exam_id, this.props.match.params.assessment_id)
  }

  redirect(edit) {
    if (edit === 'question') {
      this.props.history.push({
        pathname: `/edit/${this.props.match.params.assessment_id}/exam/${this.props.match.params.exam_id}/${edit}`,
        state: { status: 'all-question' }
      })
    }
    else {
      this.props.history.push({
        pathname: `/edit/${this.props.match.params.assessment_id}/exam/${this.props.match.params.exam_id}`,
        state: { status: 'all-question' }
      })
    }
  }

  render() {
    const menu = this.props.location.state && this.props.location.state.status
    let path = ''
    if (menu === 'online') {
      path = '/online-exam'
    } else {
      path = `/exam/${this.props.match.params.assessment_id}`
    }
    
    return (
      <div className="question padding-content">
        <div>
          <Header navbar={false} location={path} />
        </div>
        <div className="main-layout">

          <div className="col-sm-12">
            <div className="col-sm-8">
              <div className="padding-top-4">
                <div className="col-sm-12">
                  <Head redirect={this.redirect} />
                </div>
                <div className="col-sm-12">
                  <div className="margin-top-3 margin-bottom-3">
                    <Question redirect={this.redirect} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 pl-0">
              <div className="padding-top-4">
                <Right />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  question: state.questionDetail
})


const mapDispatchToProps = dispatch => bindActionCreators({ getExamQuestion }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(index)
