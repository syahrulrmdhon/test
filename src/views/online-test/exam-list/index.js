import React, { Component } from 'react'
import Header from './../../global/header'
import Page from './../../../components/Title'
import FilterOnlineExam from './filter'
import './../../../styles/online-test.scss'
import { NotAvailable } from '../../global/notAvailable'
import { Progress } from 'reactstrap'
import ContentOnlineExam from './content'

export default class OnlineExamList extends Component {
    render() {
        return (
            <Page title='Daftar Ujian'>
                <div className='online-exam'>
                    <div className='padding-content'>
                        <Header />
                        <div className='margin-content'>
                            <div className='content-block main-block h-100 row'>
                                <div className='col-sm-3 left-block'>
                                    <FilterOnlineExam

                                    />
                                </div>
                                <ContentOnlineExam

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
