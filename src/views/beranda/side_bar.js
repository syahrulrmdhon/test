import React, { Component } from 'react'
import Calendar from 'react-calendar'; // https://www.npmjs.com/package/react-calendar

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
                    <div className="col-sm-6" key={idx}>
                        <input type="checkbox" value={classs.id} /><span className="title">{classs.name}</span>
                    </div>
                )
            })
        }

        return(
            <div className={show}>
                <div className="align-center margin-top-2 margin-bottom-6">
                    <div className="header-title">Hari ini, Senin</div>
                    <div className="title">25 November 2018</div>
                </div>
                <div className="border-top padding-top-2 margin-bottom-2">
                    <Calendar
                        // onChange={this.onChange}
                        value={this.state.date}
                        prev2Label={ null }
                        next2Label={ null }
                    />
                </div>
                <div className="border-top padding-top-2">
                    <div className="padding-4">
                        <div className="header-title bold">Filter Kelas</div>
                        <div className="margin-top-2">
                            <div className="row">
                                {textClass}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>                 
        )
    }
}