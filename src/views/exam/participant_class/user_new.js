import React, { Component } from 'react'
import Header from '../../global/header'
import { Nav, NavItem, NavLink } from 'reactstrap'
import ChooseUser from './choose_user'
import { getParticipant } from './../../../redux-modules/modules/exam'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiClient } from './../../../utils/apiClient'

import Page from './../../../components/Title'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ParticipantUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 'ParticipantForm',
            assessment_id: this.props.match.params.assessment_id || null,
            exam_id: this.props.match.params.exam_id || null,
            classes: [],
            activeTab: null,
            exam: [],
        }
        this.onToggle = this.onToggle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
    }

    componentDidMount(){
        this.props.getParticipant(this.state.step, this.state.assessment_id, this.state.exam_id);
    }

    onToggle(id){
        this.setState({
            activeTab: id,
        })
    }

    onConfirm(){
        event.preventDefault();
        let participant_users = []
        if(this.props.exam.data.classes){
            this.props.exam.data.classes.map((classs) => {
                if(classs.users){
                    classs.users.map((user) => {
                        if(user.is_selected){
                            participant_users.push({
                                class_id: classs.id,
                                user_id: user.id,
                            })
                        }
                    })
                }
            })
        }
        if(participant_users.length > 0){
            let url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/validate?step=ParticipantForm`
            this.props.exam.data.exam.exam_participants_attributes = participant_users
       
            apiClient('post', url, this.props.exam.data).then(res => {
                let url_create = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes`
                apiClient('post', url_create, this.props.exam.data).then(response => {
                    window.location.href = `/exam/${this.state.assessment_id}`;
                }).catch(error => {
                    alert('error')
                })
            }).catch(error => {
            })  
        } else {
            alert('Pilih Siswa minimal 1')
        }
    }

    onSubmit(event){
        event.preventDefault();

        confirmAlert({
            customUI: ({ onClose, onConfirm }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Pastikan anda sudah pilih partisipan siswa yang sesuai ? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={onClose}>Periksa ulang</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => {this.onConfirm(); onClose();}}>Yakin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    render(){
        let tab = []
        let contentUser = []

        const classes = this.props.exam && this.props.exam.data && this.props.exam.data.classes;

        if(classes){
            classes.map((classs, idx) => {
                let active = null

                if((this.state.activeTab == null && idx == 0) || (this.state.activeTab == classs.id)){
                    active = 'active'
                }

                tab.push(
                    <NavItem key={Math.random()}>
                        <NavLink
                        className={active}
                        onClick={() => {this.onToggle(classs.id)}}
                        >
                        {classs.name}
                        </NavLink>
                    </NavItem>
                )

                if(active == 'active'){
                    contentUser.push(
                        <ChooseUser 
                            key={Math.random()} 
                            index={idx}
                            isActived={active}
                        />
                    )
                }
            })
        }

        return (
            <Page title="Partisipan siswa">
                <div className="padding-content">
                <Header 
                        navbar={true}
                        location={`/pariticipant-class/${this.state.assessment_id}/assessment/${this.state.exam_id}/exam`}
                />
                <div className="container">
                        <div className="margin-content">
                            <div className="content-block main-block">
                                <div className="margin-side-10 padding-10">
                                    <form>
                                        <label className="header-title form disblock">Pilih Peserta Didik</label>
                                        <div className="margin-top-10">
                                            <div className="margin-top-4">
                                                <Nav tabs className="toggle tab-class">
                                                    {tab}
                                                </Nav>
                                            </div>
                                        </div>
                                        <div className="margin-vert-4">
                                            Nama Peserta Didik
                                        </div>
                                        {contentUser}
                                        <button className="submit-btn margin-top-8" onClick={this.onSubmit}>Simpan</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
const mapStateToProps = (state, props) => ({
    exam: state.exam
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ParticipantUser);
  