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
                            {
                                this.props.dTableSkill && this.props.dTableSkill.final_scores && this.props.dTableSkill.final_scores.subjects.map(function (x, i) {
                                    return <th key={i}>
                                        {x.name}
                                    </th>
                                })
                            }
                            <th>Kehadiran (%)</th>
                            <th>Total Nilai (GPA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tableSkill.map(function (data, i) {
                                return <tr key={i}>
                                    <td>{data.full_name}</td>
                                    {data.final_scores.subjects.map(function (x, i) {
                                        return <td key={i}>
                                            {x.score.score === null ? "N/A" : x.score.score}
                                        </td>
                                    })}
                                    <td>{data.final_scores.total.score === null ? "N/A" : data.final_scores.total.score}</td>
                                    <td>{data.final_scores.total_average.score === null ? "N/A" : data.final_scores.total_average.score}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
