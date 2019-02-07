import React, { Component } from 'react'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'
import classNames from 'classnames'

export default class AvatarComponent extends Component {
  render() {
    let classname = ''
    let status = ''
    let dataScore = this.props.data.scores.total_averages
    dataScore.map(function(x,i){
        status = x.result_status
    })
    if(dataScore.length === 0){
        classname='border-left-col-red'
    }else if(dataScore.length !== 0 && status === 'very_good'){
        classname='border-left-col-green';
    }else if(dataScore.length !== 0 && status === 'good' ){
        classname='border-left-col-green';
    }else if(dataScore.length !== 0 && status === 'enough' ){
        classname='border-left-col-yellow';
    }else if(dataScore.length !== 0 && status === 'need_attention'){
        classname='border-left-col-red';
    }
    return (
        <td className={classNames('align-center',classname)}>
             <Avatar src={Ava} size="30" round={true} />
         </td>
    )
  }
}
