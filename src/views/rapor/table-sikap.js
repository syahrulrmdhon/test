import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableSikap extends Component {
    render() {
        console.log(this.props.tableAttitude)
        return (
            <div className="table-sikap">
                <Table bordered striped responsive hover>
                    <thead>
                        <tr>
                            <th>Nama Siswa</th>
                            {
                                this.props.dTableAttitude && this.props.dTableAttitude.final_scores && this.props.dTableAttitude.final_scores.subjects.map(function (x, i) {
                                    return <th key={i}>
                                        {x.name}
                                    </th>
                                })
                            }
                            <th>Kehadiran (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            this.props.tableAttitude.map(function (data, i) {
                                return <tr key={i}>
                                    <td className="student-name">{data.full_name}</td>
                                    {data.final_scores.subjects.map(function (x, i) {
                                        return <td key={i}>
                                            {x.status === null ? "-" : x.status}
                                        </td>
                                    })}
                                    <td>{data.final_scores.attendance_report.percentage === null ? "-" : data.final_scores.attendance_report.percentage}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
