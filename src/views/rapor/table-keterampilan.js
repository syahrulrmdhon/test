import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ArrowKeterampilan from './arrow-keterampilan';

export default class TableKeterampilan extends Component {
    render() {
        return (
            <Table bordered striped responsive hover className="table-nilai">
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
                <tbody className="body-table">
                    {
                        this.props.tableSkill.map(function (data, i) {
                            return <tr key={i}>
                                <td className="student-name" onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                {data.final_scores.subjects.map(function (x, i) {
                                    return <td key={i}>
                                        {x.score.score === null ? "-" : x.score.score}
                                    </td>
                                })}
                                <td>{data.final_scores.total.score === null ? "-" : data.final_scores.total.score}</td>
                                <td>
                                    <ArrowKeterampilan
                                        arrow={data.final_scores.total_average.improvement_status}
                                    />
                                    &nbsp;
                                        <span>
                                        {data.final_scores.total_average.score === null ? "-" : data.final_scores.total_average.score}
                                    </span>
                                </td>
                            </tr>
                        }, this)
                    }
                </tbody>
            </Table>
        )
    }
}
