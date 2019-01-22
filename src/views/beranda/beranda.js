import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/beranda.css'


import Header from '../global/header'
import MenuBar from '../global/navbar'
import SideBar from './side_bar'
import Schedule from './schedule'

class Beranda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    dayname: 'Senin',
                    datename: '5 Nov',
                    current: true,
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                    ],
                },
                {
                    dayname: 'Selasa',
                    datename: '6 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
                {
                    dayname: 'Rabu',
                    datename: '7 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
                {
                    dayname: 'Kamis',
                    datename: '8 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
                {
                    dayname: 'Jumat',
                    datename: '9 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
                {
                    dayname: 'Sabtu',
                    datename: '10 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
                {
                    dayname: 'Minggu',
                    datename: '11 Nov',
                    items: [
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 2',
                            source: 'subject',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 1',
                            source: 'activity',
                        },
                        {
                            time: '08:00 - 09:00',
                            description: 'Mengajar Bahasa Indonesia',
                            classes: 'X IPA 3',
                            source: 'activity',
                        },
                    ],
                },
            ]
        }
    }

    render() {

        let schedules = []
        if(this.state.data.length > 0){
            {this.state.data.map((result, key) => (
                schedules.push(<Schedule 
                    dayname={result.dayname} 
                    datename={result.datename} 
                    current={result.current} 
                    items={result.items} 
                    key={key}
                    />)
            ))};
        }

        return (
            <div className="body-content padding-content">
                <Header />
                <MenuBar />
                <div className="row margin-right-0">
                    <div className="col-sm-3">
                       <SideBar /> 
                    </div>
                    <div className="col-sm-9">
                        <div className="margin-2">
                            <div className="schedule padding-4">
                              { schedules }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Beranda;