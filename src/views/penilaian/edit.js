import React, { Component } from 'react'
import Header from '../global/header'
import classnames from 'classnames'
import Select from 'react-select';
import { assessmentType, changeFormatOptions } from './../../utils/common'

import {getAssessment} from './../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Error from '../global/error'

var FontAwesome = require('react-fontawesome')

const menu_arr = [
    {
        key: '1',
        label: 'Informasi Dasar',
    },
    {
        key: '2',
        label: 'Komponen',
    },
]

const category_types = [
    { value: 'knowledge', label: 'Pengetahuan' },
    { value: 'skill', label: 'Keterampilan' },
    { value: 'attitude', label: 'Sikap' },
]

class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabMenu: '1',
            assessment_id: this.props.match.params.id,
            assessment_types: [],
        }
    }

    componentDidMount(){
        this.props.getAssessment(this.state.assessment_id)
    }

    render(){
        let menu_view = []
        menu_arr.map((menu, idx) => {
            let class_label = 'cgray2'
            let class_bullet = 'bcgray-blur'

            let active_menu = (this.state.tabMenu == menu.key) ? true : false
            if(active_menu){
                class_label = ""
                class_bullet = "bcgreen box-shadow"
            }
            
            menu_view.push(
                <div id={menu.key} className="disinblock" key={Math.random()}>
                    <div className="align-center">
                        <i className={classnames("bullet", class_bullet)}></i>
                    </div>
                    <label className={classnames("disblock margin-top-2", class_label)}>{menu.label}</label>
                </div>
            )
        })

        const assessment = this.props.assessment;
        const name = assessment ? assessment.name : ''
        const category = assessment ? assessment.category : ''
        const assessment_type = assessment ? assessment.assessment_type : ''
        const assessment_types = this.props.assessment ? changeFormatOptions(this.props.assessment.assessment_types) : []
        
        return(
            <div className="padding-content">
                <Header location="assessment" />
                <div className="container">
                    <div className="margin-content">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">Edit Topik</label>
                                    <div className="float-right">
                                        <div className="tab-assessment">
                                            <div className="line-separator"></div>
                                            {menu_view}
                                        </div>
                                    </div>
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
                                                    // onChange={this.handleAttribute}
                                                />
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
                                                    value={category_types.find((element) => {return element.value == category})}
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
                                                    options= {assessment_types}
                                                    onChange= {this.handleAttribute}
                                                    value= {assessment_types.find((element) => { return element.value == assessment_type })}
                                                />
                                                <Error data={this.state.errors} fieldname= 'category' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top margin-top-6"></div>
                                    {/* {class_view} */}
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
    ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getAssessment,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Edit);