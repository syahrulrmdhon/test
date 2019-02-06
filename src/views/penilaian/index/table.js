import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome');
import {combineNameSubject} from './../../../utils/exam'
import {apiClient} from './../../../utils/apiClient'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { assessmentGetData } from './../../../utils/exam' // getdata

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
            assessmentGetData.call(this, value.category)
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
                let totalExam = ''
                let subjectName = combineNameSubject(value.school_subjects)

                if(value.category == 'attitude'){
                    totalExam = combineNameSubject(value.school_attitudes)
                } else {
                    totalExam = (value.exams.length || '0') + ' Exam'
                }
                
                content.push(
                    <tr key={idx} >
                        <td className="align-center"><span className="bullet bcgreen"></span></td>
                        <td>{value.name}</td>
                        <td>{subjectName}</td>
                        <td>{totalExam}</td>
                        <td>20/01/2019</td>
                        <td className="align-right padding-right-6">
                            <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                            <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" onClick={this.delete.bind(this, value)} />
                            <FontAwesome name="edit" className="margin-left-2 cgreen" />
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
                            <th>Judul Topik</th>
                            <th>Mata Pelajaran</th>
                            <th>{add_field_category}</th>
                            <th>Tanggal Dibuat</th>
                            <th className="align-right padding-right-6">Tindakan</th>
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