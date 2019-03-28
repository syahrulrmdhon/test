import React, { Component } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import {
    attitudeAspects,
    subjects,
} from './../../../utils/common'

import {
    handleEvent,
    handleSubject,
    handleAttitude,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class AddAttitude extends Component {
    constructor(props){
        super(props)

        this.state = {
            attitude_aspects: [],
            subjects: [],
        }
    }

    componentDidMount(){
        attitudeAspects.call(this, false, {
            listOptions: true,
        })
        subjects.call(this, false, {
            listOptions: true,
        })
    }

    render(){
        const event_date = this.props.assessment.event_date ? new Date(this.props.assessment.event_date) : new Date()
        const school_subject_id = this.props.assessment_subject ? this.props.assessment_subject.school_subject_id : null
        const school_attitude_id = this.props.assessment_attitude ? this.props.assessment_attitude.school_attitude_id : null

        return(
            <div>
                <div className="row margin-top-4">
                    <div className="col-sm-12">
                        <div className="content-input">
                            <label className="content-label">Aspek Sikap</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Select
                                        isClearable
                                        className= "select-list"
                                        classNamePrefix= "select"
                                        placeholder= "Pilih sikap"
                                        onChange={(event) => {this.props.handleAttitude(event.value, 0)}}
                                        options={this.state.attitude_aspects}
                                        value={this.state.attitude_aspects.find((element) => { return element.value == school_attitude_id })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-4">
                    <div className="col-sm-12">
                        <div className="content-input">
                            <label className="content-label">Mata Pelajaran</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Select
                                        isClearable
                                        className= "select-list"
                                        classNamePrefix= "select"
                                        placeholder= "Pilih mata pelajaran"
                                        onChange={(event) => {this.props.handleSubject(event.value, 0, 'attitude')}}
                                        options={this.state.subjects}
                                        value={this.state.subjects.find((element) => { return element.value == school_subject_id })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-4">
                    <div className="col-sm-12">
                        <div className="content-input">
                            <label className="content-label">Tanggal Penilaian Sikap</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="position-relative">
                                        <DatePicker 
                                            className="w-100"
                                            selected={event_date}
                                            placeholderText="Weeks start on Monday"
                                            onChange={(newDate) => {this.props.handleEvent(newDate, 'event_date')}}
                                            // dateFormat="Pp"
                                            // timeCaption="Time"
                                            // onChange={(event) => {this.props.handleTimeAttr(event, 'start_date', this.props.index)}}
                                            // showTimeSelect
                                        />
                                        <FontAwesome name="calendar" className="calendar-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    assessment_classeset: state,
    assessment: state.assessment ? state.assessment : {},
    assessment_attitude: state.assessment.assessment_attitudes_attributes ? (state.assessment.assessment_attitudes_attributes.length > 0 ? state.assessment.assessment_attitudes_attributes[0] : {})  : {},
    assessment_subject: state.assessment.assessment_subjects_attributes ? state.assessment.assessment_subjects_attributes[0] : {},
})
const mapDispatchToProps = dispatch => bindActionCreators({ 
    handleEvent,
    handleSubject,
    handleAttitude,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddAttitude)