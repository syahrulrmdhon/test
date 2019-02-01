import React, { Component } from "react";

const data = [
  { no: 7, siswa: 30 },
  { no: 12, siswa: 20 },
  { no: 17, siswa: 19 },
  { no: 21, siswa: 20 }
];
export default class CardEvaluasi extends Component {
  render() {
    return (
      <div className="card-evaluasi">
        <div className="card__label-evaluasi">Nomor Soal Belum Dikuasai</div>
        <br />
        <div className="card__number-evaluasi">7, 12, 17, & 21</div>
      </div>
    );
  }
}
