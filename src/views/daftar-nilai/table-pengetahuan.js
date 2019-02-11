import React, { Component } from "react";
import { Table } from "reactstrap";

export default class TablePengetahuan extends Component {
  render() {
    console.log('pengetahuan', this.props.tableKnowledge)
    return (
        <Table bordered striped responsive hover>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th colSpan={this.props.idxScores}>Ulangan Harian</th>
              <th>Rata-Rata</th>
              <th colSpan={this.props.idxTugas}>Tugas</th>
              <th>Rata-Rata</th>
              <th>UTS</th>
              <th>UAS/UKK</th>
              <th>Nilai Rapor</th>
            </tr>
          </thead>
          <tbody className="table-nilai">
            {this.props.tableKnowledge.map(function (data, i) {
              return <tr key={i}>
                <td className="student-name" onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                {data.subject_score_details.daily_exam.scores.map(function (x, i) {
                  return (
                    <td key={i}>
                      {x.result.score === null ? "-" : x.result.score}
                    </td>
                  );
                })}
                <td>
                  {data.subject_score_details.daily_exam.average.score === null ? "-" : data.subject_score_details.daily_exam.average.score}
                </td>
                {data.subject_score_details.task.scores.map(function (x, i) {
                  return (
                    <td key={i}>
                      {x.result.score === null ? "-" : x.result.score}
                    </td>
                  );
                })
                }
                <td>
                  {data.subject_score_details.task.average.score === null ? "-" : data.subject_score_details.task.average.score}
                </td>
                <td>
                  {data.subject_score_details.midterm_exam.average.score === null ? "-" : data.subject_score_details.midterm_exam.average.score}
                </td>
                <td>
                  {data.subject_score_details.final_exam.average.score === null ? "-" : data.subject_score_details.final_exam.average.score}
                </td>
                <td>
                  {data.subject_score_details.subject_average.score === null ? "-" : data.subject_score_details.subject_average.score}
                </td>
              </tr>
            }, this)
            }
          </tbody>
        </Table>
    );
  }
}
