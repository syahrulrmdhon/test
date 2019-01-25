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
import Avatar from 'react-avatar';
import Logo from './../../assets/images/logo.svg'
import Shutdown from './../../assets/images/shutdown.png'

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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

        return (
            <div className="header-bar">
                <Navbar expand="md" className="font-white">
                    <NavbarBrand>
                        <img className="logo" src={Logo} alt="" />
                        &emsp;
                    <span className="font-white header-title">SMA Negeri Cahaya Madani Banten Boarding School</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="font-white" href="">
                                    <Avatar facebookId="100008343750912" size="30" round={true} />
                                    &ensp;Patience Anderson MD
                                </NavLink>
                            </NavItem>
                            &emsp;
                            <NavItem>
                                <NavLink className="font-white logout" href="/">
                                    <img src={Shutdown} alt="" style={{ width: '20px', height: '20px' }}></img>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
