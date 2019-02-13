import React, { Component } from 'react';
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import TopContent from './top-content'
import TopContentEvaluasi from './evaluasi/top-content-evaluasi'
import BottomContent from './bottom-content'
import { TabContent, TabPane } from 'reactstrap'
import BottomContentEvaluasi from './evaluasi/bottom-content-evaluasi'
import { apiClient } from '../../utils/apiClient'
import RightContent from './right-content'
import SubjectEvaluasi from './evaluasi/subject-evaluasi';
export default class Nilai extends Component {
  constructor(props) {
    super(props)


    this.state = {
      score: [],
      activeMenu: 1,
      exam: {},
      exam_id: props.match.params.exam_id,
      class_id: props.match.params.class_id,
      assessment_id: props.match.params.assessment_id,
      participant_passed: {},
      participant_not_passed: [],
      questionEvaluations: [],
      competencySubjects: [],
      questionResults: [],
      examChart: [],
      collapce: ''
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleNewScore = this.handleNewScore.bind(this)
  }
  componentDidMount() {

    this.getQuestionsResults()
    this.getQuestions()
    this.fetchData()

  }
  toggleMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      })
    }
  }

  fetchData() {
    let url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/${this.state.class_id}/participant_results`
    apiClient('get', url).then(res => {
      this.setState({
        score: res.data.data.participants,
        exam: res.data.data.exam,
        participant_passed: res.data.data.participants.passed,
        participant_not_passed: res.data.data.participants.not_passed
      })
    })
      .catch(err => {
        let response = err.response
        let data = response.data

      })

  }
  getQuestionsResults() {
    const url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/${this.state.class_id}/question_results`

    apiClient('get', url).then(res => {
      this.setState({
        questionResults: res.data.data.unmanaged,
        examChart: res.data.data.exam_charts
      })
    })
  }
  getQuestions() {
    const url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}/exam_classes/${this.state.class_id}/questions`

    apiClient('get', url).then(res => {
      this.setState({
        competencySubjects: res.data.data.subject_competencies,
        questionEvaluations: res.data.data.exam_questions
      })

    })
  }

  handleNewScore(e, student) {
    e.preventDefault()
    // let collapce = this.state.collapce
    // if(collapce === ''){
    //     this.setState({
    //         collapce:'collapce'
    //     })
    // }else{
    //     this.setState({
    //         collapce:''
    //     })
    // }
    let data = 'ac67857a-ad71-4a97-9718-c71c47e2e4bc'

    this.props.history.push({
      pathname: '/assessment/' + this.state.assessment_id + '/exam/' + this.state.exam_id + '/class/' + this.state.class_id + '/student/' + student,
      state: { data: data }
    })
  }

  render() {
    const tabMenu = ['Perolehan Nilai', 'Evaluasi Soal'];
    return (
      <div className="details-nilai bg-grey">
        <Header navbar={false} />
        <div className="content-wrapper content-wrap-custom-size ">
          <div className="row detail-menu">
            <div className="offset-2 col-sm-10 tab-menu tab-position">
              <TabMenu
                menu={tabMenu}
                activeMenu={this.state.activeMenu}
                toggle={this.toggleMenu}
              />
            </div>
          </div>
          <TabContent activeTab={this.state.activeMenu}>
            <TabPane tabId={1} >
              <div className="row">
                <div className="col-sm-12">
                  <div className="content-block main-block main-height">
                    <TopContent
                      chart={this.state.score.score_ranges}
                      exam={this.state.exam}
                      participant_passed={this.state.participant_passed}
                      participant_not_passed={this.state.participant_not_passed}
                    />
                  </div>
                </div>
              </div>
              <div className="row margin-top-4 padding-bottom-6 ">
                <div className="col-sm-9">
                  <div className="content-block main-block">
                    <BottomContent
                      exam={this.state.exam_id}
                      class={this.state.class_id}
                      asssessment={this.state.assessment_id}
                      handleNewScoreParent={this.handleNewScore}
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="content-block main-block padding-5  ">
                    <RightContent
                      participant_not_passed={this.state.participant_not_passed}
                    />
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tabId={2}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="content-block-evaluasi main-block-evaluasi">
                    <div className="padding-4">
                      <TopContentEvaluasi
                        questionResults={this.state.questionResults}
                        examChart={this.state.examChart}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row margin-top-2">
                <div className="col-sm-9">
                  <div className="content-block-evaluasi main-block-evaluasi">
                    <BottomContentEvaluasi
                      questionEvaluations={this.state.questionEvaluations}
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="content-block-evaluasi main-block-evaluasi">
                    <SubjectEvaluasi
                      competencySubjects={this.state.competencySubjects}
                    />
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


