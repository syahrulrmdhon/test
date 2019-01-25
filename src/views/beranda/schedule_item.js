import React, { Component } from 'react'
import classnames from 'classnames'

export default class ScheduleItem extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            time: this.props.data.time,
            description: this.props.data.description,
            classes: this.props.data.classes,
            source: this.props.data.source,
        }
    }

    render(){
        return(
            <div className={classnames("border-full margin-bottom-2", this.state.source)}>
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