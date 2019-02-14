import React, { Component } from 'react'
import Subject from './component/subject'
import { subjects, basicComps, setErrorRuby } from './../../../utils/common'
import { connect } from 'react-redux'
import { apiClient } from '../../../utils/apiClient';
var FontAwesome = require('react-fontawesome')

class Componentt extends Component {
    constructor(props){
        super(props)

        const school = JSON.parse(localStorage.getItem("school"))

        this.state = {
            class_ids: [],
            school_level: school.level,
            subject_list: [{}],
            assessment_subjects_attributes: [],
            subjects: [],
        }
        this.addSubject = this.addSubject.bind(this)
        this.removeSubject = this.removeSubject.bind(this)
        this.getSubjectList = this.getSubjectList.bind(this)
        this.handleSubject = this.handleSubject.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.setSubject = this.setSubject.bind(this)
        this.setKD = this.setKD.bind(this)
    }

    componentDidMount(){
        let assessment = this.props.assessment
        let class_ids = []
        console.log(assessment)
        if(assessment !== undefined){
            if(Object.entries(assessment).length > 0){
                assessment.assessment_classes_attributes.map((classes_attribute, idx) => {
                    class_ids.push(classes_attribute.class_id)
                })
                this.state.class_ids = class_ids
                this.getSubjectList()
            }
        }
    }

    onSubmit(event){
        event.preventDefault();
        let result = []
        let data = this.props.assessment
        // before save
        if(this.state.assessment_subjects_attributes.length > 0){
            this.state.assessment_subjects_attributes.map((assessment_subject, idx) => {
                let school_subject_id = assessment_subject.school_subject_id
                let comps = []
                if(assessment_subject.assessment_basic_comps_attributes.length > 0){
                    assessment_subject.assessment_basic_comps_attributes.map((assessment_basic_comp, key) => {
                        comps.push({
                            basic_comp_id: assessment_basic_comp.value,
                        })
                    })
                }
                result.push({
                    school_subject_id: school_subject_id.value,
                    assessment_basic_comps_attributes: comps
                })
            })
        }
        
        if(data){
            data.assessment_subjects_attributes = result
        }

        let url = 'v1/assessments?category=' + data.category

        apiClient('post', url, data).then(response => {
            window.location.href = "/penilaian"
        }).catch(error => {
            console.log(error)
            this.setState({
                errors: setErrorRuby(error.response.data, [
                    'category',
                    'assessment_type',
                    'name',
                    'assessment_class',
                ])
            })
        })
    }

    setSubject(event, props){
        const category = this.props.assessment.category || null

        if(category && event.value){
            basicComps.call(this, {
                category: category,
                school_subject_id: event.value,
            }, {
                listOptions: true,
                fieldName: "basic_comps_" + props.name
            })
        }
        this.state.assessment_subjects_attributes[props.name] = {
            school_subject_id: event,
            assessment_basic_comps_attributes: []
        }
    }

    setKD(event, index, kd_index){
        if(typeof(this.state.assessment_subjects_attributes[index]['assessment_basic_comps_attributes']) == 'object'){
            let basic_comps_attribute = this.state.assessment_subjects_attributes[index]['assessment_basic_comps_attributes'].slice()
            
            if(event.value){
                basic_comps_attribute[kd_index] = event

                this.state.assessment_subjects_attributes[index]['assessment_basic_comps_attributes'] = basic_comps_attribute
                this.setState({})
            }
        }
    }

    getSubjectList(){
        let params = {}

        if(this.state.class_ids.length > 0){
            params['class_id'] = this.state.class_ids
        }

        subjects.call(this, params, {listOptions: true})
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

    handleSubject(event, props){ 
        let subject_attribute = this.state.assessment_subjects_attributes.slice()

        if(event.value){
            subject_attribute[props.name] = event
            this.setState({
                assessment_subjects_attributes: subject_attribute
            })
        }
    }

    render(){
        let subject_list = []
        if(this.state.subject_list.length > 0){
            this.state.subject_list.map((x, idx) => {
                let parameter = "basic_comps_" + idx

                subject_list.push(<Subject 
                    key={Math.random()} 
                    index={idx} 
                    removeSubject= {this.removeSubject}
                    assessment_subject={this.state.assessment_subjects_attributes[idx]}
                    subjects={this.state.subjects}
                    handleSubject={(value) => {this.handleSubject()}}
                    assessment={this.props.assessment}
                    setSubject={this.setSubject}
                    setKD={this.setKD}
                    addKD={this.addKD}
                    basic_comps= {this.state[parameter]}
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
                        <button className="submit-btn" onClick={this.onSubmit} >Simpan</button>
                    </div>
                </div>
            </div>
        )
    }
}
// const mapStateToProps = (state = false) => {
//     return {
//         componentt: state.assessment.component || [{}],
//     }
// }

export default Componentt
// export default connect(mapStateToProps)(Componentt)