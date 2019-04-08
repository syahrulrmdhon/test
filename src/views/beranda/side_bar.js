import React, { Component } from 'react'
import Calendar from 'react-calendar'; // https://www.npmjs.com/package/react-calendar
import { getDate } from '../../utils/common'

var FontAwesome = require('react-fontawesome');

export default class SideBar extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            date: new Date(),
        }
    }

    render(){
        let show = (this.props.isSideBar == 'expand') ? 'show' : 'hide'

        let textClass = []
        if(this.props.classes.length > 0){
            this.props.classes.map((classs, idx) => {
                textClass.push(
                    <div className="col-md-12 col-lg-6" key={idx}>
                        <div className="disblock margin-top-2">
                            <div className="checkbox-wrapper">
                                <div className="checkbox-button">
                                    <input type="checkbox" name={classs.value} value={classs.value} id={idx} onChange={this.props.onChangeClass} />
                                    <label htmlFor={idx} className="title"></label>
                                </div>
                                <label htmlFor={idx} className="checkbox-label">{classs.label}</label>
                            </div>
                        </div>                        
                    </div>
                )
            })
        }

        let dateIndo = getDate();
        let dayName = getDate('case-2');

        return(
            <div className={show}>
                <div className="align-center margin-top-2 margin-bottom-6">
                    <div className="header-title">Hari ini, {dayName}</div>
                    <div className="title">{dateIndo}</div>
                </div>
                <div className="border-top padding-top-2 margin-bottom-2">
                    <Calendar
                        value={this.state.date}
                        prev2Label={ null }
                        next2Label={ null }
                        prevLabel={<FontAwesome name="chevron-left" />}
                        nextLabel={<FontAwesome name="chevron-right" />}
                        onChange={this.props.changeCalendar}
                        locale={"id-ID"}
                    />
                </div>
                <div className="border-top padding-top-2">
                    <div className="padding-4">
                        <div className="header-title bold">Filter Kelas</div>
                        <div className="margin-top-2">
                            <div className="row row-class">
                                {textClass}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>                 
        )
    }
}