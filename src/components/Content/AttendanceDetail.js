import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSubjects, getStatus, handleFilter, getAttendances } from './../../redux-modules/modules/studentDetail'
import { Table } from 'reactstrap'
import { getDate } from '../../utils/common'
import { NotAvailable } from '../../views/global/notAvailable'

import Select from 'react-select'

class AttendanceDetail extends Component {
  constructor(props) {
    super()
    this.filterAttendances = this.filterAttendances.bind(this)
  }

  filterAttendances(event, filter) {
    this.props.handleFilter(event, filter)
    const params = this.props.attendanceDetail.filter
    
    this.props.getAttendances(this.props.studentId, params) 
  }

  render() {
    let homeroomId = JSON.parse(localStorage.getItem("homeroom_class")).id
    let data = this.props.attendanceDetail
    let attendances = []
    if (data.attendances) {
      if (data.attendances.attendances.results.entries.length) {
        attendances = 
        (
          <div className="table-content">
        <div>
          <Table className="absences-detail__table" bordered striped responsive>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jam Pelajaran</th>
                <th>Mata Pelajaran</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
              data.attendances.attendances.results.entries.map( (attendance, index) => {
                let date = '-'
                if (attendance.attendance_date) {
                  date = getDate('case-1', new Date(attendance.attendance_date))
                }

                let status = '-'
                if (attendance.status === 'abstain') {
                  status = 'Alpha'
                }
                else if (attendance.status === 'permission') {
                  status = 'Izin'
                }
                else if (attendance.status === 'sick') {
                  status = 'Sakit'
                }
                else {
                  status = 'Hadir'
                }

                return <tr key={index}>
                  <td>{date}</td>
                  <td>{attendance.time_range ? attendance.time_range : '-'}</td>
                  <td>{(attendance.related_id === homeroomId) ? '-' : attendance.relation_name ? attendance.relation_name : '-' }</td>
                  <td className={(status === '-' ? 'text-center' : '')}>{status}</td>
                </tr>
              })
            }
            </tbody>
          </Table>
        </div>
      </div>
        )

      }
      else {
        attendances = (
          <div className="is-empty">
            <NotAvailable>Data tidak tersedia</NotAvailable>
          </div>
        )
      }
    }

    return (
      <div className="attendance-detail h-100">
        <div className="attendance-detail__filter-wrapper d-flex">
          <div className="attendance-detail__filter">
          <label className="absences-detail__filter-label">Status</label>
          <Select 
                classNamePrefix="select"
                onChange={event => { this.filterAttendances(event.value, 'status') }}
                options={data.status}
                placeholder='Pilih Status Kehadiran' />
          </div>

          <div className="attendance-detail__filter ml-3">
          <label
            className="absences-detail__filter-label"
            for="exampleSelect">
            Mata Pelajaran
          </label>
          <Select
                classNamePrefix="select"
                placeholder='Pilih Mata Pelajaran'
                onChange={event => { this.filterAttendances(event.value, 'school_subject_id') }}
                options={data.subjects}
                >
          </Select>
          </div>
          
        </div>
          {attendances}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  attendanceDetail: state.studentDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getStatus,
    getSubjects,
    handleFilter,
    getAttendances
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetail)