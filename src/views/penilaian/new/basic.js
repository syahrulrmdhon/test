import React, { Component } from 'react'
import Select from 'react-select';
import Classses from './basic/classses'
import { assessmentType, setLabelSelect, setErrorRuby } from './../../../utils/common'
import { apiClient } from '../../../utils/apiClient'
import Error from '../../global/error'

import ErrorModal from './../../global/error_modal'
var FontAwesome = require('react-fontawesome')

const category_types = [
    { value: 'knowledge', label: 'Pengetahuan' },
    { value: 'skill', label: 'Keterampilan' },
    { value: 'attitude', label: 'Sikap' },
]

export default class Basic extends Component {
    constructor(props){
        super(props)

        this.state = {
            class_list: [{}],
            assessment_types: [],
            // data
            name: "",
            category: "",
            assessment_type: "",
            school_id: localStorage.getItem("school_id") || "",
            assessment_classes_attributes: [],
            errors: {},
            isError: false
        }

        this.addClass = this.addClass.bind(this)
        this.removeClass = this.removeClass.bind(this)
        this.categoryType = this.categoryType.bind(this)
        this.handleAttribute = this.handleAttribute.bind(this)
        this.handleClassAttribute = this.handleClassAttribute.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        apiClient('get', "v1/assessments/new").then(response => {
            const assessment = response.data.data.assessment
            const category = (assessment) ? assessment.category : null 
            const assessment_classes_attributes = []  

            if(assessment !== undefined){
                if(Object.entries(assessment).length > 0){
                    if(assessment.assessment_classes_attributes.length > 0){
                        assessment.assessment_classes_attributes.map((assessment_classes_attribute, idx) => {
                            assessment_classes_attributes.push({
                                value: assessment_classes_attribute.class_id,
                            })
                        })
                    }
                    
                    if(category != null){
                        this.categoryType({ value: category }, assessment)                
                    }
    
                    this.state.class_list = assessment.assessment_classes_attributes
                    this.state.name = assessment.name
                    this.state.assessment_classes_attributes = assessment_classes_attributes
                }
            }
        })
    }

    onSubmit(event){
        event.preventDefault(); 
        let class_attributes = []
        if(this.state.assessment_classes_attributes.length > 0){
            this.state.assessment_classes_attributes.map((class_attribute, idx)=>{
                class_attributes.push({
                    class_id: class_attribute.value,
                    kkm: 50,
                })
            })
        } else {
            class_attributes.push({
                class_id: null,
            })
        }

        let data = {
            assessment: {
                category: this.state.category.value || '',
                assessment_type: this.state.assessment_type.value  || '',
                name: this.state.name  || '',
                school_id: this.state.school_id,
                assessment_classes_attributes: class_attributes
            }
        }

        let url = 'v1/assessments/validate'

        apiClient('post', url, data).then(response => {
            this.props.callBack('basic')
        }).catch(error => {
            this.setState({
                isError: true,
                errors: setErrorRuby(error.response.data, [
                    'category',
                    'assessment_type',
                    'name',
                    'assessment_class',
                ])

            })
        })
    }

    removeClass(index, value){
        if(this.state.assessment_classes_attributes.indexOf(value) > -1){
            this.state.assessment_classes_attributes.splice(index, 1);
        }
        this.setState({
            class_list: this.state.class_list.slice(0, index).concat(this.state.class_list.slice((index+1), this.state.class_list.length)) 
        })
    }

    addClass(){
        const class_list = this.state.class_list[0]
        this.setState({
            class_list: this.state.class_list.concat(class_list)
        })        
    }

    categoryType(event, assessment){
        assessmentType.call(this, {category: event.value}, {value: assessment.assessment_type}, 'assessment_type')
        this.setState({
            category: setLabelSelect(category_types, event),
        })
    }

    handleAttribute(e, prop){
        let change = {}

        if (typeof e.label != 'undefined' ){
            change[prop.name] = e
        } else {
            change[e.target.name] = e.target.value
        }
        this.setState(change)
    }

    handleClassAttribute(event, props){
        let class_attribute = this.state.assessment_classes_attributes.slice()

        if(event.value){
            class_attribute[props.name] = event
            this.setState({
                assessment_classes_attributes: class_attribute
            })
        }
    }

    render(){
        let error = []
        let class_view = []
        if(this.state.class_list.length > 0){
            this.state.class_list.map((x, idx) => {
                class_view.push(<Classses 
                    index={idx} 
                    key={Math.random()} 
                    removeClass={this.removeClass} 
                    handleClassAttribute={this.handleClassAttribute}
                    value={this.state.assessment_classes_attributes[idx]} 
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
            <div>
                {error}
                <div className="row">
                    <div className="col-sm-10">
                        <div className="content-input margin-top-10">
                            <label className="content-label">Judul Topik</label>
                            <input className="fullwidth" placeholder="Contoh: Topik 1" name="name" value={this.state.name} onChange={this.handleAttribute} />
                            <Error data={this.state.errors} fieldname= 'name' />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="content-input margin-top-4">
                            <label className="content-label">Kategori Penilaian</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Kategori Penilaian"
                                name= "category"
                                options= {category_types}
                                onChange={this.categoryType}
                                value={this.state.category}
                            />
                            <Error data={this.state.errors} fieldname= 'category' />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="content-input margin-top-4">
                            <label className="content-label">Tipe Penilaian</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Tipe Penilaian"
                                name= "assessment_type"
                                options= {this.state.assessment_types}
                                onChange= {this.handleAttribute}
                                value= {this.state.assessment_type}
                            />
                            <Error data={this.state.errors} fieldname= 'category' />
                        </div>
                    </div>
                </div>
                <div className="border-top margin-top-6"></div>
                {class_view}
                <div className="row">
                    <div className="col-sm-6">
                        <div className="float-right margin-top-2">
                            <a href="javascript:void(0);" onClick={this.addClass} >
                                <FontAwesome name="plus-circle" /> Tambah Kelas
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="margin-top-6">
                            <button className="submit-btn" onClick={this.onSubmit}>Lanjut</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}