import React, { Component } from "react";
import { Table } from "reactstrap";

export default class TablePengetahuan extends Component {
  render() {
    let content = []
    if (this.props.tableKnowledge.length > 0) {
      let data = this.props.tableKnowledge
      data.map((data) => {
        let score = data.subject_score_details
        console.log('socre', score)
        content.push(
          <tr key={Math.random()}>
            <td className='student-name' onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
            {
              score.daily_exam.scores.length > 0 ?
                score.daily_exam.scores.map((daily) => {
                  return (
                    <td key={Math.random()}>
                      {daily.result.score === null ? "-" : daily.result.score}
                    </td>
                  )
                })
                :
                <td>-</td>
            }
            <td>
              {score.daily_exam.average.score === null ? "-" : score.daily_exam.average.score}
            </td>
            {
              score.task.scores.length > 0 ?
                score.task.scores.map((task) => {
                  return (
                    <td key={Math.random()}>
                      {task.result.score === null ? '-' : task.result.score}
                    </td>
                  )
                })
                :
                <td>-</td>
            }
            <td>
              {score.task.average.score === null ? '-' : score.task.average.score}
            </td>
            <td>
              {score.midterm_exam.average.score === null ? "-" : score.midterm_exam.average.score}
            </td>
            <td>
              {score.final_exam.average.score === null ? "-" : score.final_exam.average.score}
            </td>
            <td>
              {score.subject_average.score === null ? "-" : score.subject_average.score}
            </td>
          </tr>
        )
      })
    }
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
          {content}
          {/* {this.props.tableKnowledge.map(function (data, i) {
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
          } */}
        </tbody>
      </Table>
    );
  }
}
