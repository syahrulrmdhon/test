import React, {Component} from 'react';

import { handleEvent, handleRemove } from './../../redux-modules/modules/question'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
var FontAwesome = require('react-fontawesome')

class Choices extends Component {
  constructor(props) {
    super(props)
    this.state= {
      step: 'QuestionForm',
    }
  }

  choices() {
    let data = []
    if (this.props.data.questionForm.exam.exam_questions_attributes[this.props.data.number -1]) {
      data = this.props.data.questionForm.exam.exam_questions_attributes[this.props.data.number -1].exam_question_choices_attributes
    }

    return data
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 pr-0">
          <input type="text" className="form-control create-exam__input-symbol" onChange={(event) => this.props.handleEvent(event.target.value, 'symbol', this.state.step, this.props.order)} placeholder="Simbol, Contoh: a" value={this.choices()[this.props.order] ? this.choices()[this.props.order].symbol : ''}/>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control create-exam__input create-exam__input-option-answer" onChange={(event) => this.props.handleEvent(event.target.value, 'content', this.state.step, this.props.order)} placeholder="Berikan Jawaban" value={this.choices()[this.props.order] ? this.choices()[this.props.order].content : ''}/>
        </div>
        <div className="col-md-3 create-exam__choice pl-0">
          <input className="create-exam__radio" type="radio" name={this.props.order} value="Opsi Benar" name="choices" id={this.props.order} onChange={(event) => this.props.handleEvent(event.target.id, 'is_correct_ans', this.state.step ,this.props.order)} checked={this.props.order === this.props.data.is_correct_ans}/>
          <label htmlFor={this.props.order}>Opsi Benar</label>
          {
            this.props.order > 0 &&
            <FontAwesome name="trash" className="create-exam__remove" onClick={() => {this.props.handleRemove(this.props.order, 'exam_question_choices_attributes', 'QuestionForm')}}/>
          }
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
    handleEvent,
    handleRemove
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Choices)