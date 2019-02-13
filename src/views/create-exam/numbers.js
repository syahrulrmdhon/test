import React, { Component } from 'react'
import Number from './number'

export default class Numbers extends Component {
    getQuestion() {
        let result = []
        for (let index = 1; index <= this.props.totalQuestion; index++) {
            result.push(<Number number={index} key={index}/>)
        }
        return result
    }
    render() {
        return (
        <div>
            {this.getQuestion()}
        </div>
        )
    }
}
