import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'

import AbsenceTable from './AbsenceTable'
import HomeroomTeacher from './HomeroomTeacher'
import LeftSide from '../LeftSide/LeftSide'
import Profile from './ProfileDetail'
import RightSide from '../RightSide/RightSide'
import ScoreTable from './ScoreTable'
import Tab from '../TabContent/TabContent'
import Axios from 'axios'

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      homeroomTeacherActiveTab: 1,
      startDate: null,
      endDate: null,
      knowledgeScore: null,
      skillScore: null,
      attitudeScore: null,
      subjects: null,
      attendanceStatus: null
    }

    this.schoolId = localStorage.getItem("school_list")
    this.token = localStorage.getItem("token")
    this.authorization = `Bearer ${this.token}`
    this.baseUrl = `${process.env.API_URL}v1/students/${this.props.studentId}`
    this.toggle = this.toggle.bind(this)
    this.homeroomTeacherTab = this.homeroomTeacherTab.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.getKnowledgeScore = this.getKnowledgeScore.bind(this)
    this.getSkillScore = this.getSkillScore.bind(this)
    this.getAttitudeScore = this.getAttitudeScore.bind(this)
    this.getFilterSubject = this.getFilterSubject.bind(this)
    this.getFilterAttendanceStatus = this.getFilterAttendanceStatus.bind(this)
    this.getAttandanceDetail = this.getAttandanceDetail.bind(this)
  }

  componentDidMount() {
    if (this.state.activeTab === 1) {
      this.getKnowledgeScore()
    }
    this.getAttandanceDetail()
  }

  homeroomTeacherTab(tab) {
    if (this.state.homeroomTeacherActiveTab !== tab) {
      this.setState({
        homeroomTeacherActiveTab: tab
      })
    }
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (nextState.activeTab !== this.state.activeTab) {
      if (this.state.activeTab === 2 && !this.state.skillScore) {
        this.getSkillScore()
      }
      else if (this.state.activeTab === 3 && !this.state.attitudeScore) {
          this.getAttitudeScore()
      }
    }
    if (prevProps.activeTab !== this.props.activeTab) {
      if (this.props.activeTab === 2 && !this.state.subjects && !this.state.attendanceStatus) {
        this.getFilterSubject()
        this.getFilterAttendanceStatus()
      }
    }
  }

  getKnowledgeScore() {
    const url = `${this.baseUrl}/score_recap?school_id=${localStorage.getItem("school_list")}&category=knowledge`
    
    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({ knowledgeScore: response.data.data })
    })
  }

  getSkillScore() {
    const url = `${this.baseUrl}/score_recap?school_id=${localStorage.getItem("school_list")}&category=skill`

    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({ skillScore: response.data.data })
    })
  }

  getAttitudeScore() {
    const url = `${this.baseUrl}/score_recap?school_id=${localStorage.getItem("school_list")}&category=attitude`

    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({attitudeScore: response.data.data})
    })
  }

  getFilterSubject() {
    const url = `${process.env.API_URL}v1/filters/subjects?school_id=${this.schoolId}`
    
    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({subjects: response.data.data.subjects})
    })
  }

  getFilterAttendanceStatus() {
    const url = `${process.env.API_URL}v1/filters/attendance_status?school_id=${this.schoolId}`
    
    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({attendanceStatus: response.data.data.attendance_status})
    })
  }

  getAttandanceDetail() {
    const url = `${process.env.API_URL}v1/attendances/${this.schoolId}/full_detail?school_id=${this.schoolId}&attendance_type=homeroom`
    console.log(url)
    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({attendanceStatus: response.data.data.attendance_status})
      // console.log(response)
    })
  }

  render() {
    const tabScore = ['Pengetahuan', 'Keterampilan', 'Sikap'];
    const tabHomeRoom = ['Catatan Wali Kelas', 'Estrakurikuler', 'Prestasi']

    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane tabId={1}>
            <div className="row rounded-10">
              <LeftSide>
                <Profile dataProfile={this.props.dataProfile} />
              </LeftSide>
              <RightSide>
                <Tab
                  tab={tabScore}
                  className="total-score"
                  toggle={this.toggle}
                  activeTab={this.state.activeTab} />
                <ScoreTable
                  activeTab={this.state.activeTab}
                  knowledgeScore={this.state.knowledgeScore}
                  skillScore={this.state.skillScore}
                  attitudeScore={this.state.attitudeScore} />
              </RightSide>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="row rounded-10 absences-detail">
              <LeftSide>
                <div className="absences-detail__title">
                  Rekapitulasi Absensi
                  </div>
                <Form className="absences-detail__form-date">
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Dari Tanggal</Label>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStartDate}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Sampai Tanggal</Label>
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                </Form>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Hadir</div>
                  <div className="absences-detail__amount">39</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Sakit</div>
                  <div className="absences-detail__amount">2</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Izin</div>
                  <div className="absences-detail__amount">1</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Alpha</div>
                  <div className="absences-detail__amount">7</div>
                </div>
              </LeftSide>
              <RightSide>
                <Form inline className="absences-detail__form-date">
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Status</Label>
                    <Input className="absences-detail__select" type="select">
                      <option>Semua Status</option>
                      {
                        this.state.attendanceStatus &&
                        this.state.attendanceStatus.map((status, index) => {
                          if (status.key !== 'present' && status.key !== 'late'){    
                            return <option key={index}>{status.value}</option>
                          }
                        })
                      }
                    </Input>
                    <i className="absences-detail__angle-down fa fa-angle-down"></i>
                  </FormGroup>
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Mata Pelajaran</Label>
                    <Input className="absences-detail__select" type="select">
                      <option>Pilih Mata Pelajaran</option>
                      {
                        this.state.subjects &&
                        this.state.subjects.map((subject, index) => {
                          return <option key={index}>{subject.subject_name}</option>
                        })
                      }
                    </Input>
                    <i className="absences-detail__angle-down fa fa-angle-down"></i>
                  </FormGroup>
                </Form>
                <AbsenceTable />
              </RightSide>
            </div>
          </TabPane>
          <TabPane tabId={3}>
            <div className="row rounded-10 homeroom-teacher">
              <LeftSide>
                <Profile dataProfile={this.props.dataProfile} />
              </LeftSide>
              <RightSide>
                <Tab
                  tab={tabHomeRoom}
                  className="total-score"
                  toggle={this.homeroomTeacherTab}
                  activeTab={this.state.homeroomTeacherActiveTab} />
                <HomeroomTeacher activeTab={this.state.homeroomTeacherActiveTab} />
              </RightSide>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
