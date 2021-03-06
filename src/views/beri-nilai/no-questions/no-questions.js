import React, { Component } from 'react'
import Header from './../../global/header'
import { apiClient } from './../../../utils/apiClient'
import Tab from './tab'
import TopContentNoQuestions from './top-content-no-questions'
import BottomContentNoQuestions from './bottom-content-no-questions'
import KkmNoQuestions from './kkm-no-questions'
import { TabContent, TabPane } from 'reactstrap'
import Page from './../../../components/Title'

export default class NoQuestions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeMenu: 1,
            dataChart: [],
            dataPassed: [],
            dataNotPassed: [],
            users: {},
            scores: {},
            score: [],
            exam: {},
            participant_passed: {},
            participant_not_passed: [],
            data: [],
            selectedIndex: -1,
            hidden: true,
            key: '',
            dataChildSubject: [],
            dataChildCompetency: [],
            assessment_id: props.match.params.assessment_id,
            exam_id: props.match.params.exam_id,
            class_id: props.match.params.class_id,
            score_id: '',
            fullname: '',
            loader: true
        }

        this.handleNewScore = this.handleNewScore.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentDidMount() {
        this.getDataResults()
        this.fetchData()
    }
    handleNewScore(e, student) {
        this.props.history.push({
            pathname: '/questions/' + this.state.assessment_id + '/exam/' + this.state.exam_id + '/class/' + this.state.class_id + '/student/' + student,
            state: { data: this.state.score, assesment_id: this.state.assesment_id, exam_id: this.state.exam_id, class_id: this.state.class_id, student_id: student, fullname: full_name }
        })
    }
    onChangePage(e, student, class_id, full_name) {
        this.props.history.push({
            pathname: '/questions/' + this.state.assessment_id + '/exams/' + this.state.exam_id + '/student/' + student + '/' + class_id,
            state: { assessment: this.state.assessment_id, exam: this.state.exam_id, student: student, class_id: class_id, fullname: full_name }
        })
    }
    getDataResults() {
        const url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/${this.state.class_id}/participant_results`

        apiClient('get', url).then(res => {
            let dataParticipants = res.data.data.participants
            this.setState({
                dataChart: dataParticipants.score_ranges,
                dataPassed: dataParticipants.passed,
                dataNotPassed: dataParticipants.not_passed
            })
        })
    }
    fetchData() {
        let url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/${this.state.class_id}/participant_results`
        apiClient('get', url).then(res => {
            this.setState({
                score: res.data.data.participants,
                exam: res.data.data.exam,
                kkm: res.data.data.kkm,
                participant_passed: res.data.data.participants.passed,
                participant_not_passed: res.data.data.participants.not_passed,
                loader: false
            })
        })
            .catch(err => {
                let response = err.response
                let data = response.data

            })

    }
    render() {
        const tabMenu = ['Perolehan Nilai'];
        let path = `/exam/${this.state.assessment_id}`
        return (
            <Page title='Beri Nilai Tidak Buat Soal'>
                <div className="details-nilai bg-grey">
                    <Header navbar={false} location={path} />
                    <br />
                    <div className="content-wrapper content-wrap-custom-size">
                        <div className="row">
                            <div className="detail-menu">
                                <div className="offset-2 col-sm-10 tab-menu tab-position">
                                    <Tab menu={tabMenu} activeMenu={this.state.activeMenu} />
                                </div>
                            </div>
                        </div>
                        <TabContent activeTab={this.state.activeMenu}>
                            <TabPane tabId={1}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="content-block main-block main-height">
                                            <TopContentNoQuestions
                                                chart={this.state.dataChart}
                                                passed={this.state.dataPassed.length}
                                                notPassed={this.state.dataNotPassed.length}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row margin-top-4 right-height padding-bottom-6">
                                    <div className="col-sm-9">
                                        <div className="content-block main-block">
                                            <BottomContentNoQuestions
                                                exam={this.state.exam_id}
                                                class={this.state.class_id}
                                                asssessment={this.state.assessment_id}
                                                handleNewScoreParent={this.handleNewScore}
                                                page={this.onChangePage}
                                                loader= {this.state.loader}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="content-block main-block right-height-kkm">
                                            <KkmNoQuestions
                                                notPassed={this.state.dataNotPassed}
                                                kkm={this.state.kkm}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </Page>
        )
    }
}
