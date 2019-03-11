import React, { Component } from 'react'
import './../../styles/score.scss'
import Header from '../global/header'
import FilterNilai from './filter'
import { apiClient } from '../../utils/apiClient'
import Page from './../../components/Title'
import Tab from './tab'
import NavToggle from './nav-toggle'

export default class DaftarNilai extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      idClass: undefined,

      // filter
      listClass: [],
      selectedClass: '',
      listSemester: [],
      selectedSemester: '',
      listSubject: [],
      selectedSubject: '',
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
    this.getClassList = this.getClassList.bind(this)
    this.onChangeClass = this.onChangeClass.bind(this)
    this.getSemesterList = this.getSemesterList.bind(this)
    this.onChangeSemester = this.onChangeSemester.bind(this)
    this.getSubjectList = this.getSubjectList.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nameClicked = this.nameClicked.bind(this)
  }
  componentDidMount() {
    this.getSemesterList()
    this.getClassList()
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  getSemesterList() {
    const url = `v1/filters/semesters?`

    apiClient('get', url).then(res => {
      const data = res.data.data.semesters.map(({ period_name, id }) => ({
        label: period_name,
        value: id
      }))
      this.setState({
        listSemester: data
      })
    })
  }
  getClassList() {
    const url = `v1/filters/classes`

    apiClient('get', url).then(res => {
      const data = res.data.data.classes.map(({ id, name }) => ({
        label: name,
        value: id
      }))
      this.setState({
        listClass: data
      })
    })
  }
  getSubjectList(idClass) {
    let url = ''
    if (idClass === undefined) {
      url = `v1/filters/subjects?`
    } else {
      url = `v1/filters/subjects?class_id=${idClass}`
    }
    apiClient('get', url).then(res => {
      let subject = []
      for (var i in res.data.data) {
        const datum = res.data.data[i]
        datum.map(function (data, i) {
          subject.push({ value: data.id, label: data.subject_name })
        })
      }
      this.setState({
        listSubject: subject
      })
    })
  }
  onChangeSemester(selectedSemester) {
    this.setState({ selectedSemester })
  }
  onChangeClass(selectedClass) {
    this.setState({ selectedClass })
    const idClass = selectedClass.value
    this.getSubjectList(idClass)
  }
  onChangeSubject(selectedSubject) {
    this.setState({ selectedSubject })
  }
  getKnowledge() {
    let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=knowledge&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
    return apiClient('get', url)
  }
  getSkill() {
    let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=skill&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
    return apiClient('get', url)
  }
  getAttitude() {
    let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=attitude&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
    return apiClient('get', url)
  }
  handleSubmit() {
    let dataKnowledge = []
    let dataSkill = []
    let tableKnowledge = []
    let tableAttitude = []
    let tableSkill = []
    this.getKnowledge().then(res => {
      dataKnowledge = res.data.data
      tableKnowledge = res.data.data.users
      this.getAttitude().then(attitudes => {
        tableAttitude = attitudes.data.data.users
        this.getSkill().then(skills => {
          dataSkill = skills.data.data
          tableSkill = skills.data.data.users
          this.setState({
            tableKnowledge: tableKnowledge,
            tableAttitude: tableAttitude,
            tableSkill: tableSkill,
            idxScores: dataKnowledge.count.daily_exam,
            idxTugas: dataKnowledge.count.task,
            idxScoresSkill: dataSkill.count.task
          })
        })
      })
    })
  }
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
        <div className='padding-content h-100'>
          <Header />
          <div className='content'>
            <div className='row row-score'>
              <div className='left-content col-sm-2 col-lg-2'>
                <FilterNilai
                  listClass={this.state.listClass}
                  selectedClass={this.state.selectedClass}
                  listSemester={this.state.listSemester}
                  selectedSemester={this.state.selectedSemester}
                  listSubject={this.state.listSubject}
                  selectedSubject={this.state.selectedSubject}
                  onChangeClass={this.onChangeClass}
                  onChangeSemester={this.onChangeSemester}
                  onChangeSubject={this.onChangeSubject}
                  handleSubmit={this.handleSubmit}
                />
              </div>
              <div className='right-content col-sm-10 col-lg-10'>
                <div className='row margin-bottom-4'>
                  <div className='col-sm-3 col-lg-2'>
                    <h5 className='float-left margin-left-1 padding-top-1'>
                      <strong className='large-text'>Daftar Nilai</strong>
                    </h5>
                  </div>
                  <div className='col-sm-9 col-lg-10'>
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
                  nameClicked={this.nameClicked}
                  tableSkill={this.state.tableSkill}
                  idxScoresSkill={this.state.idxScoresSkill}
                  tableAttitude={this.state.tableAttitude}
                  activeTab={this.state.activeTab}
                />
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
