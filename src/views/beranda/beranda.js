import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/beranda.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import SideBar from './side_bar'
import Schedule from './schedule'

import { apiClient } from '../../utils/apiClient'
import { classes } from '../../utils/common'

var FontAwesome = require('react-fontawesome');
import classnames from 'classnames'

class Beranda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBar: 'expand',
            data: [],
            classes: [],
        }

        this.clickSideBar = this.clickSideBar.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        classes.call(this)
        this.getData()
    }

    getData(){
        apiClient('get', 'v1/home/index').then(response => {
            this.setState({
                data: response.data.data.activity_schedules
            })
        })
    }

    clickSideBar(){
        let show = (this.state.isSideBar == 'expand') ? 'minimize' : 'expand'
        this.setState({
            isSideBar: show
        })
    }

    render() {
        let schedules = []
        if(this.state.data.length > 0){
            {this.state.data.map((result, key) => (
                schedules.push(<Schedule 
                    dayname={result.dayname} 
                    datename={result.datename} 
                    current={result.current} 
                    items={result.items} 
                    key={key}
                />)
            ))};
        }

        let icon = (this.state.isSideBar == 'expand') ? 'arrow-left' : 'calendar'

        return (
            <div className="body-content padding-content">
                <Header />
                <MenuBar />
                <div className={classnames("sidebar", this.state.isSideBar)}>
                    <div className="mainbar">
                        <FontAwesome name={icon} className="minimize-side-bar" onClick={this.clickSideBar} />
                        <SideBar isSideBar={this.state.isSideBar} classes={this.state.classes} />
                    </div>
                </div>
                <div className={classnames("row margin-right-0 schedule-range", this.state.isSideBar)}>
                    <div className="col-sm-12">
                        <div className="margin-2">
                            <div className="schedule padding-4">
                              { schedules }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Beranda;