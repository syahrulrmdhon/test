import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableKeterampilan extends Component {
    render() {
        return (
            <div className="table-keterampilan">
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
                                    <td>{data.full_name}</td>
                                    {data.subject_score_details.task.scores.map(function (x, i) {
                                        return <td key={i}>
                                            {x.score === null ? "-" : x.score}
                                        </td>
                                    })}
                                    <td>
                                    {data.subject_score_details.task.average.score === null ? "-" : data.subject_score_details.task.average.score}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>    
                </Table>
            </div>
        )
    }
}
