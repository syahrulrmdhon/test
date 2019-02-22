import React, { Component } from 'react'
import Select from 'react-select';
import {classes, subjects} from './../../utils/common'

export default class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            classes: [],
            subjects: [],
        }
        this.triggerSubject = this.triggerSubject.bind(this)
    }

    componentDidMount(){
        classes.call(this, {attendance_type: 'subject'})
    }

    triggerSubject(event, props){
        subjects.call(this, {
            class_id: event.value
        }, {
            listOptions: true
        })
        this.props.onChangeAttr(event, props)
    }

    render() {
        return (
            <div className="margin-top-6 margin-left-3">
                <label className="header-title">Filter</label>
                <div className="margin-top-4">
                    <form>
                        <div className="content-input">
                            <label className="content-label">Tipe Penilaian</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Tipe Penilaian"
                                name= "assessment_type"
                                options= {this.props.assessment_types} 
                                value={this.props.assessment_type}
                                onChange={this.props.onChangeAttr}
                            />
                        </div>
                        <div className="content-input">
                            <label className="content-label">Kelas</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Kelas"
                                name= "class_id"
                                options= {this.state.classes}
                                onChange={this.triggerSubject}
                                value={this.props.class_id}
                            />
                        </div>
                        <div className="content-input">
                            <label className="content-label">Mata Pelajaran</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Mata Pelajaran"
                                name= "school_subject_id"
                                options={this.state.subjects}
                                onChange={this.props.onChangeAttr}
                            />
                        </div>
                        <div className="content-input margin-top-6 align-center">
                            <button 
                                className="submit-btn"
                                onClick={this.props.onFilter}
                            >Filter</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
