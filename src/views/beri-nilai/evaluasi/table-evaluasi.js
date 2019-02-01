import React, { Component } from 'react'
import { Table } from 'reactstrap'
import './../../../styles/beri-nilai/main.scss'
import './../../../styles/global/component.css'

export default class TableEvaluasi extends Component {
  render() {
    return (
      <Table className='d-sm-table'>
        <thead className='thead-light'>
          <tr className="col-12">
            <th className="text-left">No.</th>
            <th className="text-left">Soal & Jawaban</th>
            <th className="text-center">Presentase Menjawab Dengan Benar</th>
            <th className="text-left">Pemahaman Materi</th>
          </tr>
        </thead>
        <tbody>
          <tr><th></th></tr>
          <tr className="tbody-table-nilai margin-bottom-1">
            <td className="text-left left-col-evaluasi">1</td>
            <td className="text-left">
              <div>Berapa jumlah 2 ayam di tambah 2 ayam?</div>
              <div>a) 10 ayam (10 Murid)</div>
              <div className="normal-text-green-bold">
                b) 8 ayam (3 Murid)
              </div>
              <div>c) 4 ayam (12 Murid)</div>
              <div>d) 6 ayam (5 Murid)</div>
            </td>
            <td className="large-text-red-bold">3%</td>
            <td>Murid kurang paham</td>
          </tr>
          <br/>

        </tbody>
      </Table>
    )
  }
}
