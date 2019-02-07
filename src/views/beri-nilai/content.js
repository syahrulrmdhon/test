import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import { apiClient } from '../../utils/apiClient'

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      homeroomActiveTab: 1,
      startDate: null,
      endDate: null,
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

  handleCreateHomeroomNote() {
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
  
  addExtracurricularNote() {
    this.setState({extracurricularNotes: [...this.state.extracurricularNotes, '']})
  }

  handleChange(event, index) {
    this.state.extracurricularNotes[index] = event.target.value
    this.setState({extracurricularNotes:this.state.extracurricularNotes})
  }

  render() {
    const tabScore = ['Pengetahuan', 'Keterampilan', 'Sikap'];
    const tabHomeRoom = ['Catatan Wali Kelas', 'Estrakurikuler', 'Prestasi']
    
    const attendances = this.state.attendanceDetail.attendances

    return (
      <div className="bg-white margin-top-8 container-fluid container-fluid-custom rounded-corners">
            <div className="row rounded-10">
              <LeftSide>
                <Profile dataProfile={this.props.dataProfile} />
              </LeftSide>
              <div className="right-content-score">
                    <div className="right-content-score__title">
                      Masukan Nilai
                    </div>
                    <div>
                        <div className="table-responsive">
                            <table className="table score">
                                 <thead  className="right-content-score__table-head">
                                        <th>No</th>
                                        <th>Tipe Soal</th>
                                        <th>Jawaban Soal</th>
                                        <th>Skor</th>
                                        <th>Bobot</th>

                                 </thead>
                            </table>
                        </div>
                    </div>
              </div>
            
            </div>
      </div>
    )
  }
}
