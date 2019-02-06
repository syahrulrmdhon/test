import React, { Component } from "react";
import "./../../../styles/global/component.css";
import TableEvaluasi from "./table-evaluasi";

export default class BottomContentEvaluasi extends Component {
  render() {
    return (
      <div className="bottom-contents">
        <div className="d-flex title-content-evaluasi margin-bottom-2 margin-top-4">
          <div className="col-12">
            <span>Hasil Perolehan Nilai</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TableEvaluasi 
              questionEvaluations={this.props.questionEvaluations}
            />
          </div>
        </div>
      </div>
    );
  }
}
