import React, { Component } from 'react'
import Tab from './index/tab'
import Table from './index/table'
import { NavLink } from 'react-router-dom'

export default class IndexAssessment extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: [{}]
        }
    }

    render() {

        let content = []
        if(this.state.data.length > 0){
            content.push(<Table key={1} />)
        } else {
            content.push(
                <div className="margin-top-4 empty-data" key={1} >
                    Data belum tersedia.
                </div>
            )
        }

        return(
            <div className="margin-top-6 margin-left-3 margin-right-6">
                <div className="row">
                    <div className="col-sm-6">
                        <label className="header-title">Daftar Topik Penilaian</label>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-right">
                            <NavLink to="/penilaian/tambah" className="submit-btn default">Tambah Topik</NavLink>
                        </div>
                    </div>
                </div>
                <Tab />
                {content}
            </div>
        )
    }
}