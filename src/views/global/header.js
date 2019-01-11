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
        return (
            <div className="header-bar">
                <div className="bg-green-header">
                    <Navbar expand="md" className="font-white">
                        <NavbarBrand>
                            <img src={Logo} alt="" />
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
                                    <NavLink className="font-white" href="/">
                                        <img src={Shutdown} alt="" style={{ width: '20px', height: '20px' }}></img>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}
