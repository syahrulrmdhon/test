import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/beranda.css'

import Header from '../global/header'
import SideBar from './side_bar'
import Schedule from './schedule'
import { dragEvent } from './drag-event'
import classnames from 'classnames'
import { apiClient } from '../../utils/apiClient'
import { classes } from '../../utils/common'
import Loader from './../global/loader'
import Page from './../../components/Title'
var FontAwesome = require('react-fontawesome');

class Beranda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBar: 'expand',
            data: [],
            classes: [],
            setDate: null,
            scheduleList: [],
            checkedItems: {},
            class_id: '',
            loader: true
        }

        this.clickSideBar = this.clickSideBar.bind(this)
        this.getData = this.getData.bind(this)
        this.changeCalendar = this.changeCalendar.bind(this)
        this.onChangeClass = this.onChangeClass.bind(this)
        this.renderFlag = this.renderFlag.bind(this)
    }

    componentDidMount(){
        classes.call(this)
        this.getData()
    }

    getData(params = {}, flag = false){
        if(this.state.setDate){
            params['date'] = this.state.setDate
        }
        if(this.state.class_id != ''){
            params['class_id'] = this.state.class_id;
        }

        if(flag){
            this.setState({
                loader: true
            }, () => {
                apiClient('get', 'v1/home/index', false, params).then(response => {
                    this.setState({
                        data: response.data.data.activity_schedules,
                        loader: false
                    })
                })
            })
        } else {
            apiClient('get', 'v1/home/index', false, params).then(response => {
                this.setState({
                    data: response.data.data.activity_schedules,
                    loader: false
                })
            })
        }
                
        // this.setState({
            // data: [],    
            // scheduleList: [],
            // loader : true
        // })
        
    }

    clickSideBar(){
        let show = (this.state.isSideBar == 'expand') ? 'minimize' : 'expand'
        this.setState({
            isSideBar: show
        })

    }

    renderFlag(set_date){
        let datas = this.state.data
        let flag = true
        if(datas.length > 0){
            datas.map((data, idx) => {
                if(data.date == set_date){
                    flag = false
                }
            })
        }
        return flag
    }

    changeCalendar(date){
        let setDate = new Intl.DateTimeFormat('sq-AL', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)
        let flag = this.renderFlag(setDate)

        this.setState({
            setDate: setDate
        }, () => {
            this.getData({}, flag);
        })
    }

    onChangeClass(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;

        if(isChecked){
            this.state.checkedItems[item] = item
        } else {
            delete this.state.checkedItems[item]
        }

        const result = Object.values(this.state.checkedItems);
        this.setState({
            class_id: (result.length > 0) ? result.join(',') : '',
            data: [],
            scheduleList: [],
            loader: true,
        }, () => {
            this.getData()
        })
    }

    render() {
        let dayname = ''
        if(this.state.data.length > 0){
            this.state.scheduleList = []
            {this.state.data.map((result) => {

                if(result.date == this.state.setDate){
                    dayname = result.dayname
                }

                this.state.scheduleList.push(<Schedule 
                    dayname={result.dayname} 
                    datename={result.datename} 
                    current={result.current} 
                    date={result.date}
                    items={result.items}
                    holiday={result.holiday}
                    classes={this.state.classes}
                    key={result.date}
                />)
            })};
        }

        let icon = (this.state.isSideBar == 'expand') ? 'arrow-left' : 'calendar'
        let show = (this.state.loader) ? 'none' : ''

        dragEvent(dayname)
        return (
            <Page title="Beranda">
                <div className="body-content padding-content">
                    <Header history={this.props.history} />
                    <div className={classnames("sidebar", this.state.isSideBar)}>
                        <div className="mainbar">
                            <FontAwesome name={icon} className="minimize-side-bar" onClick={this.clickSideBar} />
                            <SideBar isSideBar={this.state.isSideBar} classes={this.state.classes} onChangeClass={this.onChangeClass} changeCalendar={this.changeCalendar} />
                        </div>
                    </div>
                    <div className={classnames("row margin-right-0 schedule-range", this.state.isSideBar)}>
                        <div className="col-sm-12 padding-left-1 padding-right-0">
                            <div className="margin-left-2 margin-top-1">
                                <div className={classnames("schedule items padding-4", this.state.isSideBar)}>
                                    <Loader loader={this.state.loader}/>
                                    <div className="schedule-item">
                                        {this.state.scheduleList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
export default Beranda;