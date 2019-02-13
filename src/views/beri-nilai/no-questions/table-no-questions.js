import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { Parent, Fullname, Email, TotalAverage, Pencil } from './helper'
import './../../../styles/beri-nilai/main.scss'
import './../../../styles/global/component.css'

export default class TableNoQuestions extends Component {
    render() {
        let content = []
        if (this.props.data.length > 0) {
            let data = this.props.data
            data.map((value, idx) => {
                let users = value.user
                let scores = value.scores

                content.push(
                    <div key={idx}>
                        <Parent
                            selectIndex={this.props.selectIndex}
                            idx={idx}
                            users={users}
                            scores={scores}
                            data={data}
                            handleClickQuestion={this.props.handleClickQuestion}
                            handleClick={this.props.handleClick}
                        />
                    </div>
                )
            })
        }
        return (
            <div className='content-bottom'>
                <div className='header margin-top-4'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className="col-sm-3 padding-1">
                                <span className="padding-3">Nama Murid</span>
                            </div>
                            <div className="col-sm-3 padding-1 align-left">
                                <span>Email</span>
                            </div>
                            <div className="col-sm-3 align-center padding-1">
                                <span>Nilai</span>
                            </div>
                            <div className="col-sm-2 padding-1">
                                <span>Beri Nilai</span>
                            </div>
                            <div className="col-sm-1 padding-1">
                                <span>Rincian</span>
                            </div>
                        </div>
                    </div>
                    <div className='content-student'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
