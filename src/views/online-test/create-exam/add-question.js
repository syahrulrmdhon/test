import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  handleEventProblemtype,
  buildObject,
  removeQuestion,
  addQuestion
} from './../../../redux-modules/modules/onlineExam'
import { getProblemTypes } from './../helper-online'

class AddQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problemTypes: [],
    }
  }
  componentDidMount() {
    getProblemTypes.call(this)
    this.props.buildObject()
  }
  render() {
    let exam_problem_type = _.get(this, 'props.exam_problem_type', {})
    const { problem_type, question_count } = exam_problem_type
    let remove
    if (exam_problem_type) {
      if (this.props.i > 0) {
        remove =
          <i className='fa fa-close padding-left-2 margin-top-6'
            onClick={() => { this.props.removeQuestion(exam_problem_type, this.props.i) }}
          />
      }
    }
    return (
      <div>
        <div className='row'>
          <div className="col-sm-6 col-md-6 col-lg-6 padding-top-2">
            <label>Tipe Soal</label>
            <div className="margin-top-1">
              <Select
                onChange={(e) => { this.props.handleEventProblemtype(e.value, 'exam', 'exam_problem_types_attributes', 'problem_type', this.props.index) }}
                options={this.state.problemTypes ? this.state.problemTypes : []}
                value={this.state.problemTypes.find((e) => { return e.value == problem_type })}
                classNamePrefix="select"
                className="fullwidth"
                placeholder='Pilih Tipe Soal...'
              />
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 padding-top-2">
            <label>Jumlah Soal </label>
            <div className="margin-top-1">
              <input
                type="number" className="form-control"
                name='question_count'
                defaultValue={question_count}
                onChange={(e) => { this.props.handleEventProblemtype(e.target.value, 'exam', 'exam_problem_types_attributes', 'question_count', this.props.index) }}
                placeholder='Contoh: 20'
              />
            </div>
          </div>
          <div className='col-sm-1 col-md-1 col-lg-1 padding-top-2'>
            {remove}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  exam_problem_type: state.onlineExam.exam.exam_problem_types_attributes[props.i],
})
const mapDispatchToProps = dispatch => bindActionCreators({
  handleEventProblemtype,
  buildObject,
  removeQuestion,
  addQuestion
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)
