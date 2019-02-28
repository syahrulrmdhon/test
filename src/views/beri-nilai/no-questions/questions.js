import React, { Component } from 'react'
import Header from './../../global/header'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import { apiClient } from './../../../utils/apiClient'
import { setError } from './../../../utils/common'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getNoQuestions, handleChange } from './../../../redux-modules/modules/no-question'

class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            alias: '',
            examScore: {},
            exam_scores: [],
            dataScores: [],
            dataPost: [],
            idSubject: '',
            fullname: props.location.state.fullname,
            nilai: '',
            flag: false
        })
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getNoQuestions(this.props.location.state.assessment, this.props.location.state.exam, this.props.location.state.student) //method in redux modules
    }

    handleSubmit(e) {
        e.preventDefault()
        const url = `v1/assessments/${this.props.location.state.assessment}/exams/${this.props.location.state.exam}/exam_scores/${this.props.location.state.student}/bulk_fill_exam_scores`
        let dataSubmit = []
        let objectSubmit = {}
        this.props.dataNoQuestions.data.no_questions.map((data, idx) => {
            dataSubmit.push({
                score_type: 'subject_average',
                related_id: data.related_id,
                score: data.score
            })
        })
        objectSubmit['exam_scores'] = dataSubmit

        apiClient('post', url, objectSubmit).then(res => {
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
        const data = []

        let collections = this.props.dataNoQuestions && this.props.dataNoQuestions.data && this.props.dataNoQuestions.data.no_questions || []
        collections.map((x, i) => {
            data.push(
                <div className='row' key={i} >
                    <div className='col-sm-6'>
                        <label className='disblock padding-bottom-2 subject-title'>Mata Pelajaran</label>
                        <input className='input-question' type='text' placeholder={x.aliasName} readOnly></input>
                    </div>
                    <div className='col-sm-6 margin-bottom-4'>
                        <label className='disblock padding-bottom-2 subject-title'>Nilai</label>

                        <input
                            key={Math.random()}
                            className='input-question'
                            name='nilai'
                            defaultValue={x.score ? x.score : 0}
                            type='number'
                            onChange={(e) => this.props.handleChange(e.target.value, i, 'score')}
                            placeholder='Masukkan Nilai...'
                        />
                    </div>
                </div>
            )
        })

        return (
            <div className='padding-content' >
                <Header navbar={false} location={path} />
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

const mapStateToProps = (state) => ({
    dataNoQuestions: state.noQuestion //noQuestion dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getNoQuestions, handleChange
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Questions)
