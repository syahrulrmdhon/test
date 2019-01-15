import React, { Component } from 'react'
import '../../styles/global/header.scss'
import '../../styles/global/component.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default class MenuBar extends Component {
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
            <div className="menu-bar">
                <div className="bg-white">
                    <Navbar expand="md" className="font-grey">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="font-grey" href="/home">
                                        Beranda
                                    </NavLink>
                                </NavItem>
                                &emsp;&emsp;
                                <NavItem>
                                    <NavLink className="font-grey" href="/absen">
                                        Absensi
                                    </NavLink>
                                </NavItem>
                                &emsp;&emsp;
                                <NavItem>
                                    <NavLink className="font-grey" href="/penilaian">
                                        Penilaian
                                    </NavLink>
                                </NavItem>
                                &emsp;&emsp;
                                <NavItem>
                                    <NavLink className="font-grey" href="/daftar-nilai">
                                        Daftar Nilai
                                </NavLink>
                                </NavItem>
                                &emsp;&emsp;
                                <NavItem>
                                    <NavLink className="font-grey" href="/rapor">
                                        Rapor Kelas
                                </NavLink>
                                </NavItem>
                                &emsp;&emsp;
                                <NavItem>
                                    <NavLink className="font-grey" href="/murid">
                                        Daftar Murid
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
