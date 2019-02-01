import React, { Component } from "react";
import { Table } from "reactstrap";
import "./../../../styles/beri-nilai/main.scss";

export default class TableEvaluasi extends Component {
  render() {
    return (
      <Table className="table-evaluasi">
        <thead>
          <tr>
            <th>No.</th>
            <th>Soal & Jawaban</th>
            <th>Presentase Menjawab Dengan Benar</th>
            <th>Pemahaman Materi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              Berapa jumlah 2 ayam di tambah 2 ayam? a) 10 ayam (2 Murid) b) 8
              ayam (0 Murid) c) 4 ayam (20 Murid) d) 6 ayam (8 Murid)
            </td>
            <td>80%</td>
            <td>Murid sangat paham</td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              Berapa jumlah 2 ayam di tambah 2 ayam? a) 10 ayam (2 Murid) b) 8
              ayam (0 Murid) c) 4 ayam (20 Murid) d) 6 ayam (8 Murid)
            </td>
            <td>80%</td>
            <td>Murid sangat paham</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
