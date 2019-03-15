import React, { Component } from 'react'
import './../../styles/score.scss'
import Header from '../global/header'
import FilterNilai from './filter'
import { apiClient } from '../../utils/apiClient'
import Page from './../../components/Title'
import Tab from './tab'
import NavToggle from './nav-toggle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class DaftarNilai extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      idClass: undefined,
      tableKnowledge: [],
      tableSkill: [],
      tableAttitude: [],
      disabled: false,

      // knowledge
      idxScores: 0,
      idxTugas: 0,

      // skill
      idxScoresSkill: 0
    }
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nameClicked = this.nameClicked.bind(this)
    this.getData = this.getData.bind(this)
  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      }, () => {this.getData()})
    }
  }

  getData(){
    let activeTab = this.state.activeTab

    let scoreList = _.get(this.props, 'scoreList', {})
    let selectedClass = scoreList ? scoreList.selectedClass : ''
    let selectedSemester = scoreList ? scoreList.selectedSemester : ''
    let selectedSubject = scoreList ? scoreList.selectedSubject : ''

    let params = {}

    let category = 'knowledge'
    switch(activeTab){
      case '2':
        category = 'skill'
        break;
      case '3':
        category = 'attitude'
        break;
    }

    if(category != ''){
      params['category'] = category
    }
    if(selectedSemester != ''){
      params['semester'] = selectedSemester
    }
    if(selectedClass != ''){
      params['class_id'] = selectedClass
    }
    if(selectedSubject != ''){
      params['school_subject_id'] = selectedSubject
    }
    
    apiClient('get', 'v1/scores/index', false, params).then(response => {
      const data = _.get(response, 'data.data', {})
      const { users, count } = data || []
      const { daily_exam, task } = count

      switch(category){
        case 'knowledge':
          this.setState({
            tableKnowledge: users,
            idxScores: daily_exam,
            idxTugas: task,
          })
        break;
        case 'skill':
          this.setState({
            tableSkill: users,
            idxScoresSkill: task,
          })
        break;
        case 'attitude':
          this.setState({
            tableAttitude: users,
          })
        break;
      }

    })
  }

  handleSubmit() {
    this.getData()
  }

  activeTabLoadData() {
    if (this.activeTab === '2') {
      let dataSkill = []
      let tableSkill = []
      this.getSkill().then(res => {
        dataSkill = res.data.data
        tableSkill = dataSkill.users
        this.setState({
          tableSkill: tableSkill,
          idxScoresSkill: dataSkill.count.task
        })
      })
    } else if (this.activeTab === '3') {
      let tableAttitude = []
      this.getAttitude().then(res => {
        tableAttitude = attitudes.data.data.users
        this.setState({
          tableAttitude: tableAttitude
        })
      })
    }
  }
  // handleSubmit() {
  //   let dataKnowledge = []
  //   let dataSkill = []
  //   let tableKnowledge = []
  //   let tableAttitude = []
  //   let tableSkill = []
  //   this.getKnowledge().then(res => {
  //     dataKnowledge = res.data.data
  //     tableKnowledge = res.data.data.users
  //     this.getAttitude().then(attitudes => {
  //       tableAttitude = attitudes.data.data.users
  //       this.getSkill().then(skills => {
  //         dataSkill = skills.data.data
  //         tableSkill = skills.data.data.users
  //         this.setState({
  //           tableKnowledge: tableKnowledge,
  //           tableAttitude: tableAttitude,
  //           tableSkill: tableSkill,
  //           idxScores: dataKnowledge.count.daily_exam,
  //           idxTugas: dataKnowledge.count.task,
  //           idxScoresSkill: dataSkill.count.task
  //         })
  //       })
  //     })
  //   })
  // }
  nameClicked(e, id) {
    e.preventDefault()
    this.props.history.push({
      pathname: 'detail/' + id,
      state: { status: 'daftar-nilai' }
    })
  }
  render() {
    return (
      <Page title="Daftar Nilai">
        <div className='row-score'>
          <div className='padding-content'>
            <Header />
            <div className='margin-content'>
              <div className='content-block main-block'>
                <div className='margin-0'>
                  <div className='col-sm-3 left-block'>
                    <FilterNilai
                      handleSubmit={this.handleSubmit}
                    />
                  </div>
                  <div className='col-sm-9 right-block w-100'>
                    <div className='padding-top-6 h-100'>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <label className='header-title'>Daftar Nilai</label>
                        </div>
                        <div className='col-sm-9'>
                          <NavToggle
                            activeTab={this.state.activeTab}
                            toggle={this.toggle}
                          />
                        </div>
                      </div>
                      <Tab
                        tableKnowledge={this.state.tableKnowledge}
                        idxScores={this.state.idxScores}
                        idxTugas={this.state.idxTugas}
                        tableSkill={this.state.tableSkill}
                        idxScoresSkill={this.state.idxScoresSkill}
                        tableAttitude={this.state.tableAttitude}
                        nameClicked={this.nameClicked}
                        activeTab={this.state.activeTab}
                      />
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

const mapStateToProps = (state) => ({
  scoreList: state.scoreList //noQuestion dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(DaftarNilai)