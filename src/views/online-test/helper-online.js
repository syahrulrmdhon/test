import React, { Component } from 'react'
import { apiClient } from '../../utils/apiClient';

export class DetailOnlineExam extends Component {
    render() {
        let content = []
        let data = this.props.detail
        if (data) {
            const full = data.problem_type_full_text
            content.push(
                <div key={Math.random()}>

                    {full === '' ?
                        <label key={Math.random()} className='info-danger'>Soal Belum Dibuat</label>
                        :
                        <label className='info padding-bottom-2'>{full}</label>
                    }
                </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

export class ActionList extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let content = []
        let id = this.props.id
        let exam_id = this.props.examId
        let name = this.props.name
        let subjectId = this.props.subjectId
        let flag = this.props.flag
        let examId = this.props.examId
        if (!flag) {
            content.push(
                <div className='right-block__action-wrapper' key={Math.random()}>
                    <div className='right-block__action' onClick={(e) => { this.props.direct(e, id, exam_id) }}>Lihat Soal</div>
                    <div className='right-block__action' onClick={(e) => (this.props.remove(id, examId))}>Hapus Soal</div>
                </div>
            )
        } else {
            content.push(
                <div className='right-block__action-wrapper' key={Math.random()}>
                    <div className='right-block__action padding-left-0' onClick={(e) => (this.props.create(e, id, name, subjectId, examId))}>Buat Soal</div>
                </div>
            )
        }

        return (
            <div className='padding-top-2'>
                {content}
            </div>
        )
    }
}

export class DetailAction extends Component {
    render() {
        let content = []
        let data = this.props.detail
        let id = this.props.id
        let examId = this.props.examId
        console.log(data, "data")
        if (examId) {
            content.push(
                <div className='padding-bottom-2' key={Math.random()}>
                    <label className='p-bold padding-right-2'>Detil Soal</label>
                    <i className='fa fa-pencil icon-green' onClick={(e) => (this.props.detailClicked(e, id, examId))}>
                    </i>
                </div>
            )

        } else {
            content.push(
                <div className='padding-bottom-2' key={Math.random()}>
                    <label className='p-bold padding-right-2'>Detil Soal</label>
                </div>
            )
        }

        return <div>
            {content}
        </div>
    }
}

export function getProblemTypes() {
    apiClient('get', 'v1/filters/problem_types').then(res => {
        let data = res.data.data.problem_types || []
        let result = []
        if (data.length > 0) {

            data.map((data) => {
                result.push({
                    value: data.key,
                    label: data.value
                })
            })
        }
        this.setState({
            problemTypes: result
        })
    })
}

export function getExamListForDuplicate(params = {}, options = {}) {

    apiClient('get', 'v1/exams/list', false, params).then(res => {
        let data = res.data.data.exams.entries || []
        let result = []
        if (data.length > 0) {

            data.map((x) => {
                result.push({
                    value: x.id,
                    label: x.name
                })
            })
        }
        this.setState({
            listSubjectName: result
        })
    })
}