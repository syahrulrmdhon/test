import React, { Component } from 'react'
import classnames from 'classnames'
import {
    seeMore
} from './../../utils/common'
var FontAwesome = require('react-fontawesome');

export default class ScheduleItem extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            id: this.props.data.id,
            time: this.props.data.time,
            description: this.props.data.description,
            classes: this.props.data.classes,
            source: this.props.data.source,
            edit: this.props.data.edit,
            expanded: false,
        }
        this.seeMore = this.seeMore.bind(this)
    }

    seeMore(){
        this.setState({
            expanded: !this.state.expanded,
        })
    }

    render(){
        let action = (this.props.data.edit == true) ? <div className="float-right padding-1"><FontAwesome onClick={this.props.modal} id={this.props.data.id} name='edit' className="cgreen" /> | <FontAwesome onClick={this.props.modal} id={this.props.data.id} data-source= "delete" name='trash' className="cgreen" /></div> : ''
        let textClass = !!(this.props.data.classes) ?  <div className="margin-top-3"><span className="classes">{this.props.data.classes}</span></div> : ''
        let {description} = this.props.data
        
        // custom
        description = seeMore(description, 150, {
            expanded: this.state.expanded,
            see_more: true,
            callBack: this.seeMore
        })

        return(
            <div className={classnames("border-full margin-bottom-2", this.props.data.source)}>
                {action}
                <div className="padding-3">
                    <div className="time cgray2">{this.props.data.time}</div>
                    <div className="description">{description}</div>
                    {textClass}
                </div>
            </div>
        )
    }
}