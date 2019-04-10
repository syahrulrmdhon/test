import React, {Component} from "react"
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import {
  onChange,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler,
  onChangeContent,
  onAddImageQuestion,
  onQuestionSelected,
  deleteImage
} from "./../../../redux-modules/modules/onlineQuestion";

import { getBank } from "./../../../redux-modules/modules/bank"
import BankQuestion from '../bank/bank'
import { apiClient } from '../../../utils/apiClient'
import _ from "lodash"
import Select from 'react-select'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      base64: '',
      visible: false,
    }

    this.showBankQuestion = this.showBankQuestion.bind(this)
    this.onQuestionSelected = this.onQuestionSelected.bind(this)
  }

  onPreviewPhoto(evt) {
    let files = evt.target.files;
    for (let i = 0, len = files.length; i < len; i++) {
      let file = files[i];
      let reader = new FileReader();
      reader.onload = ((event) => {
        this.props.onAddImageQuestion({base64: event.target.result })
      })
      reader.readAsDataURL(file);
    }
  }

  showBankQuestion() {
    const basic_comp_ids = _.map(this.props.basic_comps, 'id')
    this.props.getBank(this.props.questionType, basic_comp_ids)
    this.setState({
      visible: !this.state.visible
    })
  }

  onQuestionSelected() {
    this.props.onQuestionSelected({data: this.props.bankQuestions})
    this.showBankQuestion()
  }

  render() {
    const question = _.get(this.props.data, 'data.question', {})
    const questionType = _.get(this.props.data, 'data.problem_types', [])
    const examStatus = _.get(this.props.data, 'data.flag', '')
    const choices = _.get(this.props.data, 'data.question.exam_question_choices', [])
    const basicCompetencies = _.get(this.props.data, 'basicCompetencies', [])
    const currentQuestionType = questionType.find(type => {
      return type.problem_type === question.problem_type
    })

    const images = _.get(this.props.data, 'data.question.image_urls', [])
    const imageList = images.map((image, index) => {
      return (
      <div className="online-question__image-wrapper" key={index}>
        <img key={index} id="image" src={image.doc_aws_url} className="online-question__question-image" alt="gambar soal" />
        <div
          className="online-question__delete-image delete"
          onClick={() => this.props.deleteImage()}
        />
      </div>
      )
    })

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
          <div className='online-question__choice-wrapper'>
            <label htmlFor={'choices-' + index}></label>
            <input
              id={'choices-' + index}
              className="online-question__radio"
              type='radio'
              name="choices"
              checked={choice.is_correct_ans}
              onChange={() => this.props.onChangeCorrectAnswer({order: index})}
            />
            <div className="check"></div>
        </div>
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
              style={this.props.number === 1 && this.props.currentObj == 0 ? {color: '#c8c8c8', cursor: 'default'} : null}
            >
              <i
                className="fa fa-chevron-left" style={{cursor: 'inherit'}}
              />
            </div>
            <div className="online-question__arrow-icon"
              onClick={() => this.props.onClickNavigation({event: 'next', questionType: question.problem_type, questionCount: currentQuestionType.question_count})}
              style={(this.props.number === _.get(questionType[this.props.currentObj], 'question_count', 0) && this.props.currentObj == (questionType.length - 1)) ? {color: '#c8c8c8', cursor: 'default'} : null}
            >
              <i
                className="fa fa-chevron-right" style={{cursor: 'inherit'}}
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
              Soal {this.props.questionLabel} - Nomor {this.props.number}
            </div>
            <div className="online-question__import-question" onClick={() => this.showBankQuestion()}>
              <span className="online-question__add-icon">+</span> Impor Soal
            </div>
          </div>
          <div className="online-question__upload-image">
            <label htmlFor="insert-picture">
              <i className="fa fa-upload" />
              {
                imageList.length ?
                  'Ubah Gambar'
                :
                  'Masukan Gambar'
              }
            </label>
            <input id="insert-picture" type="file" className="d-none" onChange={this.onPreviewPhoto.bind(this)} />
          </div>
            {imageList}
          <textarea
            className="online-question__write-question"
            placeholder="Tulis Soal"
            onChange={(event) => this.props.onChange({field: 'question', value: event.target.value})}
            value={question.question || ''}
          />
          {
            this.props.questionType === 'multiple_choice' ?
              <div>
                <div className="online-question__answer-wrapper">
                    <div className="online-question__answer-label">Jawaban</div>
                    {listChoices}
                </div>

                {choices.length <= 25 &&
                  <div className="online-question__add-choice" onClick={() => this.props.addChoiceHandler()}>
                    <span className="online-question__add-icon">+</span> Tambah Jawaban
                  </div>
                }
              </div>
            :
            <div>
              <label className="online-question__label-essay-answer">Jawaban</label>
              <textarea
                className="online-question__write-question mt-0"
                placeholder="Tulis Jawaban"
                onChange={(event) => this.props.onChangeContent({order: 0, value: event.target.value})}
                value={_.get(question.exam_question_choices, '0.content', '')}
              />
            </div>
          }
        </div>
        <div className="online-question__submit-wrapper">
          <button
            className="online-question__submit btn-green"
            onClick={() => this.props.onSubmit({number: this.props.number, questionType: question.problem_type})}>
            {
              examStatus ?
                'Selesai'
              :
                'Selanjutnya'
            }
          </button>
        </div>
          <BankQuestion
            visible={this.state.visible}
            closeModal={this.showBankQuestion}
            onQuestionSelected={this.onQuestionSelected}
            questionType={this.props.questionType}
          />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.onlineQuestion,
  basic_comps: _.get(state, 'onlineQuestion.basicCompetencies', []),
  bankQuestions: _.get(state.bank, 'selectedQuestion', {}),
  problem_types: _.get(state, 'onlineQuestion.data.problem_types', []),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  onChangeCorrectAnswer,
  deleteChoiceHandler,
  addChoiceHandler,
  onChangeContent,
  onAddImageQuestion,
  onQuestionSelected,
  deleteImage,
  getBank
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form);
