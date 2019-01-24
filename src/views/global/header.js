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
import Menu from './navbar'

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
        this.logout = this.logout.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout(){
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        const school = JSON.parse(localStorage.getItem('school'));
        const user = JSON.parse(localStorage.getItem('user'));

        // custom
        let school_name = !!(school) ? school.name : ''
        let school_logo = !!(school) ? school.asset.doc_aws_url : Logo

        let user_name = !!(user) ? user.full_name : ''
        // let user_logo = !!(user) ? user.asset.doc_aws_url : ' '

        return (
            <div className="fix-nav">
                <div className="header-bar">
                    <div className="fix-nav">
                        <Navbar expand="md" className="font-white">
                            <NavbarBrand>
                                <img className="logo" src={school_logo} alt="" />
                                &emsp;
                                    <span className="font-white header-title">{school_name}</span>
                                    </NavbarBrand>
                                    <NavbarToggler onClick={this.toggle} />
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink className="font-white" href="">
                                                    <Avatar facebookId="100008343750912" size="30" round={true} />
                                                    &ensp;{user_name}
                                        </NavLink>
                                            </NavItem>
                                            &emsp;
                                    <NavItem>
                                        <NavLink className="font-white logout" href="/">
                                            <img src={Shutdown} alt="" onClick={this.logout} style={{ width: '20px', height: '20px' }}></img>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
                <Menu  />
            </div>
        )
    }
}
