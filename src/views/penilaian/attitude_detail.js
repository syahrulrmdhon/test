import React, { Component } from 'react'
import Header from '../global/header'
import AttitudeDetailItem from './detail/attitude_detail_item'
import { 
    apiClient 
} from './../../utils/apiClient'
import {
    getDate
} from './../../utils/common'
import {
    modal
} from './../global/modal'

import {
    showAssessment,
} from './../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AttitudeDetail extends Component {
    constructor(props){
        super(props)

        this.state = {
            assessment_id: this.props.match.params.id,
            category: this.props.match.params.category,
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.showAssessment(this.state.assessment_id, this.state.category)
    }

    onSubmit(event){
        event.preventDefault();
        let entries = this.props.assessment.entries
        let data = []

        if(entries.length > 0){
            entries.map((element, idx) => {
                data[idx] = {
                    user_id: element.user_id,
                    class_id: element.class_id,
                    score: element.score,
                    description: element.description,
                }
            })
        }

        let url = `v1/assessments/${this.state.assessment_id}/user_attitudes`
        apiClient('post', url, {user_attitudes: data}).then(response => {
            modal({
                message: 'Berhasil',
                description: 'Berhasil merubah skor sikap',
                btns: [
                    {
                        label: 'Berhasil',
                        className: 'btn green',
                    }
                ]
            })
            this.props.history.push({
                pathname: '/penilaian',
                state: {
                    category: 'attitude',
                }
            })

        }).catch(err => {
            console.log(err.response)
            modal({
                message: 'Gagal',
                description: 'Gagal merubah skor sikap, periksa kembali data yang dibutuhkan',
            })
        })
    }

    render(){
        let { name, event_date } = this.props.assessment
        event_date = getDate('case-1', new Date(event_date))

        let users = []
        if(this.props.assessment.entries){
            this.props.assessment.entries.map((user_attitude, idx) => {
                users.push(
                    <AttitudeDetailItem
                        key={idx}
                        index={idx}
                    />
                )
            })
        }

        return(
            <div className="padding-content">
                <Header navbar={true} location="/penilaian" />
                <div className="margin-content">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-side-6 padding-vert-10">
                                <label className="header-title disblock margin-bottom-1">Rincian Perolehan Nilai Sikap Harian</label>
                                <label className="disblock margin-bottom-1" >{name}</label>
                                <label className="disblock cgray2">{event_date}</label>
                                <div className="row margin-top-10">
                                    <div className="col-sm-3">
                                        <label className="header-title f12 align-center disblock padding-2">
                                            Nama Murid
                                        </label>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="header-title f12 align-center disblock padding-2">
                                           Nilai Sikap
                                        </label>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="header-title f12 disblock padding-2">
                                           Deskripsi
                                        </label>
                                    </div>
                                </div>
                                {users}
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="margin-top-6 float-right">
                                            <button className="submit-btn" onClick={this.onSubmit}>Simpan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    assessment: state.assessment,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    showAssessment,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AttitudeDetail)