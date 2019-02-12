import React, { Component } from 'react'
import Header from '../../global/header'
import { Nav, NavItem, NavLink } from 'reactstrap'
import {getDataExamUser} from './../../../utils/exam_class'

export default class ParticipantUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 'ParticipantForm',
            assessment_id: 'f80f7981-f1e0-4391-b6fc-1de57721c518',
            exam_id: '90744b5a-85ad-46e9-ac9b-422c96de0016',
            classes: []
        }
    }

    componentDidMount(){
        getDataExamUser.call(this, this.state.step, this.state.assessment_id, this.state.exam_id)
    }

    render(){
        return (
            <div className="padding-content">
               <Header />
               <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">Pilih Peserta Didik</label>
                                    <div className="margin-top-10">
                                        <div className="margin-top-4">
                                            <Nav tabs className="toggle tab-class">
                                                <NavItem>
                                                    <NavLink
                                                    className="active"
                                                    // className={classnames({ active: this.props.activeTab === 'knowledge' })}
                                                    // onClick={() => { this.props.tabToggle('knowledge'); }}
                                                    >
                                                    X IPA 2
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                    // className={classnames({ active: this.props.activeTab === 'skill' })}
                                                    // onClick={() => { this.props.tabToggle('skill'); }}
                                                    >
                                                    X IPA 1
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                    >
                                                    X IPA 1
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    <div className="margin-vert-4">
                                        Nama Peserta Didik
                                    </div>
                                    <div className="border-full padding-4 margin-bottom-2">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="checkbox-wrapper padding-1">
                                                    <div className="checkbox-button">
                                                        <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                                        <label htmlFor="check1"></label>
                                                    </div>
                                                    <label htmlFor="check1" className="checkbox-label">Aba Riza</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="checkbox-wrapper padding-1">
                                                    <div className="checkbox-button">
                                                        <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                                        <label htmlFor="check1"></label>
                                                    </div>
                                                    <label htmlFor="check1" className="checkbox-label">Aba Riza</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="checkbox-wrapper padding-1">
                                                    <div className="checkbox-button">
                                                        <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                                        <label htmlFor="check1"></label>
                                                    </div>
                                                    <label htmlFor="check1" className="checkbox-label">Aba Riza</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="checkbox-wrapper padding-1">
                                                    <div className="checkbox-button">
                                                        <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                                        <label htmlFor="check1"></label>
                                                    </div>
                                                    <label htmlFor="check1" className="checkbox-label">Aba Riza</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="checkbox-wrapper padding-1">
                                                    <div className="checkbox-button">
                                                        <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                                        <label htmlFor="check1"></label>
                                                    </div>
                                                    <label htmlFor="check1" className="checkbox-label">Aba Riza</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkbox-wrapper disblock">
                                        <div className="checkbox-button">
                                            <input type="checkbox" id="check1" value="check1" name="checkbox" />
                                            <label htmlFor="check1"></label>
                                        </div>
                                        <label htmlFor="check1" className="checkbox-label">Pilih Semua Peserta Didik</label>
                                    </div>
                                    <button className="submit-btn margin-top-8" onClick={this.onSubmit}>Lanjut</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}