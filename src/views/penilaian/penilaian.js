import React, { Component } from 'react'
import './../../styles/penilaian.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import FilterPenilaian from './filter';



class Penilaian extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: '1'
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleSubmit() {

    }

    render() {
        return (
            <div className="penilaian">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <FilterPenilaian />
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-4">
                                    <div className="float-left">
                                        <Nav tabs className="border-0 pull-left">
                                            <NavItem className="tab-penilaian">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}>
                                                    Pengetahuan
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-penilaian">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}>
                                                    Keterampilan
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-penilaian">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '3' })}
                                                    onClick={() => { this.toggle('3'); }}>
                                                    Sikap
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <button className="btn-white float-right">Tambah Penilaian</button>
                                </div>
                                <TabContent>
                                    <TabPane tabId="1">
                                        <div className="table-content">
                                            <Table bordered striped responsive hover>

                                            </Table>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        nganu 2
                                    </TabPane>
                                    <TabPane tabId="3">
                                        nganu 3
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Penilaian;