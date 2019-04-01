import React, {Component} from "react"
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import {
  onChange,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler,
  onChangeContent
} from "./../../../redux-modules/modules/onlineQuestion";

import { apiClient } from '../../../utils/apiClient'
import _ from "lodash"
import Select from 'react-select'

class Form extends Component {
  constructor() {
    super()
    // this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    // console.log(this.props.data)
    const question = _.get(this.props.data, 'data.question', {})
    const questionType = _.get(this.props.data, 'data.problem_types', [])

    const choices = _.get(this.props.data, 'data.question.exam_question_choices', [])
    const basicCompetencies = _.get(this.props.data, 'basicCompetencies', [])
    const currentQuestionType = questionType.find(type => {
      return type.problem_type === question.problem_type
    })
    console.log(currentQuestionType)
    const listChoices = choices.map((choice, index) => {
      return (
        <div key={index} className="online-question__choice">
          <span className="online-question__symbol">
            {choice.symbol}
          </span>
          <input
            className="online-question__answer"
            type="text"
            placeholder="Tulis Jawaban"
            onChange={(event) => this.props.onChangeContent({order: index, value: event.target.value})}
            value={choice.content}
          />
          <input
            className="online-question__radio"
            type="radio"
            name="choices"
            checked={choice.is_correct_ans}
            onChange={() => this.props.onChangeCorrectAnswer({order: index})}
          />
          {
            index !== 0 &&
              <div
                className="delete"
                onClick={() => this.props.deleteChoiceHandler({order: index})}
              />
          }
        </div>
      )
    })

    return (
      <div className="online-question__right-wrapper main-block">
        <div className="online-question__top-content">
          <div className="pull-left">
            <div className="online-question__form-group">
              <label className="online-question__label">Kompetensi Dasar</label>
              <Select
                classNamePrefix="select"
                placeholder="Pilih Kompetensi Dasar ..."
                options={basicCompetencies}
                onChange={(event) => this.props.onChange({field: 'basic_comp_id', value: event.id})}
                value={basicCompetencies.find(competency => (competency.id === question.basic_comp_id))}
              />
            </div>
          </div>
          <div className="online-question__navigation">
            <div className="online-question__arrow-icon"
                onClick={() => this.props.onClickNavigation({event: 'prev', questionType: question.problem_type, questionCount: currentQuestionType.question_count})}
            >
              <i
                className="fa fa-chevron-left"
                style={this.props.number === 1 ? {color: '#c8c8c8'} : null}
              />
            </div>
            <div className="online-question__arrow-icon"
                onClick={() => this.props.onClickNavigation({event: 'next', questionType: question.problem_type, questionCount: currentQuestionType.question_count})}
            >
              <i
                className="fa fa-chevron-right"
              />
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="online-question__form-group mb-0">
            <label className="online-question__label">Bobot Nilai</label>
            <input
              className="online-question__input online-question__score"
              type="number"
              onChange={(event) => this.props.onChange({field: 'weight', value: event.target.value})}
              value={question.weight || ''}
            />
          </div>
        </div>
        <div className="online-question__question-wrapper">
          <div className="d-flex justify-content-between align-items-center">
            <div className="online-question__current-question">
              Soal {this.props.questionType} - Nomor {this.props.number}
            </div>
            <div className="online-question__import-question">
              <span className="online-question__add-icon">+</span> Impor Soal
            </div>
          </div>
          <div className="online-question__upload-image">
            <i className="fa fa-upload" /> Masukan Gambar
          </div>
          <textarea
            className="online-question__write-question"
            placeholder="Tulis Soal"
            onChange={(event) => this.props.onChange({field: 'question', value: event.target.value})}
            value={question.question || ''}
          />
          <div className="online-question__answer-wrapper">
              <div className="online-question__answer-label">Jawaban</div>
              {listChoices}
          </div>
          {
            choices.length <= 25 &&
            <div className="online-question__add-choice" onClick={() => this.props.addChoiceHandler()}>
              <span className="online-question__add-icon">+</span> Tambah Jawaban
            </div>
          }
        </div>
        <div className="online-question__submit-wrapper">
          <button
            className="online-question__submit btn-green"
            onClick={() => this.props.onSubmit({number: this.props.number, questionType: question.problem_type})}>
            Selanjutnya
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.onlineQuestion
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler,
  onChangeContent
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form);
