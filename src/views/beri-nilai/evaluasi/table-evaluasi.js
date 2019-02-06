import React, { Component } from 'react'
import { Table } from 'reactstrap'
import './../../../styles/beri-nilai/main.scss'
import './../../../styles/global/component.css'

export default class TableEvaluasi extends Component {
  render() {
    console.log('table', this.props.questionEvaluations)
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
          {this.props.questionEvaluations.map(function (data, i) {
            return (
              <tr key={i} className="tbody-table-nilai margin-bottom-1">
                <td className="text-left left-col-evaluasi">{data.qn_number === null ? '-' : data.qn_number}</td>
                {data.exam_question_choices.map(function (x, i) {
                  return (
                    <td className="text-left" key={i}>
                      <div>{data.question === null ? "-" : data.question}</div>
                      <div>{x.symbol === null ? '-' : x.symbol}) {x.content === null ? '-' : x.content} ({x.ans_count} Murid)</div>
                    </td>
                  );
                })
                }

                <td className="large-text-red-bold">{data.correct_percentage === null ? '-' : data.correct_percentage}</td>
                <td className="text-left">{data.predicate === null ? '-' : data.predicate}</td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    )
  }
}
