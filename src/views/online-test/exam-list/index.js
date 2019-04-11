import React, { Component } from 'react'
import Header from './../../global/header'
import Page from './../../../components/Title'
import FilterOnlineExam from './filter'
import './../../../styles/online-test.scss'
import ContentOnlineExam from './content'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { apiClient } from '../../../utils/apiClient'
import { confirmAlert } from 'react-confirm-alert'
import { modal } from './../../global/modal'
import { 
    // handleChange, 
    initial 
} from './../../../redux-modules/modules/listOnlineExam'

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
            subject_id: props.match.params.subject_id
        }

        this.getData = this.getData.bind(this)
        this.detailClicked = this.detailClicked.bind(this)
        this.createQuestion = this.createQuestion.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
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

    createQuestion(e, assessment_id, name, subject_id) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/online-exam/' + assessment_id + '/subject/' + subject_id,
            state: { assessment_id: this.state.assessment_id, name: name, subject_id: subject_id }
        })
    }

    deleteExam(assessment_id, examId) {

        apiClient('delete', `v1/assessments/${assessment_id}/exams/${examId}`, false).then(res => {
            this.getData()
            modal({
                message: 'Berhasil',
                description: 'Soal berhasil di hapus',
                btns: [
                    {
                        label: 'Tutup',
                        className: 'btn green',
                    }
                ]
            })
        })
    }

    handleRemove(assessment_id, examId) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Yakin menghapus soal ujian ini? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={onClose}>Kembali</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => { this.deleteExam(assessment_id, examId); onClose(); }}>Yakin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    onQuestionDetail(e, assessment_id, exam_id) {
        this.props.history.push({
            pathname: `/all-question/${assessment_id}/assessment/${exam_id}/exam/`,
            state: { status: 'online' }
        })
    }

    getData(page) {
        let listOnlineExam = _.get(this.props, 'listOnlineExam', {})
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

        let url = 'v1/tests?'

        if (page) {
            url = 'v1/tests?' + '&page=' + page
        }

        apiClient('get', url, false, params).then(res => {
            console.log('params', params)
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
        this.props.initial()
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
                                    handleSubmit={this.handleSubmit}
                                />
                            </div>
                            <ContentOnlineExam
                                data={this.state.data}
                                loader={this.state.loader}
                                detailClicked={this.detailClicked}
                                create={this.createQuestion}
                                remove={this.handleRemove}
                                directQuestion={this.onQuestionDetail}
                                page={this.state.totalPages}
                                getData={this.getData}
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
    initial,    
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(OnlineExamList)