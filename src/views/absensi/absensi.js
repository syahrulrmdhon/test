import React, { Component } from 'react'
import './../../styles/absensi/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import ModalAbsensi from './modal'
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
      attendanceData: []
    };

    this.selectAttendanceType = this.selectAttendanceType.bind(this)
    this.selectClass = this.selectClass.bind(this)
    this.selectSubject = this.selectSubject.bind(this)
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
    this.handleAttendanceStatusChange = this.handleAttendanceStatusChange.bind(this)
  };
  

  componentDidMount() {
    this.getAttendanceType()
    this.getClass()
    console.log(localStorage.getItem('token'))
  }

  getAttendanceType() {
    const route = 'v1/filters/attendance_types'

    apiClient('get', route).then(response => {
      const data = response.data.data.attendance_types.map(({ key }) => ({ label: (key === 'homeroom' ? 'Absensi Harian' : 'Absensi Mata Pelajaran'), value: key }))
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
      const route = `v1/attendances/index?class_id=${this.state.selectedClass.value}`
      apiClient('get', route).then(response => {
        this.setState({students: response.data.data.user_attendances})
      })
    }
  }

  handleFilterSubmit() {
    const type = this.state.selectedAttendanceType.value
    this.getStudents(type)
  }

  notStudent() {
    if (!this.state.students) {
      return 'Mohon pilih filter untuk menampilkan data.'
    }
    else {
      return 'Data belum tersedia.'
    }
  }

  saveStudentAttendance() {
    const route = 'v1/attendances/bulk_update'

    const data = {
      "attendance_date": "2019-01-24",
      "attendance_type": "homeroom",
      "class_id": "47d8db8a-0d63-452f-a9dc-6dc24ee65680",
      "school_id": "af3dae6d-3f36-4a20-80d6-3ef6969d097e",
    }
    apiClient('post', route,)
  }

  handleSave() {
    // const attendanceData = this.state.attendanceData

    // this.
  }

  handleAttendanceStatusChange(event) {
    const userId = event.target.id
    const status = event.target.value
    const attendanceData = this.state.attendanceData
    
    let student = attendanceData.find(attendance => attendance.user_id === userId)

    if (!student) {
      student = {
        user_id: event.target.id,
        status: event.target.value
      }
      attendanceData.push(student)
    }
    else {
      student.status = status
    }
    this.setState({
      attendanceData: attendanceData
    })
  }

  render() {
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const dateNow = date.toLocaleDateString('id-ID', options)

    return (
      <div className="absensi">
        <Header></Header>
        <MenuBar></MenuBar>
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
                  />
                </div>
                <div className="col-9 center-content">
                <div className="row">
                    <div className="col-8">
                        <div className='date'>Tanggal {dateNow}</div>
                    </div>
                    <div className="col-4 input-container">
                        <input className="input-field" type="text" placeholder="Cari siswa disini..." name="search" />
                        <i className="fa fa-search icon"></i>
                    </div>
                </div>
                  {
                    (!this.state.students || this.state.students.length === 0) ?
                      <NotAvailable>{this.notStudent()}</NotAvailable>
                    :
                    <div>
                      <TableAbsensi 
                        students={this.state.students}
                        attendanceStatus={this.state.attendanceStatus}
                        handleOptionChange={this.handleAttendanceStatusChange}
                      />
                      <button type="submit" onClick={this.handleSubmit} className="btn-green float-right col-3">Simpan</button>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-2 right">
              <CardAbsensi />
            </div>
          </div>
        </div>
      </div >
    )
  }
}
