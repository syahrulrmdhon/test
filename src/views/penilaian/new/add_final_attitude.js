import React, { Component } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import {
    attitudeAspects,
    subjects,
} from './../../../utils/common'

// redux
import {
    handleAttitude,
    handleSubject,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddFinalAttitude extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            attitude_aspects: [],
            subjects: [],
        }
    }

    componentDidMount(){
        const {assessment_type, assessment_classes_attributes} = this.props.assessment

        let assessment_class = this.props.assessment.assessment_classes_attributes
        let class_id = ''

        assessment_class.map((x) =>{
            class_id = x.class_id
        })

        // console.log(class_id,"here here")

        switch(assessment_type){
            case 'final_subject':
                subjects.call(this, false, {
                    listOptions: class_id
                })
            break;
            case 'final_aspect':
                attitudeAspects.call(this, false, {
                    listOptions: true
                })
            break;
        }
    }

    render(){
        const {assessment_type} = this.props.assessment
        const { school_attitude_id } = this.props.assessment_attitude
        const { school_subject_id } = this.props.assessment_subject
        let result = ''

        switch(assessment_type){
            case 'final_subject':
            result = <div className="content-input margin-top-5">
                <label className="content-label">Mata Pelajaran</label>
                <Select
                    isClearable
                    className= "select-list"
                    classNamePrefix= "select"
                    placeholder= "Pilih mata pelajaran"
                    name= "school_attitude_id"
                    options={this.state.subjects}
                    onChange={(event) => {this.props.handleSubject(event.value, 0, 'attitude')}}
                    value={this.state.subjects.find((element) => { return element.value == school_subject_id })}
                />
            </div>
            break;
            case 'final_aspect':
                result = <div className="content-input margin-top-5">
                    <label className="content-label">Aspek Sikap</label>
                    <Select
                        isClearable
                        className= "select-list"
                        classNamePrefix= "select"
                        placeholder= "Pilih nilai sikap"
                        name= "school_attitude_id"
                        options={this.state.attitude_aspects}
                        onChange={(event) => {this.props.handleAttitude(event.value, 0, 'school_attitude_id')}}
                        value={this.state.attitude_aspects.find((element) => { return element.value == school_attitude_id })}
                    />
                </div>
            break;
        }

        return(
            <div>
                <label className="header-title margin-top-10 margin-bottom-6">Sikap - Penilaian Akhir Aspek Sikap</label>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="row">
                            <div className="col-sm-6">
                                {result}
                            </div>
                        </div>
                        <div className="row margin-top-4">
                            <div className="col-sm-12">
                                <div className="content-input">
                                    <label className="content-label">Deskripsi</label>
                                    <textarea 
                                        className="textarea-box disblock fullwidth"
                                    ></textarea>
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
    assessment: state.assessment,
    assessment_classeset: state,
    assessment_attitude: state.assessment.assessment_attitudes_attributes ? (state.assessment.assessment_attitudes_attributes.length ? state.assessment.assessment_attitudes_attributes[0] : {
        school_attitude_id: null
    } )  : {
        school_attitude_id: null
    },
    assessment_subject: state.assessment.assessment_subjects_attributes ? (state.assessment.assessment_subjects_attributes.length ? state.assessment.assessment_subjects_attributes[0] : {
        school_subject_id: null
    } )  : {
        school_subject_id: null
    }
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    handleAttitude,
    handleSubject,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddFinalAttitude)