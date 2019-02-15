import React, { Component } from 'react'
import Header from '../global/header'
import AddSubject from './new/add_subject'
import { NavLink } from 'react-router-dom'
import { error } from './../global/modal'
import { apiClient } from './../../utils/apiClient'
import Tab from './new/tab'

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

    onSubmit(){
        event.preventDefault(); 
        let data = this.props.assessment
        const assessment_id = this.state.assessment_id
        let msg = 'tambah'

        let url = 'v1/assessments/validate?category=' + data.category
        if(assessment_id){
            url = `v1/assessments/${assessment_id}/validate_update`
            msg = 'ubah'
        }

        apiClient('post', url, data).then(response => {
            if(assessment_id){
                apiClient('put', `v1/assessments/${assessment_id}`, data).then(response => {
                    this.props.history.push(`/penilaian`)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                url = 'v1/assessments?category=' + data.category
                apiClient('post', url, data).then(response => {
                    window.location.href = "/penilaian"            
                }).catch(response => {
                    console.log(response)
                })
            }
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
        let urlBack = '/penilaian/tambah'
        if(this.state.assessment_id){
            urlBack = `/penilaian/edit/${this.state.assessment_id}`
        }

        return(
            <div className="padding-content">
                <Header navbar={true} location='/penilaian/tambah' />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{this.state.label}</label>   
                                    <Tab tab={this.state.tab} />
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <AddSubject />
                                        </div>
                                    </div>
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