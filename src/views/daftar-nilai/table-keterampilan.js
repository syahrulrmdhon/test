import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableKeterampilan extends Component {
    render() {
        return (
            <Table bordered striped responsive hover>
                <thead>
                    <tr>
                        <th>Nama Siswa</th>
                        <th colSpan={this.props.idxScoresSkill}>Tugas</th>
                        <th>Rata-Rata</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.tableSkill.map(function (data, i) {
                            return <tr key={i}>
                                <td className="student-name" onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                {data.subject_score_details.task.scores.map(function (x, i) {
                                    return <td key={i}>
                                        {x.result.score === null ? "-" : x.result.score}
                                    </td>
                                })}
                                <td>
                                    {data.subject_score_details.task.average.score === null ? "-" : data.subject_score_details.task.average.score}
                                </td>
                            </tr>
                        }, this)
                    }
                </tbody>
            </Table>
        )
    }
}
