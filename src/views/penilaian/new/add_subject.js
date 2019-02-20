import React, { Component } from 'react'
import Select from 'react-select'
import AddKD from './add_kd'

import { 
    subjects,
    basicComps,
} from './../../../utils/common'

// redux
import {
    addSubject,
    removeSubject,
    handleSubject,
    removeKD,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')
const school = JSON.parse(localStorage.getItem("school"))

class AddSubject extends Component {
    constructor(props){
        super(props)

        this.state = {
            subjects: [],
        }

        this.getSubjectList = this.getSubjectList.bind(this)
        this.setSubject = this.setSubject.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps.assessment != this.props.assessment){
            this.getSubjectList()
        }
    }

    getSubjectList(){
        let params = {
            class_id: []
        }
        if(this.props.assessment.assessment_classes_attributes){
            this.props.assessment.assessment_classes_attributes.map((classes_attribute, idx) => {
                params['class_id'][idx] = classes_attribute.class_id
            })
            subjects.call(this, params, {listOptions: true})
        }
    }

    setSubject(event, idx){
        const category = this.props.assessment.category

        if(category && event.value){
            basicComps.call(this, {
                category: category,
                school_subject_id: event.value,
            }, {
                listOptions: true,
                fieldName: "basic_comps_" + idx
            })
        }
        this.props.handleSubject(event.value, idx)
    }

    render(){
        let addSection = ''
        let subjects = []
        if(school.school_level == 'elementary_school'){
            addSection = <div className="margin-top-5">
                <div className="margin-top-2">
                    <a href="javascript:void(0);" onClick={this.props.addSubject} >
                        <FontAwesome name="plus-circle" /> Tambah Mata Pelajaran
                    </a>
                </div>
            </div>;
        }

        if(this.props.assessment_subjects.length > 0){
            this.props.assessment_subjects.map((subject, idx) => {
                let remove;
                let parameter = "basic_comps_" + idx

                if(idx > 0){
                    remove = <div className="col-sm-1 margin-top-9">
                        <a href="javascript:void(0);" onClick={() => {this.props.removeSubject(idx)}}>
                            <FontAwesome name="trash" className="margin-top-2" />
                        </a>
                    </div>
                }

                subjects.push(
                    <div key={idx}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="content-input margin-top-5">
                                    <label className="content-label">Mata Pelajaran</label>
                                    <Select
                                        isClearable
                                        className= "select-list"
                                        classNamePrefix= "select"
                                        placeholder= "Pilih Mata Pelajaran" 
                                        options={this.state.subjects}
                                        onChange={(event) => {this.setSubject(event, idx)}}
                                        value={this.state.subjects.find((element) => { return element.value == subject.school_subject_id })}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {remove}
                            </div>
                        </div>
                        <AddKD 
                            index_subject={idx}
                            basic_comps= {this.state[parameter] || []}
                            removeKD={this.props.removeKD}
                        />
                        <div className="border-top margin-top-5"></div>
                    </div>
                )
            })
        }

        return(
            <div>
                {subjects}
                {addSection}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    assessment: state.assessment,
    assessment_subjects: state.assessment.assessment_subjects_attributes || []
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    addSubject,
    removeSubject,
    handleSubject,
    removeKD,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddSubject)