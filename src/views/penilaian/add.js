import React, { Component } from 'react'
import Header from '../global/header'
import './../../styles/penilaian.css'
import Tab from './new/tab'
import AddClass from './new/add_class'
import Select from 'react-select';
// redux
import {
    getNew,
    handleEvent,
} from './../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { assessmentType } from './../../utils/common'
import { apiClient } from './../../utils/apiClient'
import {error} from './../global/modal'

const category_types = [
    { value: 'knowledge', label: 'Pengetahuan' },
    { value: 'skill', label: 'Keterampilan' },
    { value: 'attitude', label: 'Sikap' },
]

class Add extends Component {
    constructor(props){
        super(props)

        this.state = {
            assessment_id: this.props.match.params.id,
            label: (this.props.match.params.id) ? 'Edit Topik' : 'Tambah Topik',
            tab: '1',
            assessment_types: [],
        }

        this.onCategoryType = this.onCategoryType.bind(this) 
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getNew(this.state.assessment_id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.assessment != this.props.assessment){
            let category = this.props.assessment.category
            if(category !== undefined){
                assessmentType.call(this, {category: category})
            }
        }
    }

    onCategoryType(event){
        assessmentType.call(this, {category: event.value})
        this.props.handleEvent(event.value, 'category')
    }

    onSubmit(){
        event.preventDefault(); 
        let data = this.props.assessment
        const assessment_id = this.state.assessment_id
        let url = 'v1/assessments/validate'
        let msg = 'tambah'

        if(assessment_id){
            url = `v1/assessments/${assessment_id}/validate_update`
            msg = 'ubah'
        }
        
        delete data.assessment_subjects_attributes

        apiClient('post', url, data).then(response => {
            if(assessment_id){
                apiClient('put', `v1/assessments/${assessment_id}`, data).then(response => {
                    this.props.history.push(`/penilaian/edit-component/${assessment_id}`)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.props.history.push('/penilaian/tambah-component')
            }
        }).catch(err => {
            console.log(err)
            error({
                message: `Gagal ${msg} Topik, periksa kembali data yang dibutuhkan`,
                btns: [
                    {
                        label: 'Ulangi',
                        className: "btn bcred cwhite",
                    }
                ]
            })
        })
    }

    render(){
        let name = this.props.assessment !== undefined ? this.props.assessment.name : null
        let category = this.props.assessment !== undefined ? this.props.assessment.category : null
        let assessment_type = this.props.assessment !== undefined ? this.props.assessment.assessment_type : null

        return(
            <div className="padding-content">
                <Header navbar={true} location='/penilaian' />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{this.state.label}</label>                                    
                                    <Tab tab={this.state.tab} />
                                    <div className="margin-top-10">
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <div className="content-input margin-top-10">
                                                <label className="content-label">Judul Topik</label>
                                                <input 
                                                    className="fullwidth" 
                                                    placeholder="Contoh: Topik 1" 
                                                    name="name"
                                                    defaultValue={name}
                                                    onChange={(event) => {this.props.handleEvent(event.target.value, 'name')}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="content-input margin-top-4">
                                                <label className="content-label">Kategori Penilaian</label>
                                                <Select
                                                    isClearable
                                                    className= "select-list"
                                                    classNamePrefix= "select"
                                                    placeholder= "Pilih Kategori Penilaian"
                                                    name= "category"
                                                    options={category_types}
                                                    onChange={this.onCategoryType}
                                                    value={category_types.find((element) => { return element.value == category })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="content-input margin-top-4">
                                                <label className="content-label">Tipe Penilaian</label>
                                                <Select
                                                    isClearable
                                                    className= "select-list"
                                                    classNamePrefix= "select"
                                                    placeholder= "Pilih Tipe Penilaian"
                                                    name= "assessment_type"
                                                    options={this.state.assessment_types}
                                                    onChange={(event) => {this.props.handleEvent(event.value, 'assessment_type')}}
                                                    value={this.state.assessment_types.find((element) => {  return element.value == assessment_type})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top margin-top-6"></div>
                                    <AddClass />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="margin-top-6">
                                                <button className="submit-btn" onClick={this.onSubmit}>Lanjut</button>
                                            </div>
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
    assessment: state.assessment
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getNew,
    handleEvent,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Add)