import React, { Component } from 'react'
import classnames from 'classnames'
import {combineNameSubject, assessmentLabel} from './../../../utils/exam'
import {apiClient} from './../../../utils/apiClient'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { modal } from './../../global/modal'

import { assessmentGetData } from './../../../utils/exam' // getdata
import { NavLink } from 'react-router-dom'

var FontAwesome = require('react-fontawesome');
export default class Table extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: []
        }

        this.delete = this.delete.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount(){
        this.setState({
            data: this.props.data
        })
    }

    onDelete(value){
        let assessment_id = value.id
        let url = 'v1/assessments/' + assessment_id
        
        apiClient('delete', url).then(response => {
            modal({
                message: 'Berhasil',
                description: `Anda telah berhasil menghapus topik ${value.name}`,
                btns: [
                    {
                        label: 'Selesai',
                        className: 'btn green',
                        event: assessmentGetData.call(this, value.category),
                    }
                ]
            })
        })
    }

    delete(value){
        confirmAlert({
            customUI: ({ onClose, onConfirm }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Apakah anda yakin ingin menghapus topik ini? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={onClose}>Tidak</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => { this.onDelete(value); onClose(); }}>Ya</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    render(){
        let content = []
        if(this.state.data.length > 0){
            this.state.data.map((value, idx) => {
                const { category, assessment_type } = value
                
                let url = ''
                let totalExam = ''
                let subjectName = combineNameSubject(value.school_subjects)
                let color = assessmentLabel(value.assessment_type, true)

                if(category == 'attitude'){
                    totalExam = combineNameSubject(value.school_attitudes)
                    console.log(assessment_type,"assesment")
                    switch(assessment_type){
                        case 'daily':
                        url = `attitude/${value.id}/${category}`
                        break;
                        case 'final_aspect':
                        case 'final_subject':
                        url = `/score/attitude/${value.id}`
                        break;
                    }
                    
                } else {
                    url = 'exam/'+value.id
                    let label = assessmentLabel(value.assessment_type)
                    totalExam = value.exam_count + ' (' + label + ')'
                }
                
                content.push(
                    <tr key={idx} >
                        <td className="align-center"><span className={classnames("bullet", color)}></span></td>
                        <td>{value.name}</td>
                        <td>{subjectName}</td>
                        <td>{totalExam}</td>
                        <td>{value.created_date}</td>
                        <td className="align-right padding-right-6">
                            <NavLink to={url} className="btn default margin-right-4">Lihat</NavLink>
                            <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" onClick={this.delete.bind(this, value)} />
                            <NavLink to={`/penilaian/edit/${value.id}`}>
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </NavLink>
                        </td>
                    </tr>
                )
            })
        }

        let add_field_category = (this.props.category == 'attitude') ? 'Aspek Sikap' : 'Total Exam'

        return(
            <div className="table-responsive">
                <table className="table assessment">
                    <thead>
                        <tr className="main-head">
                            <th></th>
                            <th width="25%">Judul Topik</th>
                            <th>Mata Pelajaran</th>
                            <th width="15%">{add_field_category}</th>
                            <th width="10%">Tanggal Dibuat</th>
                            <th width="25%" className="align-right padding-right-6">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }
}