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
            {content}
            </div>
        )
    }
}
