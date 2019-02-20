import React, { Component } from 'react'
import Header from '../../global/header'
var FontAwesome = require('react-fontawesome')
import Classes from './classes'
// import {getDataExamClass} from './../../../utils/exam_class'
import { getParticipant, addClass, removeClass } from './../../../redux-modules/modules/exam'
import { getDate } from './../../../utils/common'
import { apiClient } from './../../../utils/apiClient'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorModal from './../../global/error_modal'

class ParticipantClass extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 'ClassForm',
            assessment_id: this.props.match.params.assessment_id || null,
            exam_id: this.props.match.params.exam_id || null,
            basic_comps: [],
            class_filters: [],
            exam: {
                exam_classes_attributes: [
                    {
                        class_id: null,
                        start_date: null,
                        deadline_date: null,
                        comp_kkms: [],
                    }
                ],
                exam_participants_attributes: [],
            },
            isError: false,
        }

        this.addClass = this.addClass.bind(this)
        this.removeClass = this.removeClass.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    

    componentDidMount(){
        this.props.getParticipant(this.state.step, this.state.assessment_id, this.state.exam_id)
    }

    addClass(){
        this.props.addClass()
    }

    removeClass(index){
        this.props.removeClass(index)
    }

    onSubmit(){
        event.preventDefault();
        let data = []
        
        if(this.props.exam.data.exam.exam_classes_attributes){
            this.props.exam.data.exam.exam_classes_attributes.map((exam_classes_attribute, idx) => {
                const start_date = (exam_classes_attribute.start_date == null) ? new Date() : new Date(exam_classes_attribute.start_date)
                const deadline_date = (exam_classes_attribute.deadline_date == null) ? new Date() : new Date(exam_classes_attribute.deadline_date)

                exam_classes_attribute.start_date = getDate('case-5', start_date)
                exam_classes_attribute.deadline_date = getDate('case-5', deadline_date)

                this.props.exam.data.exam.exam_classes_attributes[idx] = exam_classes_attribute
            })
        }

        if(data){
            let url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/validate?step=ClassForm`

            apiClient('post', url, this.props.exam.data).then(response => {
                this.props.history.push(`/pariticipant-user/${this.state.assessment_id}/assessment/${this.state.exam_id}/exam`)
            }).catch(error => {
                this.setState({
                    isError: true
                })
            })   
        }        
    }

    render(){
        let error = []
        let exam_classes = this.props.exam && this.props.exam.data && this.props.exam.data.exam.exam_classes_attributes;
        let basic_comps = this.props.exam && this.props.exam.data && this.props.exam.data.basic_comps;

        let class_view = []
        if(exam_classes){
            exam_classes.map((data, idx) => {
                class_view.push(<Classes 
                    index={idx} 
                    key={idx}  
                    // data={data}
                    // basic_comps={basic_comps}
                    removeClass={this.removeClass}
                />)
            })
        }

        if(this.state.isError){
            error.push(<ErrorModal key={Math.random()} status="error" message="Gagal menambah partisipan kelas, cek kembali data yang dibutuhkan" />)
            this.setState({
                isError: false,
            })
        }

        return(
            <div className="padding-content">
                {error}
                <Header />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">Kelas yang ditugaskan</label>
                                    {class_view}
                                    <div className="row margin-top-6">
                                        <div className="col-sm-6">
                                            <a href="javascript:void(0);" onClick={this.addClass} >
                                                <FontAwesome name="plus-circle" /> Tambah Kelas
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row margin-top-6">
                                        <div className="cols-sm-12">
                                            <button className="submit-btn" onClick={this.onSubmit}>Lanjut</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )       
    }
}

const mapStateToProps = (state, props) => ({
    exam: state.exam
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getParticipant,
    addClass,
    removeClass
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ParticipantClass);