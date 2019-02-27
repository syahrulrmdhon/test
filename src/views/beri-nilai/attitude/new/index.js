import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from './../../../../components/Title'
import Header from './../../../global/header'
import Report from './report-list'
import Select from 'react-select'
import { apiClient } from '../../../../utils/apiClient'
import { error, modal } from './../../../global/modal'

//css
import './../../../../styles/attitude.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


const option = [
    { value: 2, label: 'Sangat Baik' },
    { value: 1, label: 'Baik' },
    { value: 0, label: 'Butuh Perhatian' }
]

export class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            predicate: '',
            descrip: ''
        }
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    onChangeSelect(predicate) {
        this.setState({ predicate })
    }
    onChange(e) {
        this.setState({
            descrip: e.target.value
        })
    }

    handleSave(e) {
        e.preventDefault()
    
        confirmAlert({
          customUI: ({ onClose, onConfirm }) => {
            return (
              <div className="react-confirm-alert modal-alert">
                <div className="react-confirm-alert-body">
                  <div className="header align-center">
                    <h1>Apakah anda yakin? </h1>
                  </div>
                  <div className="react-confirm-alert-button-group toggle">
                    <div className="align-center fullwidth">
                      <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                      <a href="javascript:void(0);" className="btn green" onClick={() => { this.onSubmit(); onClose(); }}>Yakin</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
        })
      }

    onSubmit() {
        console.log(this.state.predicate, this.state.descrip)
        let dataWillSave = {}
        let dataArr = []

        dataArr.push({
            "score": this.state.predicate.value, "description": this.state.descrip, "user_id": '"0eea9548-6397-4303-b980-e4b2bf34cc4a', "class_id": "1a5e496b-ffc4-445f-93b4-ef324e80e31c"
        });
        dataWillSave['user_attitudes'] = dataArr

        let url = `/v1/assessments/add0e9de-bf3a-4c6b-b611-6b5f6a6893dc/user_attitudes`
        apiClient('post', url, dataWillSave).then(res => {
            modal({
              message: 'Berhasil',
              description: 'Data yang Anda masukkan benar',
              btns: [
                {
                  label: 'Lanjut',
                  className: 'btn green',
                  event: this.props.history.push({
                    pathname: '/assessment/' + this.state.assessment_id + '/exam/' + this.state.exam + '/category/' +  this.props.location.state.conditon + '/class/' + this.state.class_id,
                    state: { assessment_category: this.props.location.state.conditon }
                  })
                }
              ]
            })
          })
            .catch(err => {
              let response = err.response
              let data = response.data.status_code
              if(data === 400) {
                error({
                  message: 'Gagal semua form harus diisi',
                  btns: [
                      {
                          label: 'Ulangi',
                          className: 'btn bcred cwhite'
                      }
                  ]
              })
              }
            })
    }

    render() {
        return (
            <Title title="Nilai Sikap">
                <div className="padding-content">
                    <div className="score-attitude-new">
                        <Header navbar={false} location="/score/attitude/" />
                        <div className="margin-side-4 margin-top-7">
                            <div className="col-sm-12">
                                <div className="col-sm-4" >
                                    <div className="content-block  content-score  ">
                                        <Report />
                                    </div>
                                </div>
                                <div className="col-sm-8" >
                                    <div className="content-block  content-score  ">
                                        <div className="padding-3">
                                            <div className="score-attitude-new__predicate-title">
                                                <span className="score-attitude-new__right-title-name ">Nilai Ahkir(Disiplin)</span>
                                                <span className="score-attitude-new__predicate-title"> - Hengky Reza Permana</span>
                                            </div>
                                            <div className="form margin-top-5">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Nilai Ahkir</label>
                                                        <div className="padding-top-1">
                                                            <Select
                                                                className="select-box"
                                                                classNamePrefix="select"
                                                                placeholder="Pilih Nilai Ahkir"
                                                                options={option}
                                                                onChange={this.onChangeSelect}
                                                                value={this.state.predicate}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row padding-top-5">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Deskripsi Sikap</label>
                                                        <div className="padding-top-1">
                                                            <textarea className="textarea-description form-control" value={this.state.descrip} onChange={this.onChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row margin-top-8">
                                                    <div className="col-sm-4">
                                                        <div className="range-button ">
                                                            <button className="btn-green" onClick={this.handleSave}>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Title>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
