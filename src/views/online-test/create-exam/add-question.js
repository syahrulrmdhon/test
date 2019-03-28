import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  handleEvent,
  buildObject,
  removeQuestion
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
    let exam_problem_types = _.get(this, 'props.exam_problem_type', [])
    const { problem_type, question_count } = exam_problem_types
    let remove
    if (exam_problem_types) {
      console.log(exam_problem_types)
      exam_problem_types.map((res, idx) => {
        if (idx > 0) {
          remove =
            <i className='fa fa-close padding-left-2'
              onClick={() => { this.props.removeQuestion(this.props.index) }}>
            </i>
        }
      })
    }
    return (
      <div className='row'>
        <div className="col-sm-8 padding-top-2">
          <label>Tipe Soal</label>
          <div className="margin-top-1">
            <Select
              onChange={(e) => { this.props.handleEvent(e.value, 'exam_problem_type', 'problem_type') }}
              options={this.state.problemTypes ? this.state.problemTypes : []}
              value={this.state.problemTypes.find((e) => { return e.value == problem_type })}
              classNamePrefix="select"
              className="fullwidth"
            />
          </div>
        </div>
        <div className="col-sm-4 padding-top-2">
          <label>Jumlah Soal </label>
          {remove}
          <div className="margin-top-1">
            <input
              type="number" className="form-control"
              placeholder='Contoh: 10'
              name='question_count'
              defaultValue={question_count}
              onChange={(e) => { this.props.handleEvent(e.target.value, 'exam_problem_type', 'question_count') }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  exam_problem_type: state.onlineExam.exam.exam_problem_types_attributes,
  exam_problem_types: _.get(state, 'onlineExam.exam.exam_problem_types_attributes', {})
})
const mapDispatchToProps = dispatch => bindActionCreators({
  handleEvent,
  buildObject,
  removeQuestion
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)
