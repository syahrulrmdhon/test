import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'

import AbsenceTable from './AbsenceTable'
import Homeroom from './Homeroom'
import LeftSide from '../LeftSide/LeftSide'
import Profile from './ProfileDetail'
import RightSide from '../RightSide/RightSide'
import ScoreTable from './ScoreTable'
import AttendanceDetail from './AttendanceDetail'
import Tab from '../TabContent/TabContent'
import Avatar from './../../assets/images/img_avatar.png'
import { getDate } from '../../utils/common'
import { getData, getExtracurriculars, handleDisabled, getAttendances, getSubjects, getStatus, handleFilter} from '../../redux-modules/modules/studentDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { apiClient } from '../../utils/apiClient'
import { modal } from './../../views/global/modal'

class Content extends Component {
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
        homeroomActiveTab: tab
      })
    }
  }

  toggle(tab) {
    // let tabmenu = 1
    // if(tab === 1){
    //   tabmenu = 1
    // }else if(tab === 2) {
    //   tabmenu = 2
    // }

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
      if (this.props.activeTab === 2) {
        this.getFilterSubject()
        this.getFilterAttendanceStatus()
        this.getAttendanceDetail()
      }
      else if (this.props.activeTab === 3) {
        if (!this.state.inputHomeroomNote.length) {
          this.getHomeroomNote()
        }
      }
    }
    if (nextState.homeroomActiveTab !== this.state.homeroomActiveTab) {
      if (this.state.homeroomActiveTab === 2) {
        this.getFilterExtracurricular()
        this.getExtracurricularNote()
      }
      else if (this.state.homeroomActiveTab === 3) {
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
    this.props.getSubjects(this.props.dataProfile.user.homeroom_class.id, 'homeroom')
  }

  getFilterAttendanceStatus() {
    this.props.getStatus()
  }

  getFilterExtracurricular() {
    const url = `v1/filters/extracurriculars`

    apiClient('get', url).then(response => {
      this.setState({extracurriculars: response.data.data.extracurriculars})
    })
  }

  getAttendanceDetail() {
    this.props.getAttendances(this.props.studentId)
  }

  getHomeroomNote() {
    const url = `v1/students/${this.props.studentId}/teacher_notes?achievement_type=final_result`
    apiClient('get', url).then(response => {
      this.setState({inputHomeroomNote: response.data.data.notes})
    })
  }
  
  getExtracurricularNote() {
    this.props.getExtracurriculars()    
    this.props.getData(this.props.studentId, 'extracurricular')
  }

  getAchievementNote() {
    const url = `v1/students/${this.props.studentId}/teacher_notes?achievement_type=daily_result`
    this.props.getData(this.props.studentId, 'daily_result')
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

        description: 'Catatan berhasil disimpan',
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
  
  handleBulkUpdate(type, note, data) {
    const url = `v1/students/${this.props.studentId}/bulk_update`
    let request = {
      user_id: this.props.studentId,
      achievement_type: type,
      [note]: data
    }

    apiClient('post', url, request).then((response) => {
      this.props.handleDisabled()  

      modal({
        message: 'Berhasil',

        description: 'Catatan berhasil disimpan',
        btns: [
          {
            label: 'Selesai',
            className: 'btn green',
          }
        ]
      })
    })
  }

  addExtracurricularNote() {
    this.setState({extracurricularNotes: [...this.state.extracurricularNotes, '']})
  }

  handleChange(event, index) {
    this.state.extracurricularNotes[index] = event.target.value
    this.setState({extracurricularNotes:this.state.extracurricularNotes})
  }

  handleDateFilter(value, filter) {
    this.props.handleFilter(getDate('case-4', value), filter)
    const params = this.props.data.filter
    this.props.getAttendances(this.props.studentId, params) 
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
    const tabHomeRoom = ['Catatan Wali Kelas', 'Ekstrakurikuler', 'Prestasi']
    
    let recap = []
    if (this.props.data.attendances) {
      recap = this.props.data.attendances.attendances
    }

    return (
      <div className="bg-white container-fluid container-fluid-custom main-block">
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
                  attitudeScore={this.state.attitudeScore}
                  studentId={this.props.studentId}
                  redirect={this.props.redirect}/>
              </RightSide>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="row rounded-10 absences-detail">
              <LeftSide>
              <div>
                <div className="avatar-wrapper">
                  <img className="avatar" src={Avatar} alt="" />
                </div>
                <div className="mt-3 detail-name">
                  {this.props.dataProfile && this.props.dataProfile.user && this.props.dataProfile.user.full_name}
                </div>
              </div>
                <div className="absences-detail__title">
                  Rekapitulasi Absensi
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Hadir</div>
                  <div className="absences-detail__amount">{recap.present !== null ? recap.present : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Sakit</div>
                  <div className="absences-detail__amount">{recap.sick !== null ? recap.sick : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Izin</div>
                  <div className="absences-detail__amount">{recap.permission ? recap.permission : 0}</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Alpha</div>
                  <div className="absences-detail__amount">{recap.abstain ? recap.abstain : 0}</div>
                </div>
              </LeftSide>
              <RightSide>
                <AttendanceDetail
                  studentId={this.props.studentId} activeTab={this.props.activeTab} handleDateFilter={this.handleDateFilter}/>
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
                  saveAchievement={this.handleBulkUpdate}
                  studentId={this.props.studentId}/>
              </RightSide>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  data: state.studentDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getData,
    getExtracurriculars,
    handleDisabled,
    getStatus,
    getSubjects,
    getAttendances,
    handleFilter,
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Content)