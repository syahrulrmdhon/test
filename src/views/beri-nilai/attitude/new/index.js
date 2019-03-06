import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from './../../../../components/Title'
import Header from './../../../global/header'
import Report from './report-list'
import Select from 'react-select'
import { apiClient } from '../../../../utils/apiClient'
import { error, modal } from './../../../global/modal'
import { getDataScoreDetail, handlingInputText,handlingInputSelect } from './../../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';
import Page from './../../../../components/Title'

//css
import './../../../../styles/attitude.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const option = [
    { value: 2, label: 'Sangat Baik' },
    { value: 1, label: 'Baik' },
    { value: 0, label: 'Butuh Perhatian' }
]


export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            predicate: '',
            activeTab: 'semua',
            descrip: '',
            path: `/score/attitude/${this.props.match.params.assessment_id}`
        }
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.toggle = this.toggle.bind(this);


    }
    componentDidMount() {
        let score = ''
        switch(this.state.activeTa){
            case 'semua':
                score = ''
            break;
            case 'sb':
                score = 2
            break;
            case 'b':
                score = 1
            break;
            case 'bp':
                score = 0
            break;
            default:
                score = ''
            
        }
        this.props.getDataScoreDetail(this.props.match.params.assessment_id, this.props.match.params.class_id, this.props.match.params.user_id, score)
    }

    onChangeSelect(predicate) {
        this.setState({ predicate })
    }
    onChange(e) {
        this.setState({
            descrip: e.target.value
        })
    }

    toggle(tab) {
        console.log(tab)
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
        let dataWillSave = {}

        dataWillSave['user_attitude'] = this.props.data_form
        let url = `v1/assessments/${this.props.match.params.assessment_id}/classes/${this.props.match.params.class_id}/users/${this.props.match.params.user_id}`

        apiClient('post', url, dataWillSave).then(res => {
            modal({
                message: 'Berhasil',
                description: 'Data yang Anda masukkan benar',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push({
                            pathname: this.state.path,
                        })
                    }
                ]
            })
        })
            .catch(err => {
                let response = err.response
                let data = response.data.status_code
                if (data === 400) {
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
        const header = this.props.data_header
        const fullname = header && header.user && header.user.full_name
        const data_school_subjects = header && header.assessment && header.assessment.school_subjects
        const data_school_subjects_length =  data_school_subjects && data_school_subjects.length
        const data_school_attitudes = header && header.assessment && header.assessment.school_attitudes

        let title_render = []
        if (data_school_subjects_length === 1) {
            data_school_subjects && data_school_subjects.map((data) => {
                title_render.push(<span className="score-attitude-new__right-title-name ">Nilai Ahkir ( {data.alias_name} )</span>
                )
            })
        } else {
            data_school_attitudes && data_school_attitudes.map((data) => {
                title_render.push(<span className="score-attitude-new__right-title-name ">Nilai Ahkir ( {data.alias_name} )</span>
                )
            })
        }
        let select = []
        let score = this.props.data_form && this.props.data_form.score
        console.log(score,"score")
            select.push(  <Select
                className="select-box"
                classNamePrefix="select"
                placeholder="Pilih Nilai Ahkir"
                options={option}
                onChange={(e) => {this.props.handlingInputSelect(e,'score')}}
                value={option.filter((element) => {return element.value === score })}
            />)
            console.log(this.props.data_form,"form data")
        return (
            <Title title="Nilai Sikap">
                <div className="padding-content">
                    <div className="score-attitude-new">
                        <Header navbar={false} location={this.state.path} />
                        <div className="margin-side-4 margin-top-7">
                            <div className="col-sm-12">
                                <div className="col-sm-5" >
                                    <div className="content-block  content-score  ">
                                        <Report
                                            toggle={this.toggle}
                                            activeTab={this.state.activeTab}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-7" >
                                    <div className="content-block  content-score  ">
                                        <div className="padding-3">
                                            <div className="score-attitude-new__predicate-title">
                                                {title_render}
                                                <span className="score-attitude-new__predicate-title"> - {fullname}</span>
                                            </div>
                                            <div className="form margin-top-5">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Nilai Ahkir</label>
                                                        <div className="padding-top-1">
                                                          {select}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row padding-top-5">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Deskripsi Sikap</label>
                                                        <div className="padding-top-1">
                                                            <textarea className="textarea-description form-control" value={this.props.data_form && this.props.data_form.description}  onChange={(e) => {this.props.handlingInputText(e,'description')}} />
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

const mapStateToProps = state => ({
    data_header: state.attitude && state.attitude.data,
    data_form: state.attitude && state.attitude.data && state.attitude.data.data_form,
    test:state
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreDetail,handlingInputText,handlingInputSelect }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Index);
