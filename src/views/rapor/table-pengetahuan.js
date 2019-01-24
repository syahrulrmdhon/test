import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TablePengetahuan extends Component {
    render() {
        return (
            <div className="table-pengetahuan">
                <Table bordered striped hover responsive>
                    <thead>
                        <tr>
                            <th>Nama Siswa</th>
                            {
                                this.props.dTableKnowledge && this.props.dTableKnowledge.final_scores && this.props.dTableKnowledge.final_scores.subjects.map(function (x, i) {
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
                            this.props.tableKnowledge.map(function (data, i) {
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
