import React, { Component } from 'react'
import Header from './../../global/header'
import Page from './../../../components/Title'
import FilterOnlineExam from './filter'
import './../../../styles/online-test.scss'
import ContentOnlineExam from './content'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { apiClient } from '../../../utils/apiClient';

class OnlineExamList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            assessments: {},
            entries: [],
            totalEntries: 0,
            totalPages: 0,
            sizes: 0,
            classes: [],
            loader: true,
            assessment_id: props.match.params.assessment_id,
        }

        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    detailClicked(e, id) {
        e.preventDefault()
        this.props.history.push({
            pathname: 'bank/' +id,
            state: {id: this.state.assessment_id}
        })
    }

    createQuestion(e, id, name) {
        e.preventDefault()
        this.props.history.push({
            pathname: 'create/' + id,
            state: {id: this.state.assessment_id, name: name}
        })
    }

    getData() {
        let listOnlineExam = _.get(this.props, 'listOnlineExam', {})
        let selectedYear = listOnlineExam ? listOnlineExam.selectedYear : ''
        let selectedSemester = listOnlineExam ? listOnlineExam.selectedSemester : ''
        let selectedType = listOnlineExam ? listOnlineExam.selectedType : ''
        let selectedGrade = listOnlineExam ? listOnlineExam.selectedGrade : ''

        let params = {}

        if (selectedSemester != '') {
            params['school_period_id'] = selectedSemester
        }
        if (selectedType != '') {
            params['assessment_type'] = selectedType
        }
        if (selectedGrade != '') {
            params['grade_id'] = selectedGrade
        }

        apiClient('get', 'v1/tests', false, params).then(res => {
            const data = _.get(res, 'data.data', {})
            const { assessments } = data || []
            const { entries, total_entries, total_pages, size } = assessments || []

            this.setState({
                data: data,
                assessments: assessments,
                entries: entries,
                totalEntries: total_entries,
                totalPages: total_pages,
                sizes: size,
                loader: false
            })
        })
    }

    handleSubmit() {
        this.getData()
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
                                    handleSubmit={this.handleSubmit.bind(this)}
                                />
                            </div>
                            <ContentOnlineExam
                                data={this.state.data}
                                loader={this.state.loader}
                                detailClicked={this.detailClicked.bind(this)}
                                create = {this.createQuestion.bind(this)}
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