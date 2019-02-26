import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { getDate } from '../../utils/common'
import { NotAvailable } from '../../views/global/notAvailable'

export default class AbsenceTable extends Component {
  render() {
    return (
      <div className="h-100">
        {
          this.props.attendances.attendances.results.entries.length ?
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
                  this.props.attendances.attendances.results.entries.map( (attendance, index) => {
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
                      <td className={(date === '-') ? 'text-center' : ''}>{date}</td>
                      <td className={!attendance.time_range ? 'text-center' : '-'}>{attendance.time_range ? attendance.time_range : '-'}</td>
                      <td>-</td>
                      <td className={(status === '-' ? 'text-center' : '')}>{status}</td>
                    </tr>
                  })
                }
                </tbody>
              </Table>
            </div>
          </div>
          : 
          <div className="is-empty">
            <NotAvailable>Data tidak tersedia</NotAvailable>
          </div>
        }
      </div>
    )
  }
}
