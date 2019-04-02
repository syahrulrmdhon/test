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
        this.onQuestionDetail = this.onQuestionDetail.bind(this)

    }

    componentDidMount() {
        this.getData()
    }

    detailClicked(e, id, examId) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/online-exam/create/' + id + '/exam/' + examId
        })
    }

    createQuestion(e, id, name, subject_id) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/online-exam/create/' + id + '/subject/' + subject_id,
            state: {id: this.state.assessment_id, name: name, subject_id: subject_id}
        })
    }

    onQuestionDetail(e, assessment_id, exam_id){
        console.log(assessment_id, exam_id,"here we go")
        this.props.history.push({
            pathname:`/all-question/${assessment_id}/assessment/${exam_id}/exam/`
        })
    }




    getData() {
        let listOnlineExam = _.get(this.props, 'listOnlineExam', {})
        let selectedYear = listOnlineExam ? listOnlineExam.selectedYear : ''
        let selectedSemester = listOnlineExam ? listOnlineExam.selectedSemester : ''
        let selectedType = listOnlineExam ? listOnlineExam.selectedType : ''
        let selectedGrade = listOnlineExam ? listOnlineExam.selectedGrade : ''

        let params = {}

        if (selectedSemester !== '') {
            params['school_period_id'] = selectedSemester
        }
        if (selectedType !== '') {
            params['assessment_type'] = selectedType
        }
        if (selectedGrade !== '') {
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
                                directQuestion={this.onQuestionDetail}
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