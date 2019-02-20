import React, { Component } from 'react'
import Select from 'react-select'

import {
    basicComps
} from './../../../utils/common'

import {
    addKD,
    handleKD,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class AddKD extends Component {
    constructor(props){
        super(props)

        this.state = {
            basic_comps: this.props.basic_comps,
        }
    }

    componentDidMount(){
        const school_subject_id = this.props.assessment_subject ? this.props.assessment_subject.school_subject_id : null
        // basicComps.call(this,)
    }

    render(){
        let basic_comps = []
        if(this.props.assessment_basic_comps.length > 0){
            this.props.assessment_basic_comps.map((basic_comp, idx) => {
                let remove;
                if(idx > 0){
                    remove = <div className="col-sm-1 margin-top-9">
                        <a href="javascript:void(0);" onClick={() => {this.props.removeKD(this.props.index_subject, idx)}} >
                            <FontAwesome name="trash" className="margin-top-2" />
                        </a>
                    </div>
                }

                let value = (this.props.basic_comps.length > 0) ? this.props.basic_comps.find((element) => { return element.value == basic_comp.basic_comp_id }) : null

                basic_comps.push(
                    <div className="row" key={idx}>
                        <div className="col-sm-10">
                            <div className="content-input margin-top-4">
                                <label className="content-label">Kompetensi Dasar</label>
                                <Select
                                    isClearable
                                    className= "select-list"
                                    classNamePrefix= "select"
                                    placeholder= "Pilih Kompetensi Dasar"
                                    options={this.props.basic_comps}
                                    onChange={(event) => {this.props.handleKD(event.value, this.props.index_subject, idx)}}
                                    value={value}
                                />
                            </div>
                        </div>
                        {remove}
                    </div>
                )
            })
        }

        return(
            <div>
                {basic_comps}
                <div className="row">
                    <div className="col-sm-10">
                        <div className="float-right">
                            <div className="margin-top-4">
                                <a href="javascript:void(0);" onClick={() => {this.props.addKD(this.props.index_subject)}} >
                                    <FontAwesome name="plus-circle" /> Tambah Kompetensi Dasar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    assessment_subject: state.assessment.assessment_subjects_attributes[props.index_subject] || {},
    assessment_basic_comps: state.assessment.assessment_subjects_attributes[props.index_subject]['assessment_basic_comps_attributes'] || []
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    addKD,
    handleKD,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddKD)