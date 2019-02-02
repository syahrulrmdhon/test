import React, { Component } from 'react'
import './../../styles/penilaian.css'
import Header from '../global/header'
// import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
// import classnames from 'classnames'
import Filter from './filter'
import Index from './index_assessment'

class Penilaian extends Component {
    constructor(props) {
        super(props)

        // this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: '1'
        }
    }

    render() {
        return (
            <div className="padding-content">
                <Header />
                <div className="margin-8">
                    <div className="content-block main-block">
                        <div className="row">
                            <div className="col-sm-2 left-block">
                                <Filter />
                            </div>
                            <div className="col-sm-10 right-block">
                                <Index />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Penilaian;