import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import { NotAvailable } from '../../global/notAvailable';
import { DetailOnlineExam } from './helper-online'

export default class ContentOnlineExam extends Component {
    render() {
        let data = {
            header: {
                period: '2018/2019',
                type: 'Ujian Tengah Semester'
            },
            list: [
                {
                    info: {
                        name: 'Aqidah Akhlaq',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 10,
                        count: 10,
                        total: 100
                    },
                    detail: {
                        choices: 90,
                        essay: 10,
                        desc: 'Pelajari Kitab Ushul Tsalatsah Bab 1 - Bab 6'
                    }
                },
                {
                    info: {
                        name: 'al-Lughotul Arabiyyah',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 70,
                        count: 70,
                        total: 100
                    },
                    detail: {
                        choices: 70,
                        essay: 30,
                        desc: 'Pelajari Kitab Durusul Lughoh Jilid 1 & Pelajari Kitab Baina Yadaik serta Kitab al-Muyassar'
                    }
                },
                {
                    info: {
                        name: 'Fiqh',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 100,
                        count: 100,
                        total: 100
                    },
                    detail: {
                        choices: 60,
                        essay: 40,
                        desc: 'Pelajari Kitab Al Umm dan Al Muhaddzab karya Asy Syairozi atau Syarh Al Muhaddzab karya Imam Nawawi'
                    }
                },
                {
                    info: {
                        name: 'Aqidah Akhlaq',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 10,
                        count: 10,
                        total: 100
                    },
                    detail: {
                        choices: 90,
                        essay: 10,
                        desc: 'Pelajari Kitab Ushul Tsalatsah Bab 1 - Bab 6'
                    }
                },
                {
                    info: {
                        name: 'al-Lughotul Arabiyyah',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 70,
                        count: 70,
                        total: 100
                    },
                    detail: {
                        choices: 70,
                        essay: 30,
                        desc: 'Pelajari Kitab Durusul Lughoh Jilid 1 & Pelajari Kitab Baina Yadaik serta Kitab al-Muyassar'
                    }
                },
                {
                    info: {
                        name: 'Fiqh',
                        date: '20 Feb 2019',
                        type: 'UTS',
                        time: '45 Menit',
                        class: 'X IPS'
                    },
                    progress: {
                        percentage: 100,
                        count: 100,
                        total: 100
                    },
                    detail: {
                        choices: 60,
                        essay: 40,
                        desc: 'Pelajari Kitab Al Umm dan Al Muhaddzab karya Asy Syairozi atau Syarh Al Muhaddzab karya Imam Nawawi'
                    }
                }
            ]

        }

        let content = []
        if (data && data.list) {
            let list = data.list
            list.map((x) => {
                content.push(
                    <div className='disblock' key={Math.random()}>
                        <div className='right-block__panel'>
                            <div className='row h-100'>
                                <div className='col-sm-4 right-block__panel-part'>
                                    <label className='header-title disblock padding-bottom-1'>{x.info.name}</label>
                                    <div className='right-block__basic-info-wrapper'>
                                        <div className='right-block__basic-info'>
                                            <i className='fa fa-calendar-o padding-right-1'></i>
                                            <label className='info'>{x.info.date}</label>
                                        </div>
                                        <div className='right-block__basic-info'>
                                            {x.info.type}
                                        </div>
                                        <div className='right-block__basic-info'>
                                            {x.info.time}
                                        </div>
                                    </div>
                                    <label className='p'>{x.info.class}</label>
                                    <div className='padding-top-2 right-block__action-wrapper'>
                                        <div className='right-block__action'>Lihat</div>
                                        <div className='right-block__action'>Ubah Soal</div>
                                        <div className='right-block__action'>Hapus Soal</div>
                                    </div>
                                </div>
                                <div className='col-sm-4 right-block__panel-part padding-top-4'>
                                    <div className='padding-bottom-1'>
                                        <label className='p'>Progress</label>
                                        <span className='pull-right p-green'>{x.progress.percentage === null ? '0' : x.progress.percentage}%</span>
                                    </div>
                                    <Progress value={x.progress.percentage}/>
                                    <label className='info padding-top-1'>{x.progress.count === null ? '0' : x.progress.count}/{x.progress.total === null ? '0' : x.progress.total} Terbuat</label>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='padding-bottom-2'>
                                        <label className='p-bold padding-right-2'>Detil Soal</label>
                                        <i className='fa fa-pencil icon-green'></i>
                                    </div>
                                    <DetailOnlineExam
                                        detail={x.detail}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            content.push(
                <div className='padding-top-4 disblock right-block__panel-wrapper' key={Math.random()}>
                    <NotAvailable>Data Belum Tersedia</NotAvailable>
                </div>
            )
        }
        return (
            <div className='col-sm-9 right-block w-100'>
                <div className="min-height-100">
                    <div className='header-content margin-bottom-4'>
                        <label className='header-title disblock padding-top-6'>Daftar Ujian</label>
                        <label className='padding-top-2 info margin-bottom-3'>{data.header.type} {data.header.period}</label>
                    </div>
                    <div className='right-block__panel-wrapper margin-bottom-4'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
