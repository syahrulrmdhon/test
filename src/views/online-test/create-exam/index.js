import React, { Component } from 'react'
import Page from './../../../components/Title'
import Header from './../../global/header'
import Switch from 'react-switch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    handleEvent,
    buildObject,
    addQuestion
} from './../../../redux-modules/modules/onlineExam'
import { getProblemTypes } from './../helper-online'

//scss
import './../../../styles/online-test.scss'
import AddQuestion from './add-question';
import { apiClient } from '../../../utils/apiClient';
import _ from 'lodash'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            name: props.location.state.name,
            id: props.match.params.id,
            problemTypes: [],
            length: null,
        };
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
    }

    componentDidMount() {
        getProblemTypes.call(this)
        this.props.buildObject()
    }

    backToList() {
        this.props.history.goBack()
    }

    handleChangeSwitch(checked) {
        this.setState({ checked });
    }

    handleSubmit(e) {
        e.preventDefault()

        let data = this.props.exam
        console.log('data submit', data)
        let assesment_id = this.state.id
        let url = `v1/assessments/${assesment_id}/exams`

        apiClient('post', url, data).then(res => {
            console.log('res',res)
            
        })
    }

    render() {
        const { name, kkm, description } = this.props.exam || {}
        let exam_problem_types = _.get(this, 'props.exam.exam_problem_types_attributes', [])        
        let questions = []

        if (exam_problem_types.length > 0) {
            exam_problem_types.map((question, idx) => {
                questions.push(<AddQuestion
                    key={(idx)}
                    index={(idx)}
                />)
            })
        }

        return (
            <Page title="Tulis Ujian Online">
                <Header />
                <div className='new-exam-online padding-content h-100'>
                    <div className='margin-content full-margin'>
                        <div className='content-wrapper'>
                            <div className='border-bottom title-container'>
                                <div className="padding-3">
                                    <span className="title-page"> Buat Soal Ujian </span>
                                    <span className="subject-head float-right"> {this.state.name} </span>
                                </div>
                            </div>
                            <div className='form-position margin-bottom-3'>
                                <div className="margin-top-3">
                                    <label>Judul Ujian</label>
                                    <div className="margin-top-1">
                                        <input
                                            type="text" className="form-control"
                                            placeholder='Masukkan Judul Ujian...'
                                            defaultValue={name}
                                            name='name'
                                            onChange={(e) => { this.props.handleEvent(e.target.value, 'exam', 'name') }}
                                        />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Nilai KKM</label>
                                    <div className="margin-top-1">
                                        <input
                                            type="number" className="form-control"
                                            placeholder='Masukkan Nilai KKM...'
                                            defaultValue={kkm}
                                            name='kkm'
                                            onChange={(e) => { this.props.handleEvent(e.target.value, 'exam', 'kkm') }}
                                        />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Kisi-kisi/Indikator</label>
                                    <div className="margin-top-1">
                                        <textarea
                                            className="form-control"
                                            placeholder='Masukkan Kisi-Kisi...'
                                            defaultValue={description}
                                            name='description'
                                            onChange={(e) => { this.props.handleEvent(e.target.value, 'exam', 'description') }}
                                        />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Duplikat Soal</label>
                                    <Switch
                                        onChange={this.handleChangeSwitch}
                                        checked={this.state.checked}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onHandleColor="#ffffff"
                                        onColor="#1a9d7f"
                                        offColor="#cccccc"
                                        id="normal-switch"
                                        height={18}
                                        width={35}
                                    />
                                </div>
                                <div className='margin-top-3'>
                                    {questions}
                                </div>
                                <div className="margin-top-3" onClick={this.props.addQuestion}>
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className='normal-green-text'> Tambah Tipe Soal</span>
                                </div>
                                <div className='margin-top-3'>
                                    <div className='button'>
                                        <button className='btn-white margin-right-3'
                                            onClick={this.backToList.bind(this)}
                                        >
                                            Kembali
                                        </button>
                                        <button className='btn-green' onClick={this.handleSubmit.bind(this)}>Lanjut</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    exam: _.get(state, 'onlineExam.exam', {}), //listOnlineExam dari reducer
    exam_problem_types: _.get(state, 'onlineExam.exam.exam_problem_types_attributes', {})
})
const mapDispatchToProps = dispatch => bindActionCreators({
    handleEvent,
    buildObject,
    addQuestion
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(index)