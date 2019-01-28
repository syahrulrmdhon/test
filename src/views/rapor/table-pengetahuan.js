import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ArrowPengetahuan from './arrow-pengetahuan';

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
                                console.log('pengetahuan', data)
                                return <tr key={i}>
                                    <td className="student-name" onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                    {data.final_scores.subjects.map(function (x, i) {
                                        return <td key={i}>
                                            {x.score.score === null ? "-" : x.score.score}
                                        </td>
                                    })}
                                    <td>{data.final_scores.total.score === null ? "-" : data.final_scores.total.score}</td>
                                    <td>
                                        <ArrowPengetahuan
                                            arrow={data.final_scores.total_average.improvement_status}
                                        />
                                        &nbsp;
                                        <span className="arrow">
                                            {data.final_scores.total_average.score === null ? "-" : data.final_scores.total_average.score}
                                        </span>
                                    </td>
                                </tr>
                            }, this)
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
