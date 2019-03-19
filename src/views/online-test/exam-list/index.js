import React, { Component } from 'react'
import Header from './../../global/header'
import Page from './../../../components/Title'
import FilterOnlineExam from './filter'
import './../../../styles/online-test.scss'
import ContentOnlineExam from './content'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class OnlineExamList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <Page title='Daftar Ujian'>
                <Header />
                <div className='online-exam'>

                    <div className='content-block main-block'>
                        <div className='margin-box row h-100'>
                            <div className='col-sm-3 left-block padding-top-4'>
                                <FilterOnlineExam

                                />
                            </div>
                            <ContentOnlineExam

                            />
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    listOnlineExam: state.listOnlineExam //listOnlineExam dari reducer
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
  }, dispatch
  )
  export default connect(mapStateToProps, mapDispatchToProps)(OnlineExamList)