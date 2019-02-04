import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome')
import Subject from './component/subject'

export default class Componentt extends Component {
    constructor(props){
        super(props)

        const school = JSON.parse(localStorage.getItem("school"))

        this.state = {
            school_level: school.level,
            subject_list: [{}],
            assessment_subjects_attributes: [],
        }
        this.addSubject = this.addSubject.bind(this)
        this.removeSubject = this.removeSubject.bind(this)
    }

    removeSubject(index, value){
        if(this.state.assessment_subjects_attributes.indexOf(value) > -1){
            this.state.assessment_subjects_attributes.splice(index, 1);
        }
        this.setState({
            subject_list: this.state.subject_list.slice(0, index).concat(this.state.subject_list.slice((index+1), this.state.subject_list.length)) 
        })
    }

    addSubject(){
        const subject_list = this.state.subject_list[0]
        this.setState({
            subject_list: this.state.subject_list.concat(subject_list)
        })  
    }

    render(){
        let subject_list = []
        if(this.state.subject_list.length > 0){
            this.state.subject_list.map((x, idx) => {
                subject_list.push(<Subject 
                    key={Math.random()} 
                    index={idx} 
                    removeSubject= {this.removeSubject}
                    value={this.state.assessment_subjects_attributes[idx]} 
                />)
            })
        }

        let addSection = ''
        if(this.state.school_level == 'elementary_school'){
            addSection = <div className="margin-top-5">
                <div className="margin-top-2">
                    <a href="javascript:void(0);" onClick={this.addSubject} >
                        <FontAwesome name="plus-circle" /> Tambah Mata Pelajaran
                    </a>
                </div>
            </div>;
        }

        return(
            <div className="row">
                <div className="col-sm-10">
                    {subject_list}
                    {addSection}
                    <div className="margin-top-4 padding-top-4">
                        <button className="submit-btn default margin-right-2" onClick={() => { this.props.callBack('component') }} >Kembali</button>
                        <button className="submit-btn">Simpan</button>
                    </div>
                </div>
            </div>
        )
    }
}