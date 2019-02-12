import React, { Component } from 'react'
import Header from '../../global/header'
import { Nav, NavItem, NavLink } from 'reactstrap'
import {getDataExamUser} from './../../../utils/exam_class'

export default class ParticipantUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 'ParticipantForm',
            assessment_id: this.props.match.params.assessment_id || null,
            exam_id: this.props.match.params.exam_id || null,
            classes: [],
            activeTab: null,
        }
    }

    componentDidMount(){
        getDataExamUser.call(this, this.state.step, this.state.assessment_id, this.state.exam_id)
    }

    render(){
        let tab = []
        if(this.state.classes.length > 0){
            this.state.classes.map((classs, idx) => {
                let active = null

                if(this.state.activeTab == null && idx == 0){
                    active = 'active'
                }

                tab.push(
                    <NavItem key={idx}>
                        <NavLink
                        className={active}
                        >
                        {classs.name}
                        </NavLink>
                    </NavItem>
                )
            })
        }

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
                                                {tab}
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