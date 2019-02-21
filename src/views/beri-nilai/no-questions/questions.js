import React, { Component } from 'react'
import Header from './../../global/header'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import { apiClient } from './../../../utils/apiClient'
import { setError } from './../../../utils/common'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            assessment_id: props.match.params.assessment_id,
            exam_id: props.match.params.exam_id,
            student_id: props.match.params.student_id,
            alias: '',
            examScore: {},
            exam_scores: [],
            dataScores: [],
            dataPost: [],
            idSubject: '',
            fullname: props.location.fullname,
            class_id: props.match.params.class_id,
            nilai: '',
            flag: false
        })
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.getDataScores()
    }
    getDataScores() {
        const url = `v1/assessments/${this.props.location.state.assessment}/exams/${this.props.location.state.exam}/exam_scores/${this.props.location.state.student}`

        apiClient('get', url).then(res => {
            res.data.data.collections.map((value) => {
                this.setState({
                    dataScores: res.data.data.collections,
                    idSubject: value.id
                })
            })

        })
    }
    handleChange(e) {
        let score = e.target.value
        this.setState({ nilai: score })
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = `v1/assessments/${this.props.location.state.assessment}/exams/${this.props.location.state.exam}/exam_scores/${this.props.location.state.student}/bulk_fill_exam_scores`
        const data = {
            exam_scores: [
                {
                    score_type: 'subject_average',
                    related_id: this.state.idSubject,
                    score: this.state.nilai
                }
            ]
        }

        apiClient('post', url, data).then(res => {
            event.preventDefault();

            confirmAlert({
                customUI: ({ onClose, onConfirm }) => {
                    return (
                        <div className="react-confirm-alert modal-alert">
                            <div className="react-confirm-alert-body">
                                <div className="header align-center">
                                    <h1>Yakin merubah nilai siswa ini? </h1>
                                </div>
                                <div className="react-confirm-alert-button-group toggle">
                                    <div className="align-center fullwidth">
                                        <a href="javascript:void(0);" className="btn default" onClick={onClose}>Kembali</a>
                                        <a href="javascript:void(0);" className="btn green" onClick={() => { this.onConfirm(); onClose(); }}>Yakin</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
            })
        })
            .catch(err => {
                let response = err.response
                let data = response.data
                if (this.state.nilai === '') {
                    this.setState({
                        errors: setError(data),
                    })
                } else {
                    this.onShowAlert(data)
                }
            })
    }
    onConfirm() {
        this.props.history.push({
            pathname: '/beri-nilai/' + this.props.location.state.assessment + '/exam/' + this.props.location.state.exam + '/class/' + this.props.location.state.class_id + '/flag' + this.state.flag,
        })
    }
    render() {
        const path = `/beri-nilai/${this.props.location.state.assessment}/exam/${this.props.location.state.exam}/class/${this.props.location.state.class_id}/flag/${this.state.flag}`
        let data = []
        if (this.state.dataScores.length > 0) {
            let scores = this.state.dataScores
            scores.map((value, i) => {
                data.push(
                    <div className='row' key={i}>
                        <div className='col-sm-6'>
                            <label className='disblock padding-bottom-2 subject-title'>Mata Pelajaran</label>
                            <input className='input-question' type='text' placeholder={value.alias_name} readOnly></input>
                        </div>
                        <div className='col-sm-6 margin-bottom-4'>
                            <label className='disblock padding-bottom-2 subject-title'>Nilai</label>
                            
                            <input
                                className='input-question'
                                name='nilai'
                                value={this.state.nilai}
                                type='number'
                                onChange={(e) => this.handleChange(e)}
                                placeholder='Masukkan Nilai...'
                            />
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className='padding-content'>
                <Header navbar={false} location={path}/>
                <div className='box-question margin-top-4 box-shadow'>
                    <div className='form-question'>
                        <div className='title-content-evaluasi padding-top-6'>
                            <strong>Beri Nilai</strong>
                        </div>
                        <div className='cgreen-light'>
                            {this.props.location.state.fullname}
                        </div>
                        <div className='padding-top-6'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='border-bottom margin-bottom-4'>
                                    {data}
                                </div>
                                <button type='submit' className='btn-green btn-save-question margin-bottom-6'>Simpan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
