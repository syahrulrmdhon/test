import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome');
import classnames from 'classnames'

export default class ScheduleItem extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            time: this.props.data.time,
            description: this.props.data.description,
            classes: this.props.data.classes,
            source: this.props.data.source,
            edit: this.props.data.edit,
        }
    }

    render(){

        let action = (this.state.edit == true) ? <div className="float-right padding-1"><FontAwesome name='edit' /> | <FontAwesome name='trash' /></div> : ''

        return(
            <div className={classnames("border-full margin-bottom-2", this.state.source)}>
                {action}
                <div className="padding-3">
                    <div className="time cgray2">{this.state.time}</div>
                    <div className="description">{this.state.description}</div>
                    <div className="margin-top-3">
                        <span className="classes">{this.state.classes}</span>
                    </div>
                </div>
            </div>
        )
    }
}