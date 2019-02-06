import React, { Component } from 'react'
import './../../styles/absensi/absensi.scss'

import Header from '../global/header'
import CardAbsensi from './card'
import TableAbsensi from './table'
import FilterAbsensi from './filter'
import { apiClient } from '../../utils/apiClient'
import { NotAvailable } from '../../views/global/notAvailable'
export default class Absensi extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      selectedAttendanceType: "",
      selectedClass: "",
      subjects: [],
      selectedSubject: "",
      attendanceTypes: [],
      classes: [],
      students: null,
      attended: '-',
      unattended: '-',
      percentage: '-',
      attendances: [],
      selectedDate: new Date(),
      searchName: '',
      searchAttendances: []
    };

    this.selectAttendanceType = this.selectAttendanceType.bind(this)
    this.selectClass = this.selectClass.bind(this)
    this.selectSubject = this.selectSubject.bind(this)
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
    this.handleAttendanceStatusChange = this.handleAttendanceStatusChange.bind(this)
    this.saveStudentAttendance = this.saveStudentAttendance.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  };
  
  componentDidMount() {
    this.getAttendanceType()
    this.getClass()
  }

  getAttendanceType() {
    const route = 'v1/filters/attendance_types'

    apiClient('get', route).then(response => {
      const data = response.data.data.attendance_types.map(({ key }) => ({
        label: (key === 'homeroom' ? 'Absensi Harian' : 'Absensi Mata Pelajaran'), value: key })
      )

      this.setState({ attendanceTypes: data })
    })
  }

  getClass() {
    const route = 'v1/filters/classes'

    apiClient('get', route).then(response => {
      const data = response.data.data.classes.map(({ id, name }) => ({ label: name, value: id }))
      this.setState({ classes: data })
    })
  }

  getSubject(classId) {
    let route = 'v1/filters/subjects/'

    if (classId) {
      route = `${route}?class_id=${classId}`
    }

    apiClient('get', route).then(response => {
      const data = response.data.data.subjects.map(({ id, subject_name }) => ({ label: subject_name, value: id }))
      this.setState({ subjects: data })
    })
  }

  selectAttendanceType(type) {
    this.setState({selectedAttendanceType: type})
  }

  selectClass(item) {
    this.setState({selectedClass: item})
    const classId = item.value
    this.getSubject(classId)
  }

  selectSubject(subject) {
    this.setState({selectedSubject: subject})
  }

  getAttendances(type, name) {
    if (type === 'homeroom') {
      const date = getDate('case-4', this.state.selectedDate)
      const route = `v1/attendances/index?class_id=${this.state.selectedClass.value}&attendance_date=${date}${name !== undefined ? '&full_name=' + name : ''}`

      apiClient('get', route).then(response => {
        const data = response.data
        let attendances = []

        data.data.user_attendances.map(student => {
          attendances.push({user_id: student.user.id, name: student.user.full_name, status: student.attendance.status})
        })

        this.setState({
          attendances: attendances,
          attended: data.data.attended,
          unattended: data.data.unattended,
          percentage: data.data.percentage
        })
      })
    }
  }

  reset() {
    this.setState({searchName: ''})
    this.setState({searchAttendances: []})
  }

  handleFilterSubmit() {
    const type = this.state.selectedAttendanceType.value
    this.reset()
    this.getAttendances(type)
  }

  notStudent() {
    if (!this.state.attendances) {
      return 'Mohon pilih filter untuk menampilkan data.'
    }
    else {
      return 'Data belum tersedia.'
    }
  }

  saveStudentAttendance() {
    const route = 'v1/attendances/bulk_update'
    const teacher = (localStorage.getItem('homeroom_class') !== null) ? 'homeroom' : null
    const date = getDate('case-4', this.state.selectedDate)
    const data = {
      "attendance_date": date,
      "attendance_type": teacher,
      "class_id": localStorage.getItem('class_id'),
      "school_id": localStorage.getItem('school_id'),
      "attendances": this.state.attendances
    }

    apiClient('post', route, data).then(() => {
      apiClient('get', `v1/attendances/index?class_id=${this.state.selectedClass.value}&attendance_date=${date}`)
      .then(response => {
        const data = response.data
        this.setState({
          attended: data.data.attended,
          unattended: data.data.unattended,
          percentage: data.data.percentage
        })
      })
    })
  }

  handleAttendanceStatusChange(event) {
    const userId = event.target.name
    const status = event.target.value

    const attendances = this.state.attendances
    const attendance = attendances.find(attendance => attendance.user_id === userId)
    attendance.status = status
    
    this.setState({
      attendances: attendances
    })
  }

  handleDateChange(date) {
    this.setState({selectedDate: date})
  }

  filterAttendances(filter){
    const data = this.state.attendances
    data = data.filter((item) =>  {
      return item.name.includes(filter);
    });
  }

  handleKeyPress(event) {
    const type = this.state.selectedAttendanceType.value
    let search = event.target.value
    const attendances = this.state.attendances
    this.setState({searchName: search})

    if (search) {
      search = search.toLowerCase()
      const attendances = this.state.attendances
      let data = attendances.filter((attendance) =>  {
        return attendance.name.toLowerCase().includes(event.target.value.toLowerCase());
      });

      if (data.length === 0) {
        this.setState({searchAttendances: null})
      }
      else {
        this.setState({searchAttendances: data})
      }
    }
    else {
      this.setState({searchAttendances: attendances})
    }
  }

  render() {
    return (
      <div className="absensi padding-content">
        <Header />
        <div className="content">
          <div className="row">
            <div className="col-lg-10 bg-white rounded-10">
              <div className="row">
                <div className="col-3 left-content">
                  <FilterAbsensi 
                    attendanceTypes={this.state.attendanceTypes}
                    selectAttendanceType={this.selectAttendanceType}
                    selectedAttendanceType={this.state.selectedAttendanceType}
                    classes={this.state.classes}
                    selectedClass={this.state.selectedClass}
                    selectClass={this.selectClass}
                    subjects={this.state.subjects}
                    selectedSubject={this.state.selectedSubject}
                    selectSubject={this.selectSubject}
                    handleFilterSubmit={this.handleFilterSubmit}
                    selectedDate={this.state.selectedDate}
                    handleDateChange={this.handleDateChange} />
                </div>
                <div className="col-9 center-content">
                  <div className="search-container">
                    <div className='date'>Tanggal {getDate('case-1', this.state.selectedDate)}</div>
                    <div className="search">
                      <input onChange={this.handleKeyPress} className="input-field" type="text" placeholder="Cari siswa disini..." name="search" value={this.state.searchName}/>
                      <i className="fa fa-search icon"></i>
                    </div>
                  </div>
                  {
                    (!this.state.attendances || this.state.attendances.length === 0) ?
                      <NotAvailable>{this.notStudent()}</NotAvailable>
                    :
                    <div>
                      <TableAbsensi 
                        attendances={this.state.attendances}
                        searchAttendances={this.state.searchAttendances}
                        attendanceStatus={this.state.attendanceStatus}
                        handleOptionChange={this.handleAttendanceStatusChange} />
                      <button type="submit" onClick={this.saveStudentAttendance} className="btn-green float-right col-3 save">Simpan</button>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-2 right">
              <CardAbsensi 
                attended={this.state.attended}
                unattended={this.state.unattended}
                percentage={this.state.percentage} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
