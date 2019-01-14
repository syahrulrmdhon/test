import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class AbsenceTable extends Component {
  render() {
    return (
      <div>
        <Table className="absences-detail__table" bordered striped responsive>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jam Pelajaran</th>
            <th>Mata Pelajaran</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Sakit</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Fisika Dasar</td>
            <td>Sakit</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Izin</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Izin</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Alpha</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Alpha</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Sakit</td>
          </tr>
          <tr>
            <td>10 September 2018</td>
            <td>08:00 - 09:00</td>
            <td>Matematika</td>
            <td>Sakit</td>
          </tr>
        </tbody>
        </Table>
      </div>
    )
  }
}
