import React, { Component } from "react";
import "./../../../styles/global/component.css";
import TableEvaluasi from "./table-evaluasi";

export default class BottomContentEvaluasi extends Component {
  render() {
    return (
      <div className="bottom-contents">
        <div className="title-content">
          <span>Hasil Evaluasi Soal</span>
        </div>
        <br />
        <div className="table-responsive">
          <TableEvaluasi />
        </div>
      </div>
    );
  }
}
