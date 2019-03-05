import React, { Component } from 'react'
import Header from '../global/header'
import './../../styles/penilaian.css'
import Tab from './new/tab'
import AddClass from './new/add_class'
import AddAttitude from './new/add_attitude'
import Select from 'react-select';
// redux
import {
    getNew,
    handleEvent,
} from './../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { assessmentType, getDate } from './../../utils/common'
import { apiClient } from './../../utils/apiClient'
import {error, modal} from './../global/modal'

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
                // this.props.getNew(this.state.assessment_id, category)
            }
        }
    }

    onCategoryType(event){
        assessmentType.call(this, {category: event.value})
        this.props.handleEvent(event.value, 'category', ['assessment_type'])
    }

    onSubmit(event){
        event.preventDefault(); 
        let data = this.props.assessment
        const assessment_id = this.state.assessment_id
        let url = 'v1/assessments/validate'
        let data_date = ''
        let msg = 'dibuat'

        if(assessment_id){
            url = `v1/assessments/${assessment_id}/validate_update`
            msg = 'diubah'
        }

        if(data.category === 'attitude'){
            switch(data.assessment_type){
                case 'daily':
                    data_date = data.event_date ? data.event_date : new Date()
                    data.event_date = getDate('case-4', new Date(data_date))
                    delete data.assessment_classes_attributes
                    delete data.user_attitudes_attributes
                break;
                case 'final_aspect':
                    delete data.assessment_attitudes_attributes
                    delete data.assessment_subjects_attributes
                    delete data.user_attitudes_attributes
                break;
                case 'final_subject':
                delete data.assessment_attitudes_attributes
                delete data.assessment_subjects_attributes
                break;
                default:
                
            }
        } else {
            delete data.assessment_subjects_attributes
            delete data.assessment_attitudes_attributes
        }

        apiClient('post', url, data, { category: data.category }).then(response => {
            modal({
                message: 'Berhasil',
                // description: 'Anda sudah menyimpan data topik, selanjutnya anda masukkan data komponen topik',
                description: 'Topik berhasil disimpan. Silakan lanjutkan langkah penilaian.',
                btns: [
                    {
                        label: 'Selanjutnya',
                        className: 'btn green',
                    }
                ]
            })
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
            error({
                // message: `Gagal ${msg} Topik, periksa kembali data yang dibutuhkan`,
                message: `Topik gagal ${msg}. Silahkan periksa ulang.`,
                btns: [
                    {
                        label: 'Ulangi',
                        className: "btn bcred cwhite",
                    },
                ]
            })
        })
    }

    render(){
        const {name, category, assessment_type} = this.props.assessment
        let addOnLayout = ''

        switch(assessment_type){
            case 'daily':
                addOnLayout = <AddAttitude />
            break;
            default:
                addOnLayout = <AddClass />
            break
        }

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
                                                    // isClearable
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
                                    {addOnLayout}
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