import React, { Component } from 'react'
import './../../styles/penilaian.css'
import Header from '../global/header'
import Filter from './filter'
import Index from './index_assessment'
import { assessmentGetData } from '../../utils/exam'
import { assessmentType } from '../../utils/common'
import Page from './../../components/Title'

import Tab from './index/tab'
import { NavLink } from 'react-router-dom'
import _ from 'lodash'

// import Pagination from './../global/pagination'

class Penilaian extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'knowledge',
            assessment_type: null,
            class_id: null,
            school_subject_id: null,
            data: [],
            paginate: {},
            assessment_types: [],
            loader: true,
            reset: 1,
        }
        this.tabToggle = this.tabToggle.bind(this)
        this.onChangeAttr = this.onChangeAttr.bind(this)
        this.onFilter = this.onFilter.bind(this)
    }

    componentDidMount(){
        let params_category = _.get(this.props, 'location.state.category', 'knowledge')

        this.setState({
            activeTab: params_category,
        }, () => {
            assessmentGetData.call(this)
            assessmentType.call(this, {category: this.state.activeTab})
        })
    }

    onChangeAttr(event, props){
        let obj = {}
        obj[props.name] = event
        this.setState(obj)
    }

    tabToggle(category = false){
        this.setState({
            activeTab: category,
            reset: 0,
            loader: true
        }, () => {
            assessmentGetData.call(this)
            assessmentType.call(this, {category: category})
        })
    }

    onFilter(event){
        event.preventDefault()
        this.setState({loader: true}, () => { 
            assessmentGetData.call(this) 
        })
    }

    render() {
        return (
            <Page title="assessment">
                <div className="padding-content">
                    <Header />
                    <div className="margin-content">
                        <div className="content-block main-block">
                            <div className="row margin-0">
                                <div className="col-sm-3 left-block">
                                    <Filter
                                        assessment_types={this.state.assessment_types}
                                        onChangeAttr={this.onChangeAttr}
                                        onFilter={this.onFilter}
                                        assessment_type={this.state.assessment_type}
                                        class_id={this.state.class_id}
                                        school_subject_id={this.state.school_subject_id}
                                    />
                                </div>
                                <div className="col-sm-9 right-block content-topic" id="topic-wrapper" ref = "cpDev1">
                                    <div className="padding-top-6 h-100">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label className="header-title">Daftar Topik Penilaian</label>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="float-right">
                                                    <NavLink to="/assessment/add" className="submit-btn default">Tambah Topik</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <Tab 
                                            activeTab={this.state.activeTab}
                                            tabToggle={this.tabToggle} 
                                        />
                                        <Index 
                                            data={this.state.data} 
                                            category={this.state.activeTab} 
                                            paginate={this.state.paginate}
                                            loader={this.state.loader} 
                                            reset={this.state.reset}
                                        />
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
export default Penilaian;