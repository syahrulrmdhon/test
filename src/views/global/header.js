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
import logo from './../../assets/images/logo.svg'

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
                <div className="bg-green">
                    <Navbar expand="md" className="font-white">
                        <NavbarBrand>
                            <img src={logo} alt="" />
                            &emsp;
                        <span className="font-white">SMA Negeri Cahaya Madani Banten Boarding School</span>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="font-white" href="/components/">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="font-white" href="/murid">Nama Guru</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}
