import React, { Component } from 'react'
import './../../styles/absensi/absensi.scss'

import Header from '../global/header'
import CardAbsensi from './card'
import TableAbsensi from './table'
import FilterAbsensi from './filter'
import { apiClient } from '../../utils/apiClient'
import { NotAvailable } from '../../views/global/notAvailable'
import { getDate } from '../../utils/common'
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
    };

    this.selectAttendanceType = this.selectAttendanceType.bind(this)
    this.selectClass = this.selectClass.bind(this)
    this.selectSubject = this.selectSubject.bind(this)
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
    this.handleAttendanceStatusChange = this.handleAttendanceStatusChange.bind(this)
    this.saveStudentAttendance = this.saveStudentAttendance.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
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

  getStudents(type) {
    if (type === 'homeroom') {
      const date = getDate('case-4', this.state.selectedDate)
      const route = `v1/attendances/index?class_id=${this.state.selectedClass.value}&attendance_date=${date}`

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

  handleFilterSubmit() {
    const type = this.state.selectedAttendanceType.value
    this.getStudents(type)
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

    apiClient('post', route, data)
  }

  handleAttendanceStatusChange(event) {
    const userId = event.target.id
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

  render() {

    return (

      <div className="absensi padding-content">
        <Header />
        <div className="content">
          <div className="row">
            <div className="col-lg-10 bg-white">
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
                <div className="row">
                    <div className="col-8">
                        <div className='date'>Tanggal {getDate('case-1', this.state.selectedDate)}</div>
                    </div>
                    <div className="col-4 input-container">
                        <input className="input-field" type="text" placeholder="Cari siswa disini..." name="search" />
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
                        attendanceStatus={this.state.attendanceStatus}
                        handleOptionChange={this.handleAttendanceStatusChange}
                      />
                      <button type="submit" onClick={this.saveStudentAttendance} className="btn-green float-right col-3">Simpan</button>
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
