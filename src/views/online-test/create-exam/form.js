import React, {Component} from "react"
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import {
  onChangeInput,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler
} from "./../../../redux-modules/modules/onlineQuestion";

import _ from "lodash"
import Select from 'react-select'

class Form extends Component {

  render() {
    const question = _.get(this.props.data, 'data.question', {})
    const choices = _.get(this.props.data, 'data.question.exam_question_choices', [])
    const basicCompetencies = _.get(this.props.data, 'basicCompetencies', [])

    const listChoices = choices.map((choice, index) => {
      return (
        <div key={choice.id} className="online-question__choice">
          <span className="online-question__symbol">
            {choice.symbol}
          </span>
          <input
            className="online-question__answer"
            type="text"
            placeholder="Tulis Jawaban"
            value={choice.content}
          />
          <input
            className="online-question__radio"
            type="radio"
            name="choices"
            checked={choice.is_correct_ans}
            onChange={(event) => this.props.onChangeCorrectAnswer({order: index})}
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
                onChange={(event) => this.props.onChangeInput({field: 'basic_comp_id', value: event.id})}
                value={basicCompetencies.find(competency => (competency.id === question.basic_comp_id))}
              />
            </div>
          </div>
          <div className="online-question__navigation">
            <div className="online-question__arrow-icon">
              <i className="fa fa-chevron-left" />
            </div>
            <div className="online-question__arrow-icon">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="online-question__form-group mb-0">
            <label className="online-question__label">Bobot Nilai</label>
            <input
              className="online-question__input online-question__score"
              type="number"
              onChange={(event) => this.props.onChangeInput({field: 'weight', value: event.target.value})}
              value={question.weight}
            />
          </div>
        </div>
        <div className="online-question__question-wrapper">
          <div className="d-flex justify-content-between align-items-center">
            <div className="online-question__current-question">Soal PG - Nomor 1</div>
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
            onChange={(event) => this.props.onChangeInput({field: 'question', value: event.target.value})}
            value={question.question}
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
          <button className="online-question__submit btn-green">Selanjutnya</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.onlineQuestion
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangeInput,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form);
