import React, { Component } from 'react'
import Header from './../../global/header'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import { FormQuestion } from './helper'
import { apiClient } from './../../../utils/apiClient'

export default class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            alias: '',
            examScore: {},
            exam_scores: [],
            dataScores: [],
            dataPost: [],
            idSubject: '',
            fullname: this.props.location.fullname,
            nilai: ''
        })
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.getDataScores()
    }
    getDataScores() {
        let assessment_id = '6ae41268-d737-4a87-bb54-1a9cfd1d69f8'
        let exam_id = '782a183b-a976-4e9f-b025-8cf46a45b646'
        let exam_scores_id = 'ac67857a-ad71-4a97-9718-c71c47e2e4bc'
        const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_scores/${exam_scores_id}`

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
        let assessment_id = '6ae41268-d737-4a87-bb54-1a9cfd1d69f8'
        let exam_id = 'b4aa7bda-f96d-4665-8dc3-fe263ed670ed'
        let exam_scores_id = '0eea9548-6397-4303-b980-e4b2bf34cc4a'
        const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_scores/${exam_scores_id}/bulk_fill_exam_scores`
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
        })
    }
    render() {
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
                <Header navbar={false} />
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
