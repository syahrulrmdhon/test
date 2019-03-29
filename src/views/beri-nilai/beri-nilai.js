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
import { 
  getParticipant
} from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './../../components/Title'



class Nilai extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: [],
      activeMenu: 1,
      exam: {},
      exam_id: props.match.params.exam_id,
      class_id: props.match.params.class_id,
      assessment_id: props.match.params.assessment_id,
      category_id: props.match.params.category_id,
      participant_passed: {},
      participant_not_passed: [],
      questionEvaluations: [],
      competencySubjects: [],
      questionResults: [],
      examChart: [],
      collapce: '',
      data: [],
      prevPath: '',
      search: '',
      // Edited by Risky S.
      loader: true,
      valueOpt:''
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleNewScore = this.handleNewScore.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onSubmmit = this.onSubmmit.bind(this)
    this.onChangeScore = this.onChangeScore.bind(this)
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
        data: res.data.data,
        score: res.data.data.participants,
        exam: res.data.data.exam,
        participant_passed: res.data.data.participants.passed,
        participant_not_passed: res.data.data.participants.not_passed,
        // Edited by Risky S.
        loader: false
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

  onChangeSelect(e) {
    this.setState({
      search: e.target.value
    })
    this.props.getParticipant(this.state.exam_id, this.state.class_id, this.state.asssessment_id, e.target.value,'')

  }

  onChangeScore(valueOpt){
    this.props.getParticipant(this.state.exam_id, this.state.class_id, this.state.assessment_id, '', valueOpt)
    this.setState({ valueOpt })
  }

  handleNewScore(e, student) {
    e.preventDefault()
    let data = 'ac67857a-ad71-4a97-9718-c71c47e2e4bc'
    this.props.history.push({
      pathname: '/assessment/' + this.state.assessment_id + '/exam/' + this.state.exam_id + '/class/' + this.state.class_id + '/student/' + student,
      state: { data: data, conditon: this.state.category_id }
    })
  }

  onSubmmit() {
    this.props.getParticipant(this.state.exam_id, this.state.class_id, this.state.asssessment_id, this.state.search,'')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }
  render() {
    const tabMenu = [
      {
        label: 'Perolehan Nilai',
        categories: ['knowledge', 'skill'],
      }, 
      { 
        label: 'Evaluasi Soal',
        categories: ['knowledge'],
      }, 
    ];
    let path = `/exam/${this.state.assessment_id}`
    let show_tab_2 = ''

    if(this.props.match.params.category_id === 'knowledge'){
      show_tab_2 = <TabPane tabId={2}>
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
          <div className="col-md-9">
            <div className="content-block-evaluasi main-block-evaluasi">
              <BottomContentEvaluasi
                questionEvaluations={this.state.questionEvaluations}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="content-block-card main-block-card">
              <SubjectEvaluasi
                competencySubjects={this.state.competencySubjects}
              />
            </div>
          </div>
        </div>
      </TabPane>;
    }
    
    return (
      <Page title="Detail Score">
        <div className="details-nilai bg-grey">
          <Header navbar={false} location={path} />
          <div className="content-wrapper content-wrap-custom-size ">
            <div className="row detail-menu">
              <div className="offset-2 col-sm-10 tab-menu tab-position">
                <TabMenu
                  menu={tabMenu}
                  assessment_category={this.props.match.params.category_id}
                  activeMenu={this.state.activeMenu}
                  toggle={this.toggleMenu}
                />
              </div>
            </div>
            <TabContent activeTab={this.state.activeMenu}  >
              <TabPane tabId={1} >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="content-block main-block main-height">
                      <TopContent
                        chart={this.state.score.score_ranges}
                        exam={this.state.exam}
                        participant_passed={this.state.participant_passed}
                        data={this.state.score}
                        participant_not_passed={this.state.participant_not_passed}
                      />
                    </div>
                  </div>
                </div>
                <div className="row margin-top-4  right-height padding-bottom-6">
                  <div className="col-sm-9">
                    <div className="content-block main-block ">
                      <BottomContent
                        exam={this.state.exam_id}
                        class={this.state.class_id}
                        asssessment_id={this.state.assessment_id}
                        category={this.props.match.params.category_id}
                        handleNewScoreParent={this.handleNewScore}
                        search={this.state.search}
                        onChange={this.onChangeSelect}
                        submit={this.onSubmmit}
                        valueOpt={this.state.valueOpt}
                        onChangeScore={this.onChangeScore}   
                        //Edited by Risky S.  
                        loader={this.state.loader}              
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 ">
                    <div className="content-block main-block right-height-kkm">
                      <RightContent
                        participant_not_passed={this.state.participant_not_passed}
                        data={this.state.data}
                      />
                    </div>
                  </div>
                </div>
              </TabPane>
              {show_tab_2}
            </TabContent>
          </div>
        </div>
      </Page>
    )
  }
}


const mapStateToProps = state => ({
  user: state.score,
  assessment: state.assessment,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
  getParticipant ,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Nilai);

