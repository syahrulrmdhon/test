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
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout(){
        localStorage.clear()
        window.location.href = "/";
    }

    onConfirm(school_id){
        localStorage.setItem("school_id", school_id)
        getUser(true)
    }

    onChangeSchool(school){
        const school_name = !!(school) ? school.name : 'N/A'

        confirmAlert({
            customUI: ({ onClose }) => {
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

    render() {

        const l_school = !!(localStorage.getItem('school')) ? localStorage.getItem('school') : ''
        let school = null
        if(l_school){
            school = JSON.parse(l_school);
        }

        const l_user = !!(localStorage.getItem('user')) ? localStorage.getItem('user') : ''
        let user = null
        if(l_user){
            user = JSON.parse(l_user);
        }

        // custom
        let school_name = !!(school) ? school.name : ''
        let school_logo = !!(school) ? school.asset.doc_aws_url : Logo

        let user_name = !!(user) ? user.full_name : ''
        // let user_logo = !!(user) ? user.asset.doc_aws_url : ' '
        let school_account = []
        if(this.state.schoolList.length > 1){
            const school_id = localStorage.getItem("school_id")
            school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()}><FontAwesome name="graduation-cap" /> <span className="profile">Pilih Sekolah</span><FontAwesome className="float-right" name="caret-down" /></MenuItem>)
            school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()} divider ></MenuItem>)
            
            this.state.schoolList.map((school, idx) => {
                let actived = (school_id == school.id) ? 'active' : 'in_active'
                let icon = (school_id == school.id) ? 'check' : 'times'

                school_account.push(<MenuItem key={Math.random()} eventKey={Math.random()} className={actived} onClick={() => {this.onChangeSchool(school)}} value={school.id} ><FontAwesome className="check-school" name= {icon} /> {seeMore(school.name, 20)} </MenuItem>)
            })
        }
        const { navbar, location } = this.props
        let navbarOpt = navbar === undefined?true:false
        let path = location === undefined ? '/murid' : location
        let text = ''
        if(this.state.schoolList.length > 1){
            text = <NavItem>
                <ButtonToolbar>
                    <DropdownButton
                        // disabled={true}
                        bsStyle='info'
                        title={user_name}
                        id='dropdown-profile'
                    >
                        {/* <MenuItem eventKey="1"><FontAwesome name="user" /> 
                        <span className="profile">Profil</span>
                        </MenuItem> */}
                        {school_account}
                    </DropdownButton>
                </ButtonToolbar>
            </NavItem>
        } else {
            text = <button id="dropdown-profile" class="btn btn-info">{user_name}<span class="caret"></span></button>
        }

        return (
            <div className="fix-nav">
                <div className="header-bar">
                    <div className="fix-nav">
                        <Navbar expand="md" className="font-white">
                            <NavbarBrand>
                                <img className="logo" src={Logo} alt="" />
                                    <span className="font-white header-title margin-left-4">{school_name}</span>
                                    </NavbarBrand>
                                    <NavbarToggler onClick={this.toggle} />
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav className="ml-auto" navbar>
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
                <Menu  navbar={navbarOpt} location={path} />
            </div>
        )
    }
}
