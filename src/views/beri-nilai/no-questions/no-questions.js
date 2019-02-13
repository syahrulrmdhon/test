import React, { Component } from 'react'
import Header from './../../global/header'
import { apiClient } from './../../../utils/apiClient'
import Tab from './tab'
import TopContentNoQuestions from './top-content-no-questions'
import BottomContentNoQuestions from './bottom-content-no-questions'
import KkmNoQuestions from './kkm-no-questions'
import { TabContent, TabPane } from 'reactstrap'

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
            data: [],
            totalAverages: [],
            selectIndex: -1,
            hidden: true,
            key:'',
            dataChildSubject: [],
            dataChildCompentency: [],
        }

        this.handleClickQuestion = this.handleClickQuestion.bind(this)
    }
    componentDidMount() {
        this.getDataResults()
        this.getData()
    }
    handleClickQuestion(e, id, name) {
        e.preventDefault()
        this.props.history.push({
            pathname: /questions/ + id, state: { fullname: name }
        })
    }
    handleClick(e, id, idx) {
        e.preventDefault()
        let subject = []
        let competency = []
        let hidden = true
        this.state.data.participants.map((value,i)=>{
            this.setState({
                users: value.user,
                scores: value.scores
            })
        })
        let dataArray = this.state.users && this.state.scores && this.state.data
        let filtering = dataArray.filter(item => item.users.id === id)
        filtering.map((x) => {
            subject = x.scores.subject_averages
            competency = x.scores.competency_averages
        })
        if (this.state.hidden === true) {
            hidden = false;
        } else {
            hidden = true;
        }

        this.setState({
            hidden: hidden[1],
            key: 1,
            dataChildSubject: subject,
            selectIndex: (this.state.selectIndex === idx ? -1 : idx),
            dataChildCompentency: competency
        })

    }
    getDataResults() {
        let assessment_id = '6ae41268-d737-4a87-bb54-1a9cfd1d69f8'
        let exam_id = 'b4aa7bda-f96d-4665-8dc3-fe263ed670ed'
        let exam_classes_id = '1a5e496b-ffc4-445f-93b4-ef324e80e31c'
        const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/${exam_classes_id}/participant_results`

        apiClient('get', url).then(res => {
            let dataParticipants = res.data.data.participants
            this.setState({
                dataChart: dataParticipants.score_ranges,
                dataPassed: dataParticipants.passed,
                dataNotPassed: dataParticipants.not_passed
            })
        })
    }
    getData() {
        let assessment_id = '6ae41268-d737-4a87-bb54-1a9cfd1d69f8'
        let exam_id = 'b4aa7bda-f96d-4665-8dc3-fe263ed670ed'
        let exam_classes_id = '1a5e496b-ffc4-445f-93b4-ef324e80e31c'
        const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/${exam_classes_id}/participants`

        apiClient('get', url).then(res => {
            this.setState({
                data: res.data.data.participants
            })
        })
    }
    render() {
        const tabMenu = ['Perolehan Nilai'];
        return (
            <div className="details-nilai bg-grey">
                <Header navbar={false} />
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
                                    <div className="content-block-evaluasi main-block-evaluasi">
                                        <div className="padding-4">
                                            <TopContentNoQuestions
                                                chart={this.state.dataChart}
                                                passed={this.state.dataPassed.length}
                                                notPassed={this.state.dataNotPassed.length}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row margin-top-2">
                                <div className="col-sm-9">
                                    <div className="content-block-evaluasi main-block-evaluasi">
                                        <BottomContentNoQuestions
                                            data={this.state.data}
                                            handleClickQuestion={this.handleClickQuestion}
                                            selectIndex={this.state.selectIndex}
                                            handleClick={this.handleClick}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="content-block-card main-block-card">
                                        <KkmNoQuestions notPassed={this.state.dataNotPassed} />
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}
