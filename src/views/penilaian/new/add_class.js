import React, { Component } from 'react'
import Select from 'react-select';

import {
    addClass,
    removeClass,
    handleEventClass,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { classes } from './../../../utils/common'

var FontAwesome = require('react-fontawesome')

class AddClass extends Component {
    constructor(props){
        super(props)

        this.state = {
            classes: []
        }
    }

    componentDidUpdate(prevProps){
        const { category, grade_id } = this.props.assessment
        if(prevProps.assessment !== this.props.assessment){
            switch(category){
                case 'knowledge':
                case 'skill':
                    classes.call(this, {attendance_type: 'subject', grade_id: grade_id})
                break;
                default:
                     classes.call(this, {attendance_type: 'subject'})

            }

            if(this.props.assessment.assessment_type == 'final_aspect'){
                classes.call(this, {attendance_type: 'homeroom'})

            }
        }
    }

   

    render(){
        let classes = []
        let addClass = ''
        if(this.props.assessment_classes){
            this.props.assessment_classes.map((assessment_class, idx) => {
                let remove;
                let class_id = assessment_class.class_id || null

                if(idx > 0){
                    remove = <div className="col-sm-1">
                        <a href="javascript:void(0);" onClick={() => {this.props.removeClass(idx)}}>
                            <FontAwesome name="trash" className="margin-top-2" />
                        </a>
                    </div>
                }

                classes.push(
                    <div className="row margin-top-4" key={idx}>
                        <div className="col-sm-8">
                            <div className="content-input">
                                <label className="content-label">Kelas</label>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <Select
                                            isClearable
                                            className= "select-list"
                                            classNamePrefix= "select"
                                            placeholder= "Pilih kelas"
                                            options={this.state.classes}
                                            onChange={(event) => {this.props.handleEventClass( event.value, idx, 'class_id')}}
                                            value={this.state.classes.find((element) => { return element.value == class_id })}
                                        />
                                    </div>
                                    {remove}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        if(this.props.assessment.category !== 'attitude'){
            addClass = <div className="row">
                <div className="col-sm-6">
                    <div className="float-right margin-top-2">
                        <a href="javascript:void(0);" onClick={this.props.addClass} >
                            <FontAwesome name="plus-circle" /> Tambah Kelas
                        </a>
                    </div>
                </div>
            </div>
        }

        return(
            <div>
                {classes}
                {addClass}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    assessment: state.assessment,
    assessment_classes: state.assessment ? state.assessment.assessment_classes_attributes : [{}],
    assessment_classeset: state.assessment ,
})
const mapDispatchToProps = dispatch => bindActionCreators({ 
    addClass,
    removeClass,
    handleEventClass,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddClass)