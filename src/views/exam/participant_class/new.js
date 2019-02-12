import React, { Component } from 'react'
import Header from '../../global/header'
var FontAwesome = require('react-fontawesome')
import Classes from './classes'
import {getDataExamClass} from './../../../utils/exam_class'
import { getDate } from './../../../utils/common'
import { apiClient } from './../../../utils/apiClient'

export default class ParticipantClass extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 'ClassForm',
            assessment_id: '9bbb04e2-5195-4d83-a7d7-9d842c44a808',
            exam_id: '90744b5a-85ad-46e9-ac9b-422c96de0016',
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
            }
        }

        this.addClass = this.addClass.bind(this)
        this.removeClass = this.removeClass.bind(this)
        this.handleClassAttr = this.handleClassAttr.bind(this)
        this.handleTimeAttr = this.handleTimeAttr.bind(this)        
        this.handleBasicCompAttr = this.handleBasicCompAttr.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    

    componentDidMount(){
        getDataExamClass.call(this, this.state.step, this.state.assessment_id, this.state.exam_id)
    }

    onSubmit(){
        event.preventDefault();
        let data = []

        if(this.state.exam.exam_classes_attributes.length > 0) {
            this.state.exam.exam_classes_attributes.map((exam_classes_attribute) => {
                let comp_kkms = []

                if(exam_classes_attribute.comp_kkms.length > 0){
                    exam_classes_attribute.comp_kkms.map((com_kkm) => {
                        com_kkm.class_id = com_kkm.class_id.value

                        comp_kkms.push(com_kkm)
                    })
                }
                data.push({
                    class_id: exam_classes_attribute.class_id ? exam_classes_attribute.class_id.value : null,
                    start_date: getDate('case-5', exam_classes_attribute.start_date),
                    deadline_date: getDate('case-5', exam_classes_attribute.deadline_date),
                    comp_kkms: comp_kkms,
                })
            })
        }

        if(data){
            let result = this.state.exam
            result.exam_classes_attributes = data

            let url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/validate?step=ClassForm`

            apiClient('post', url, {exam: result}).then(response => {
                this.props.history.push('/pariticipant-user')
            }).catch(error => {
                console.log(error.response)
            })   
        }        
    }

    handleClassAttr(event, c_index){
        let class_attributes = this.state.exam.exam_classes_attributes
        class_attributes[c_index]['class_id'] = event

        this.setState({
            exam: {
                exam_classes_attributes: class_attributes
            }
        })
    }

    handleTimeAttr(newDate, fieldName, c_index){
        let obj = this.state.exam.exam_classes_attributes
        obj[c_index][fieldName] = newDate

        this.setState(obj);
    }

    handleBasicCompAttr(event, basic_comp_id, c_index, key){
        let class_attributes = this.state.exam.exam_classes_attributes
        let basic_comps = class_attributes[c_index]['comp_kkms'] || []

        basic_comps[key] = {
            basic_comp_id: basic_comp_id,
            class_id: class_attributes[c_index]['class_id'],
            kkm: event.target.value,
        }

        class_attributes[c_index]['comp_kkms'] = basic_comps
        console.log(class_attributes)

        this.setState({
            exam: {
                exam_classes_attributes: class_attributes
            }
        })
    }   

    addClass(){
        let exam_classes_attribute = this.state.exam.exam_classes_attributes[0]
        this.setState({
            exam: {
                exam_classes_attributes: this.state.exam.exam_classes_attributes.concat(exam_classes_attribute)
            }
        })
    }

    removeClass(index){
        if(this.state.exam.exam_classes_attributes.indexOf(index) > -1){
            this.state.exam.exam_classes_attributes.splice(index, 1);
        }
        this.setState({
            exam: {
                exam_classes_attributes: this.state.exam.exam_classes_attributes.slice(0, index).concat(this.state.exam.exam_classes_attributes.slice((index+1), this.state.exam.exam_classes_attributes.length)) 
            }
        })
    }

    render(){
        let class_view = []
        if(this.state.exam.exam_classes_attributes.length > 0){
            this.state.exam.exam_classes_attributes.map((data, idx) => {
                class_view.push(<Classes 
                    index={idx} 
                    key={Math.random()}  
                    data={data}
                    class_filters={this.state.class_filters}
                    removeClass={this.removeClass}
                    basic_comps={this.state.basic_comps}
                    handleClassAttr={this.handleClassAttr}
                    handleTimeAttr={this.handleTimeAttr}
                    handleBasicCompAttr={this.handleBasicCompAttr}
                />)
            })
        }

        return(
            <div className="padding-content">
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