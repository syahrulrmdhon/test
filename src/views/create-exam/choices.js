import React, {Component} from 'react';

import { handleEvent } from './../../redux-modules/modules/question'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Choices extends Component {
  constructor(props) {
    super(props)
    this.state= {
      step: 'QuestionForm',
    }
  }
  render() {
    let data = []
    if (this.props.data.questionForm.exam.exam_questions_attributes[this.props.data.number -1]) {
      data = this.props.data.questionForm.exam.exam_questions_attributes[this.props.data.number -1].exam_question_choices_attributes
    }
    return (
      <div className="row">
        <div className="col-sm-3">
          <input type="text" className="form-control create-exam__input-symbol" onChange={(event) => this.props.handleEvent(event.target.value, 'symbol', this.state.step, this.props.order)} placeholder="Simbol, Contoh: a" value={data[this.props.order] ? data[this.props.order].symbol : ''}/>
        </div>
        <div className="col-sm-6">
          <input type="text" className="form-control create-exam__input create-exam__input-amount" onChange={(event) => this.props.handleEvent(event.target.value, 'content', this.state.step, this.props.order)} placeholder="Berikan Jawaban" value={data[this.props.order] ? data[this.props.order].content : ''}/>
        </div>
        <div className="col-sm-3 create-exam__choice pl-0">
          <input className="create-exam__radio" type="radio" name={this.props.order} value="Opsi Benar" name="choices" id={this.props.order} onChange={(event) => this.props.handleEvent(event.target.id, 'is_correct_ans', this.state.step ,this.props.order)} checked={this.props.order === this.props.data.is_correct_ans}/>
          <label htmlFor={this.props.order}>Opsi Benar</label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  data: state.question,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    handleEvent
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Choices)