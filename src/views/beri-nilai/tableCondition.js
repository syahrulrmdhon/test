import React, { Component } from 'react'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'
import classNames from 'classnames'
var FontAwesome = require('react-fontawesome');


export class Score extends Component {
    render() {
        let score = 'N/A'
        let classname = ''
        let status = ''
        let dataScore = this.props.data.scores.total_averages
        dataScore.map(function (x, i) {
            status = x.result_status
            score = x.score
        })

        if (dataScore.length === 0) {
            classname = 'label-nilai'
        } else if (dataScore.length !== 0 && status === 'very_good') {
            classname = 'color-green-score';
        } else if (dataScore.length !== 0 && status === 'good') {
            classname = 'color-green-score';
        } else if (dataScore.length !== 0 && status === 'enough') {
            classname = 'color-yellow-score';
        } else if (dataScore.length !== 0 && status === 'need_attention') {
            classname = 'color-red-score';
        }

        return (
            <td className={classname}>{score}</td>
        )
    }
}


export class AvatarComponent extends Component {
    render() {
        let classname = ''
        let status = ''
        let dataScore = this.props.data.scores.total_averages
        dataScore.map(function (x, i) {
            status = x.result_status
        })
        if (dataScore.length === 0) {
            classname = 'border-left-col-red'
        } else if (dataScore.length !== 0 && status === 'very_good') {
            classname = 'border-left-col-green';
        } else if (dataScore.length !== 0 && status === 'good') {
            classname = 'border-left-col-green';
        } else if (dataScore.length !== 0 && status === 'enough') {
            classname = 'border-left-col-yellow';
        } else if (dataScore.length !== 0 && status === 'need_attention') {
            classname = 'border-left-col-red';
        }
        return (
            <td className={classNames('align-center', classname)}>
                <Avatar src={Ava} size="30" round={true} />
            </td>
        )
    }
}

export class Collapse extends Component {
    render() {
        let classname = ''
        let status = ''
        let dataScore = this.props.data.scores.total_averages
        dataScore.map(function (x, i) {
            status = x.result_status
        })
        if (dataScore.length === 0) {
            classname = 'cred'
        } else if (dataScore.length !== 0 && status === 'very_good') {
            classname = 'cgreen';
        } else if (dataScore.length !== 0 && status === 'good') {
            classname = 'cgreen';
        } else if (dataScore.length !== 0 && status === 'enough') {
            classname = 'cyellow';
        } else if (dataScore.length !== 0 && status === 'need_attention') {
            classname = 'cred';
        }
        return (
            <td>
                <FontAwesome name="ellipsis-h" size="lg" className={classNames("icon-table-pencil", classname)} />
            </td>
        )
    }
}


