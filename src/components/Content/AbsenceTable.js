import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class AbsenceTable extends Component {
  render() {
    return (
      <div className="table-content">
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
            return <tr key={index}>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{attendance.status}</td>
            </tr>
          })
        }
        </tbody>
        </Table>
      </div>
    )
  }
}
