import React, { Component } from 'react'
import './../../styles/global/component.css'
import Logo from './../../assets/images/logo.svg'
import LogoFull from './../../assets/images/ic-logo-gredu.svg'
var FontAwesome = require('react-fontawesome');
import classnames from 'classnames'
import { getUser } from '../../utils/common'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class SwitchAccount extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            school_list: !!(localStorage.getItem("school_list")) ? JSON.parse(localStorage.getItem("school_list")) : []
        }
        this.submit = this.submit.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        const school_list = localStorage.getItem('school_list')

        if(token != null){
            if(school_list == null){
                this.props.history.push('/home')    
            }
        } else {
            this.props.history.push('/')
        }
    }

    // changeAccount(school, e){
    //     console.log(school);
    // }
    onConfirm(school_id){
        localStorage.setItem("school_id", school_id)
        getUser(true)
        // this.props.history.push('/home')
    }

    logout(){
        localStorage.clear()
        this.props.history.push('/')
    }

    submit(school, e){
        const school_name = !!(school) ? school.name : 'N/A'

        confirmAlert({
            customUI: ({ onClose, onConfirm }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Apakah anda yakin ingin beralih ke sekolah {school_name}? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={onClose}>Tidak</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => { this.onConfirm(school.id); onClose(); }}>Ya</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    render(){
        let count = this.state.school_list.length || 0
        
        let schools = []
        if(this.state.school_list.length > 0){
            this.state.school_list.map((school, idx) => {
                let margin = (idx > 0) ? 'margin-top-4' : ''
                let last = ((idx+1) == count) ? 'last' : ''
                const doc_aws_url = !!(school.asset) ? school.asset.doc_aws_url : ' '
                const address = !!(school.full_address) ? school.full_address.region + ', ' + school.full_address.city : 'N/A'

                schools.push(
                    <a className="fullwidth" href="javascript:void(0);" key={school.id} onClick={this.submit.bind(this, school)}>
                        <div className={classnames("item align-left", margin, last)}>
                            <div className="row">
                                <div className="col-sm-2">
                                    <img className="logo-account" src={doc_aws_url} alt={school.name} />
                                </div>
                                <div className="col-sm-10">
                                    <div className="trigger-account"><FontAwesome className="f-icon" name='arrow-right'  /></div>
                                    <span className="name-school disblock">{school.name}</span>
                                    <div className="address">{address}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })
        }

        return(
            <div className="switch">
                <div className="header padding-2">
                    <img className="logo margin-left-4" src={Logo} alt="" />
                </div>
                <div className="body-gredu">
                    <div className="align-center">
                        <img src={LogoFull} />
                    </div>
                    <div className="title margin-top-6 align-center">
                        Kamu telah terdaftar didalam {count} sekolah. Silahkan pilih sekolah
                    </div>
                    <div className="title align-center">
                        yang akan kamu akses
                    </div>
                    <div className="margin-top-6">
                        <div className="row">
                            <div className="col-sm-offset-4 col-sm-4">
                                <div className="account-list fullwidth padding-4">
                                    {schools}
                                </div>
                                <div className="margin-top-2 float-right margin-right-2">
                                    <a href="javascript:void(0);" onClick={this.logout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}