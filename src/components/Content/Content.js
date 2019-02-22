import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'

import AbsenceTable from './AbsenceTable'
import Homeroom from './Homeroom'
import LeftSide from '../LeftSide/LeftSide'
import Profile from './ProfileDetail'
import RightSide from '../RightSide/RightSide'
import ScoreTable from './ScoreTable'
import Tab from '../TabContent/TabContent'
import { apiClient } from '../../utils/apiClient'
import { modal } from './../../views/global/modal'


export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      homeroomActiveTab: 1,
      dateFilter: {
        startDate: null,
        endDate: null
      },
      knowledgeScore: null,
      skillScore: null,
      attitudeScore: null,
      subjects: null,
      attendanceStatus: null,
      attendanceDetail: {
        attendances: {
          results: {
            entries: []
          },
          present: null,
          abstain: null,
          sick: null,
          permission: null
        }
      },
      disable: true,
      inputHomeroomNote: '',
      homeroomNote: '',
      extracurriculars: [],
      extracurricularNotes: [{description: ''}],
      achievements: []
    }

    this.baseUrl = `${process.env.API_URL}v1/students/${this.props.studentId}`
    this.toggle = this.toggle.bind(this)
    this.homeroomTab = this.homeroomTab.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.getKnowledgeScore = this.getKnowledgeScore.bind(this)
    this.getSkillScore = this.getSkillScore.bind(this)
    this.getAttitudeScore = this.getAttitudeScore.bind(this)
    this.getFilterSubject = this.getFilterSubject.bind(this)
    this.getFilterAttendanceStatus = this.getFilterAttendanceStatus.bind(this)
    this.getAttendanceDetail = this.getAttendanceDetail.bind(this)
    this.handleCreateHomeroomNote = this.handleCreateHomeroomNote.bind(this)
    this.noteChangeHandler = this.noteChangeHandler.bind(this)
    this.getHomeroomNote = this.getHomeroomNote.bind(this)
    this.changeExtracurricularNote = this.changeExtracurricularNote.bind(this)
    this.handleDateFilter = this.handleDateFilter.bind(this)
    this.achievementChangeHandler = this.achievementChangeHandler.bind(this)
    this.handleBulkUpdate = this.handleBulkUpdate.bind(this)
  }

  componentDidMount() {
    if (this.state.activeTab === 1) {
      this.getKnowledgeScore()
    }
  }

  homeroomTab(tab) {
    if (this.state.homeroomActiveTab !== tab) {
      this.setState({
        homeroomActiveTab: 1
      })
    }
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

        if (nextState.attendanceDetail === this.state.attendanceDetail) {
          this.getAttendanceDetail()      
        }
      }
      else if (this.props.activeTab === 3) {
        if (!this.state.inputHomeroomNote.length) {
          this.getHomeroomNote()
        }
      }
    }
    if (nextState.homeroomActiveTab !== this.state.homeroomActiveTab) {
      if (this.state.homeroomActiveTab === 2 && !this.state.extracurriculars.length) {
        this.getFilterExtracurricular()
        this.getExtracurricularNote()
      }
      else if (this.state.homeroomActiveTab === 3 && !this.state.achievements.length) {
        this.getAchievementNote()
      }
    }
  }

  getKnowledgeScore() {
    const url = `v1/students/${this.props.studentId}/score_recap?category=knowledge`
    
    apiClient('get', url).then(response => {
      this.setState({knowledgeScore: response.data.data})
    })
  }

  getSkillScore() {
    const url = `v1/students/${this.props.studentId}/score_recap?category=skill`

    apiClient('get', url).then(response => {
      this.setState({ skillScore: response.data.data })
    })
  }

  getAttitudeScore() {
    const url = `v1/students/${this.props.studentId}/score_recap?category=attitude`

    apiClient('get', url).then(response => {
      this.setState({attitudeScore: response.data.data})
    })
  }

  getFilterSubject() {
    const url = `v1/filters/subjects`

    apiClient('get', url).then(response => {
      this.setState({subjects: response.data.data.subjects})
    })
  }

  getFilterAttendanceStatus() {
    const url = `v1/filters/attendance_status`
    
    apiClient('get', url).then(response => {
      this.setState({attendanceStatus: response.data.data.attendance_status})
    })
  }

  getFilterExtracurricular() {
    const url = `v1/filters/extracurriculars`

    apiClient('get', url).then(response => {
      this.setState({extracurriculars: response.data.data.extracurriculars})
    })
  }

  getAttendanceDetail() {
    const url = `v1/students/${this.props.studentId}/attendance_recap/`
    
    apiClient('get', url).then(response => {
      this.setState({attendanceDetail: response.data.data})
    })
  }

  getHomeroomNote() {
    const url = `v1/students/${this.props.studentId}/teacher_notes?achievement_type=final_result`

    apiClient('get', url).then(response => {
      this.setState({inputHomeroomNote: response.data.data.notes})
    })
  }
  
  getExtracurricularNote() {
    const url = `v1/students/${this.props.studentId}/teacher_notes?achievement_type=extracurricular`

    apiClient('get', url).then(response => {
      this.setState({extracurricularNotes: response.data.data.notes})
    })
  }

  getAchievementNote() {
    const url = `v1/students/${this.props.studentId}/teacher_notes?achievement_type=daily_result`

    apiClient('get', url).then(response => {
      this.setState({achievements: response.data.data.notes})
    })
  }

  handleCreateHomeroomNote() {
    const url = `v1/students/${this.props.studentId}/create_notes`
    const data = {
      "achievement_type": "final_result",
      "user_achievement": {
        "user_id": this.props.studentId,
        "description": this.state.inputHomeroomNote,
        "achievement_type": "final_result"
      }
    }

    apiClient('post', url, data).then(response => {
        this.setState({disable: true})
        modal({
          message: 'Berhasil',
          description: `Catatan berhasil disimpan`,
          btns: [
            {
              label: 'Selesai',
              className: 'btn green',
            }
          ]
        })
    })
  }
  
  noteChangeHandler(event) {
    const inputUser = event.target.value
    
    if (inputUser.length) {
      this.setState({disable: false})
    }
    else {
      this.setState({disable: true})
    }

    this.setState({inputHomeroomNote: inputUser})
  }
  

  changeExtracurricularNote(event, id) {
    const noteIndex = this.state.extracurricularNotes.findIndex(note => {
      return note.id === id;
    });

    const note = {
      ...this.state.extracurricularNotes[noteIndex]
    };

    note.description = event.target.value;

    const notes = [...this.state.extracurricularNotes];

    notes[noteIndex] = note;

    this.setState({
      extracurricularNotes: notes
    })
  }

  handleCreateExtracurricularNote(){
    const url = `v1/students/${this.props.studentId}/create_notes`
    const data = {
      "achievement_type": "final_result",
      "user_achievement": {
        "user_id": this.props.studentId,
        "description": this.state.inputHomeroomNote
      }
    }

    apiClient('post', url, data).then(response => {
        this.setState({disable: true})
    })
  }

  achievementChangeHandler(event, id, field) {
    const noteIndex = this.state.achievements.findIndex(note => {
      return note.id === id;
    });

    const note = {
      ...this.state.achievements[noteIndex]
    };

    note[field] = event.target.value;

    const notes = [...this.state.achievements];

    notes[noteIndex] = note;

    this.setState({
      achievements: notes
    })
  }
    // console.log(id)
    // let achievements = this.state.achievements
    // const achievement = achievements.find( achievement => achievement.id === id );
    // // console.log(achievement)
    // achievement.title = event.target.value
    // achievement.description = event.target.value


  // }
  
  handleBulkUpdate(type, note) {
    const url = `v1/students/${this.props.studentId}/bulk_update`
    const data = {
      "user_id": this.props.studentId,
      "achievement_type": type,
      "user_achievements": this.state[note]
    }
    apiClient('post', url, data).then(response => {
    })
  }

  addExtracurricularNote() {
    this.setState({extracurricularNotes: [...this.state.extracurricularNotes, '']})
  }

  handleChange(event, index) {
    this.state.extracurricularNotes[index] = event.target.value
    this.setState({extracurricularNotes:this.state.extracurricularNotes})
  }

  handleDateFilter(event, filter) {
    let data = this.state.dateFilter
    data[filter] = date
    this.setState({dateFilter: data})
    let dateFilter = this.state.date
    if (dateFilter.startDate && dateFilter.endDate) {
      
      const path = `v1/students/${this.props.studentId}/attendance_recap?date_start=${dateFilter.startDate}&date_end=${dateFilter.endDate}`
      apiClient('get', )
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



  render() {
    const tabScore = ['Pengetahuan', 'Keterampilan', 'Sikap'];
    const tabHomeRoom = ['Catatan Wali Kelas', 'Estrakurikuler', 'Prestasi']
    
    const attendances = this.state.attendanceDetail.attendances

    return (
      <div className="bg-white container-fluid container-fluid-custom rounded-corners">
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
                      selected={this.state.dateFilter.startDate}
                      // onChange={this.handleChangeStartDate}
                      onChange={(event) => this.handleDateFilter(event, 'startDate')}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Sampai Tanggal</Label>
                    <DatePicker
                      selected={this.state.dateFilter.endDate}
                      onChange={(event) => this.handleDateFilter(event, 'endDate')}
                      // onChange={this.handleChangeEndDate}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                </Form>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Hadir</div>
                  <div className="absences-detail__amount">{attendances.present !== null ? attendances.present : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Sakit</div>
                  <div className="absences-detail__amount">{attendances.sick !== null ? attendances.sick : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Izin</div>
                  <div className="absences-detail__amount">{attendances.permission ? attendances.permission : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Alpha</div>
                  <div className="absences-detail__amount">{attendances.abstain ? attendances.abstain : 0}</div>
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
                  <AbsenceTable attendances={this.state.attendanceDetail}/>
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
                  toggle={this.homeroomTab}
                  activeTab={this.state.homeroomActiveTab} />
                <Homeroom
                  activeTab={this.state.homeroomActiveTab}
                  clicked={this.handleCreateHomeroomNote} 
                  disabled={this.state.disable}
                  changed={(event) => this.noteChangeHandler(event)}
                  inputHomeroomNote={this.state.inputHomeroomNote}
                  extracurriculars={this.state.extracurriculars}
                  extracurricularNotes={this.state.extracurricularNotes}
                  changeExtracurricularNote={this.handleChange}
                  addExtracurricularNote={(event) => this.addExtracurricularNote(event)}
                  achievements={this.state.achievements}
                  changeAchievementNote={this.achievementChangeHandler}
                  saveAchievement={this.handleBulkUpdate} />
              </RightSide>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
