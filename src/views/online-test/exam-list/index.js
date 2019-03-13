import React, { Component } from 'react'
import Header from './../../global/header'
import Page from './../../../components/Title'
import FilterOnlineExam from './filter'
import './../../../styles/online-test.scss'
import { NotAvailable } from '../../global/notAvailable'
import { Progress } from 'reactstrap'

export default class OnlineExamList extends Component {
    render() {
        return (
            <Page title='Daftar Ujian'>
                <div className='online-exam'>
                    <div className='padding-content'>
                        <Header />
                        <div className='margin-content'>
                            <div className='content-block main-block'>
                                <div className='margin-0'>
                                    <div className='col-sm-3 left-block'>
                                        <FilterOnlineExam

                                        />
                                    </div>
                                    <div className='col-sm-9 right-block w-100'>
                                        <div className='header-content'>
                                            <label className='header-title disblock padding-top-6'>Daftar Ujian</label>
                                            <label className='padding-top-2 info margin-bottom-3'>Ujian Tengah Semester [Periode]</label>
                                        </div>
                                        <div className='padding-top-4 disblock right-block__panel-wrapper'>
                                            <div className='right-block__panel'>
                                                <div className='row h-100'>
                                                    <div className='col-sm-4 right-block__panel-part'>
                                                        <label className='header-title disblock'>Daftar Ujian</label>
                                                        <label className='padding-top-2 info margin-bottom-3'>Ujian Tengah Semester [Periode]</label>
                                                    </div>
                                                    <div className='col-sm-4 right-block__panel-part'>
                                                        <Progress value={75} color="success" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <NotAvailable>Ujian belum tersedia</NotAvailable> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
