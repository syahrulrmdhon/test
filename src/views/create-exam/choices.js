import React, {Component} from 'react';

class Choices extends Component {
  render() {

    return (
        <div className="row">
          <div className="col-sm-3">
            <input type="text" className="form-control create-exam__input-symbol" onChange={(event) => this.props.changed(event, 'symbol', this.props.id)} placeholder="Simbol, Contoh: a" value={this.props.data.exam_question_choices_attributes[this.props.id].symbol}/>
          </div>
          <div className="col-sm-6">
            <input type="text" className="form-control create-exam__input create-exam__input-amount" onChange={(event) => this.props.changed(event, 'content', this.props.id)} placeholder="Berikan Jawaban" value={this.props.data.exam_question_choices_attributes[this.props.id].content}/>
          </div>
          <div className="col-sm-3 create-exam__choice pl-0">
            <input className="create-exam__radio" type="radio" name='' value="Opsi Benar" name="choices" id={this.props.id} onChange={(event) => this.props.changed(event, 'is_correct_ans', this.props.id)} checked={this.props.id === this.props.correctAnswer}/>
            <label htmlFor=''>Opsi Benar</label>
          </div>
        </div>
    )
  }
}

// {/*<input type="radio" name={attendance.user_id} value="permission" onChange={event => this.props.handleOptionChange(event)} id={'permission-' + attendance.user_id} checked={attendance.status === 'permission'}/>*/}


export default Choices;