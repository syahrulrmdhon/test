import React, { Component } from 'react'
import ScheduleItem from './schedule_item'
import ScheduleModal from './schedule_modal'
import classnames from 'classnames'
var FontAwesome = require('react-fontawesome');

export default class Schedule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dayname: this.props.dayname,
            datename: this.props.datename,
            current: this.props.current,
            edit: this.props.edit,
            date: this.props.date,
            classes: this.props.classes,
            holiday: this.props.holiday,
            data: this.props.items,
        }
        this.callBack = this.callBack.bind(this)
        this.modal = React.createRef();

        this.childModal = this.childModal.bind(this)
    }

    callBack(data){
        this.setState({
            data: data,
        })
    }

    childModal(event){        
        this.modal.current.onOpenModal(event.target.id, event.target.dataset.source)
    }

    render(){
        let items = []
        if(this.state.data.length > 0){
            {this.state.data.map((result, key) => (
                items.push(
                    <ScheduleItem data={result} key={key} modal={this.childModal} />,
                    <ScheduleModal key={Math.random()} id={result.id} id={result.id} listClass={this.state.classes} setDate={this.state.date} callBack={this.callBack} ref={this.modal} />
                )
            ))};
        } else {
            items = <div className="empty-schedule"><span className="align-center disblock small-text cgray2">Jadwal kegiatan masih kosong</span></div>
        }

        // check current day
        let today = ''
        if(this.state.holiday){
            today = 'holiday'
        } else if(this.state.current){
            today = 'current'
        }

        return(
            <div className="content-block disinblock margin-right-4">
                <div className="day-wrapper">
                    <span className={classnames("bold dayname", today)}>{this.state.dayname}, </span><span className={today}>{this.state.datename}</span>
                </div>
                <div className="list">
                    {items}
                </div>
                <ScheduleModal key={Math.random()} listClass={this.state.classes} setDate={this.state.date} callBack={this.callBack} ref={this.modal} />
                <div className="add-activity margin-top-4">
                    <a href="javascript:void(0);" onClick={this.childModal} className="fullwidth disblock align-center"><FontAwesome name='plus-circle' /> Tambah Kegiatan</a>
                </div>
            </div>
        )
    }
}