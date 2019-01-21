import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome');
import ScheduleItem from './schedule_item'
import classnames from 'classnames'

export default class Schedule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dayname: this.props.dayname,
            datename: this.props.datename,
            current: this.props.current,
            data: this.props.items,
        }
    }

    render(){

        let items = []
        if(this.state.data.length > 0){
            {this.state.data.map((result, key) => (
                items.push(<ScheduleItem data={result} key={key} />)
            ))};
        } else {
            items = <div className="empty-schedule"><span className="align-center disblock small-text cgray2">Jadwal kegiatan masih kosong</span></div>
        }

        // check current day
        let current = ''
        if(this.state.current == true){
            current = 'current'
        }

        return(
            <div className="content-block disinblock margin-right-4">
                <span className={classnames("bold dayname", current)}>{this.state.dayname}, </span><span>{this.state.datename}</span>
                <div className="list">
                    {items}
                </div>
                <div className="add-activity margin-top-4">
                    <a href="#" className="fullwidth disblock align-center"><FontAwesome name='plus-circle' /> Tambah Kegiatan</a>
                </div>
            </div>
        )
    }
}