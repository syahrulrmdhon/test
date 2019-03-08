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
            <div className="filter">
                <div className="title">Filter</div>
                <form>
                    <div className="field-filter">
                        <label>Tipe Penilaian</label>
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
                    <div className="field-filter">
                        <label>Kelas</label>
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
                    <div className="field-filter">
                        <label>Mata Pelajaran</label>
                        <Select
                            className= "select-list"
                            classNamePrefix= "select"
                            placeholder= "Pilih Mata Pelajaran"
                            name= "school_subject_id"
                            options={this.state.subjects}
                            onChange={this.props.onChangeAttr}
                        />
                    </div>
                </form>
                <button 
                    className="btn-green"
                    onClick={this.props.onFilter}>
                    Filter
                </button>
            </div>
        )
    }
}
