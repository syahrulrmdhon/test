import React, { Component } from 'react'

import Header from '../global/header'
import Switch from "react-switch";
import Select from 'react-select'
import { examTypes } from '../../utils/common'

import '../../styles/create-exam.scss'

export default class Index extends Component {
  constructor() {
    super()
      this.state = {
        checked: true,
        examTypes: [],
        selectedType: null,
      }
      this.handleCreateQuestion = this.handleCreateQuestion.bind(this)
      this.handleTypeOptionChange = this.handleTypeOptionChange.bind(this)
  }

  componentDidMount() {
    examTypes.call(this, {category: 'knowledge'})
  }

  handleCreateQuestion(checked) {
    this.setState({ checked })
  }

  handleTypeOptionChange(type) {
    this.setState({ selectedType: type});
  }

  render() {
    return (
      <div className="padding-content create-exam">
        <Header />
        <div className="margin-8">
          <div className="content-wrapper">
            <div className="create-exam__title-wrapper">
              <div className="create-exam__form-title">Tambah Tugas</div>
              <div className="create-exam__line"></div>
            </div>
            <div className="create-exam__form-wrapper">
              <label className="create-exam__label">Judul Tugas</label>
              <input type="text" className="form-control create-exam__input" placeholder="Masukkan Judul Tugas" />
              <label className="create-exam__label">Tipe Tugas</label>
              <Select
                className="create-exam__input"
                classNamePrefix="select"
                value={this.state.selectedType}
                onChange={event => this.handleTypeOptionChange(event)}
                options={this.state.examTypes} 
                placeholder='Pilih Tipe Tugas' />    
              <label className="create-exam__label">Jumlah Soal Tugas</label>
              <input type="text" className="form-control create-exam__input create-exam__input-amount" placeholder="Masukkan Jumlah Soal Tugas" />
            </div>
            <div className="d-flex">
              <Switch
                onChange={this.handleCreateQuestion}
                checked={this.state.checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onHandleColor="#ffffff"
                onColor="#1a9d7f"
                offColor="#cccccc"
                id="normal-switch"
                height={18}
                width={35} />
                <label className="create-exam__label pl-2">Buat Soal Online</label>
            </div>
            <button className="create-exam__button">Lanjut</button>
          </div>
        </div>
      </div>
    )
  }
}
