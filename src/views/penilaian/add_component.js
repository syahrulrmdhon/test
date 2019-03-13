import React, { Component } from 'react'
import Header from '../global/header'
import { NavLink } from 'react-router-dom'
import { error, modal } from './../global/modal'
import { apiClient } from './../../utils/apiClient'
import Tab from './new/tab'

import AddSubject from './new/add_subject'
import AddDailyAttitude from './new/add_daily_attitude'
import AddFinalAttitude from './new/add_final_attitude'

// redux
import {
    getNew,
} from './../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            assessment_id: this.props.match.params.id,
            label: (this.props.match.params.id) ? 'Edit Topik' : 'Tambah Topik',
            tab: '2',
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getNew(this.state.assessment_id)
    }

    onSubmit(event){
        event.preventDefault(); 
        let data = this.props.assessment
        const assessment_id = this.state.assessment_id
        let msg = 'tambah'

        let url = 'v1/assessments/validate?category=' + data.category
        if(assessment_id){
            url = `v1/assessments/${assessment_id}/validate_update`
            msg = 'ubah'
        }

        switch(data.category){
            case 'attitude':
                switch(data.assessment_type){
                    case 'final_aspect':
                        delete data.user_attitudes_attributes
                        delete data.assessment_subjects_attributes
                    break;
                    case 'final_subject':
                        delete data.assessment_attitudes_attributes
                        delete data.user_attitudes_attributes
                    break;
                    case 'daily':
                        delete data.assessment_classes_attributes
                    break;
                }
            break;
            case 'skill':
            case 'knowledge':
                delete data.assessment_attitudes_attributes
                delete data.user_attitudes_attributes
            break;
        }

        apiClient('post', url, data).then(response => {
            if(assessment_id){
                apiClient('put', `v1/assessments/${assessment_id}`, data).then(response => {
                    modal({
                        message: 'Selamat',
                        description: `Anda berhasil ${msg} topik, silakan klik tombol lihat untuk membuat tugas.`,
                        btns: [
                            {
                                label: 'Selesai',
                                className: 'btn green',
                            }
                        ]
                    })
                    this.props.history.push(`/penilaian`)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                url = 'v1/assessments?category=' + data.category
                apiClient('post', url, data).then(response => {
                    modal({
                        message: 'Selamat',
                        // description: 'Anda berhasil menyimpan topik, silakan klik tombol lihat untuk membuat tugas.',
                        description: `Topik selesai ${msg}. Klik tombol 'Lihat' untuk buat Tugas`,
                        btns: [
                            {
                                label: 'Selesai',
                                className: 'btn green',
                            }
                        ]
                    })
                }).catch(response => {
                    console.log(response)
                })
            }
            this.props.history.push(`/penilaian`)
        }).catch(response => {
            error({
                message: `Gagal ${msg} komponen topik, periksa kembali data yang dibutuhkan`,
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
        const { category, assessment_type } = this.props.assessment
        let resultView = ''

        switch(category){
            case 'attitude':
                switch(assessment_type){
                    case 'daily':
                        resultView = <div className="row">
                            <div className="col-sm-12">
                                <AddDailyAttitude />
                            </div>
                        </div>
                    break;
                    case 'final_aspect':
                    case 'final_subject':
                        resultView = <div className="row">
                            <div className="col-sm-12">
                                <AddFinalAttitude />
                            </div>
                        </div>
                    break;
                }
            break;
            case 'skill':
            case 'knowledge':
                resultView = <div className="row">
                    <div className="col-sm-10">
                        <AddSubject />
                    </div>
                </div>
            break;
        }

        let urlBack = '/penilaian/tambah'
        if(this.state.assessment_id){
            urlBack = `/penilaian/edit/${this.state.assessment_id}`
        }

        return(
            <div className="padding-content">
                <Header navbar={true} location='/penilaian/tambah' />
                <div className="container">
                    <div className="margin-content">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{this.state.label}</label>   
                                    <Tab tab={this.state.tab} />
                                    {resultView}
                                    <div className="margin-top-4 padding-top-4">
                                        <NavLink to={urlBack}>
                                            <button className="submit-btn default margin-right-2" >Kembali</button>
                                        </NavLink>
                                        <button className="submit-btn" onClick={this.onSubmit} >Simpan</button>
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
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddComponent)