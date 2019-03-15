import React, { Component } from 'react'
import { Table } from 'reactstrap'
import './../../../styles/beri-nilai/main.scss'
import './../../../styles/global/component.css'
import { Number } from './table-conditions'
import { Percentage } from './table-conditions'
import { Predicate } from './table-conditions'
import { evaluatQuestion } from './../../../utils/exam'

export default class TableEvaluasi extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let content = []
    if (this.props.questionEvaluations.length > 0) {
      this.props.questionEvaluations.map((value, key) => {
        let question = evaluatQuestion(value)
        content.push(
          <tr key={key}>
            <Number
              evaluations={value}
            />
            <td>{question}</td>
            <Percentage
              evaluations={value}
            />
            <Predicate
              evaluations={value}
            />
          </tr>
        )
      })
    }

    return (
      <Table responsive className="table assessment">
        <thead className='thead-light'>
          <tr className="col-12">
            <th className="text-left">No.</th>
            <th className="text-left">Soal & Jawaban</th>
            <th className="text-left">Presentase Menjawab Dengan Benar</th>
            <th className="text-left">Pemahaman Materi</th>
          </tr>
        </thead>
        <tbody className="content-student">
          {content}
        </tbody>
      </Table>
    )
  }
}
