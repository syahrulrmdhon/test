import React, { Component } from 'react'
import '../../styles/global/component.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import Logo from './../../assets/images/logo.svg'
import Shutdown from './../../assets/images/shutdown.png'
import Menu from './navbar'
import { seeMore, getUser } from '../../utils/common'
import { DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { modal, confirm } from './../global/modal'
import { apiClient } from '../../utils/apiClient'

import Avatar from 'react-avatar'
import Ava from './../../assets/images/avatar_def.svg'
import Ava_m from './../../assets/images/m_avatar.svg'
import Ava_f from './../../assets/images/f_avatar.svg'

var FontAwesome = require('react-fontawesome');

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            navbar: props.navbar || true,
            schoolList: !!(localStorage.getItem("school_list")) ? JSON.parse(localStorage.getItem("school_list")) : []

        };
        this.logout = this.logout.bind(this)
        this.onChangeSchool = this.onChangeSchool.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.profile = this.profile.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout() {


        apiClient('delete', '/authentication/destroy_token').then(response => {
            confirm({
                message: 'Anda yakin ingin keluar?',
                func: function () {
                    localStorage.removeItem('current_period');
                    localStorage.removeItem('homeroom_class');
                    localStorage.removeItem('school');
                    localStorage.removeItem('school_id');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('class_id');
                    localStorage.removeItem('react-avatar/failing');
                    // localStorage.removeItem('Device-ID');


                    localStorage.removeItem('current_period');
                    localStorage.removeItem('homeroom_class');
                    localStorage.removeItem('school');
                    localStorage.removeItem('school_id');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('class_id');
                    localStorage.removeItem('react-avatar/failing');
                    localStorage.removeItem('school_list')
                    window.location.href = "/";

                }
            })

        })
            .catch(err => {
                // let description = data.error.user_authentication.join(', ')
                // // this.setSchoolList()

            })
    }

    profile() {
        // this.props.history.push(")
        window.location.href = "/profile/basic-information";

    }

    onConfirm(school_id) {
        localStorage.setItem("school_id", school_id)
        getUser(true)
    }

    onChangeSchool(school) {
        const school_name = !!(school) ? school.name : 'N/A'

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Apakah akan beralih ke {school_name}? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={this.props.history.goBack()}>Kembali</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => { this.onConfirm(school.id); onClose(); }}>Lanjut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    render() {
        const l_school = !!(localStorage.getItem('school')) ? localStorage.getItem('school') : ''
        let school = null
        if (l_school) {
            school = JSON.parse(l_school);
        }

        const l_user = !!(localStorage.getItem('user')) ? localStorage.getItem('user') : ''
        let user = null
        if (l_user) {
            user = JSON.parse(l_user);
        }

        // custom
        let school_name = !!(school) ? school.name : ''
        let school_logo = !!(school) ? school.asset.doc_aws_url : Logo

        let user_name = !!(user) ? user.full_name : ''
        let gender = !!(user) ? user.gender : ''
        let user_logo = !!(user) ? user.asset.doc_aws_url : ''
        let school_account = []
        if (this.state.schoolList.length > 1) {
            const school_id = localStorage.getItem("school_id")
            school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()}><FontAwesome name="graduation-cap" /> <span className="profile">Pilih Sekolah</span><FontAwesome className="float-right" name="caret-down" /> <hr style={{ marginTop: '10px', marginBottom: '0px' }}></hr></MenuItem>)
            school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()} divider ></MenuItem>)
            // <div></div>
            this.state.schoolList.map((school, idx) => {
                let actived = (school_id == school.id) ? 'active' : 'in_active'
                let icon = (school_id == school.id) ? 'check' : ''

                school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()} className={actived} onClick={() => { this.onChangeSchool(school) }} value={school.id} ><FontAwesome className="check-school" name={icon} /> {seeMore(school.name, 20)} </MenuItem>)
            })
        }
        const { navbar, location, label, params } = this.props
        let navbarOpt = navbar === undefined ? true : false
        let path = location === undefined ? '/' : location
        let labelPath = label === undefined?'Kembali':label
        let paramsData = params === undefined?'':params 
        let text = ''

        if (this.state.schoolList.length == 1) {
            text = <button id="dropdown-profile"  onClick={this.profile}  className="btn btn-info">{user_name}<span className="caret"></span></button>
        } else {
            text = <button id="dropdown-profile"  onClick={this.profile}  className="btn btn-info">{user_name}<span className="caret"></span></button>
            text = <NavItem>
                <ButtonToolbar>
                    <DropdownButton
                        bsStyle='info'
                        title={user_name}
                        id='dropdown-profile'
                    >
                        <MenuItem onClick={this.profile} eventKey="1"><FontAwesome name="user" />
                            <span className="profile padding-left-1">Profil</span>
                        </MenuItem>
                        {school_account}
                    </DropdownButton>
                </ButtonToolbar>
            </NavItem>
        }

        // console.log(this.props.label,"label")
        let data_photo = user_logo ? user_logo : Ava

        if  (user_logo==null && gender=='M'){
            data_photo = Ava_m
        }else if (user_logo==null && gender=='F'){
            data_photo = Ava_f
        }


        return (
            <div className="fix-nav">
                <div className="header-bar">
                    <div className="fix-nav">
                        <Navbar expand="md" className="font-white">
                            <NavbarBrand>
                                <img className="logo" src={school_logo} alt="" />
                                <span className="font-white header-title margin-left-4">{school_name}</span>
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className='padding-right-2'>
                                        <img src={data_photo} height="40" width="40" className="profile-photo" alt="/" />
                                    </NavItem>
                                    {text}
                                    <NavItem>
                                        <NavLink className="font-white logout margin-left-2" href="javascript:void(0);" onClick={this.logout}>
                                            <img src={Shutdown} alt="" style={{ width: '20px', height: '20px' }}></img>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
                <Menu navbar={navbarOpt} location={path} data={this.props.params} label={labelPath} data={paramsData} />
            </div>
        )
    }
}
