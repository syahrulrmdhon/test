import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome');
import Calendar from 'react-calendar'; // https://www.npmjs.com/package/react-calendar

export default class SideBar extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            date: new Date(),
        }
    }

    // onChange = date => this.setState({ date })

    render(){
        return(
            <div className="sidebar">
                <div className="mainbar">
                    <FontAwesome name='arrow-left' className="minimize-side-bar" />
                    <div className="align-center margin-top-2 margin-bottom-6">
                        <div className="header-title">Hari ini, Senin</div>
                        <div className="title">25 November 2018</div>
                    </div>
                    <div className="border-top padding-top-2 margin-bottom-2">
                        <Calendar
                            // onChange={this.onChange}
                            value={this.state.date}
                            prev2Label={ null }
                            next2Label={ null }
                        />
                    </div>
                    <div className="border-top padding-top-2">
                        <div className="padding-4">
                            <div className="header-title bold">Filter Kelas</div>
                            <div className="margin-top-2">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input id="checkbox" type="checkbox" /><span className="title" htmlFor="checkbox">Semua Kelas</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">X IPA 2</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">X IPA 3</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">X IPA 4</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input id="checkbox" type="checkbox" /><span className="title" htmlFor="checkbox">XI IPA 2</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">XI IPA 3</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">XII IPA 3</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input type="checkbox" /><span className="title">XII IPA 4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        )
    }
}