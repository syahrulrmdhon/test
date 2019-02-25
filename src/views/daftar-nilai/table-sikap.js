import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableSikap extends Component {
    render() {
        return (
            <Table bordered striped responsive hover>
                <thead>
                    <tr>
                        <th>Nama Murid</th>
                        <th>Sangat Baik</th>
                        <th>Butuh Perhatian</th>
                        <th>Kehadiran (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.tableAttitude.map(function (data, i) {
                            return <tr key={i}>
                                <td className="student-name" onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                <td>
                                    {data.subject_score_details.sb === null ? "-" : data.subject_score_details.sb}
                                </td>
                                <td>
                                    {data.subject_score_details.bp === null ? "-" : data.subject_score_details.bp}
                                </td>
                                <td>
                                    {data.attendance_report.percentage === null ? "-" : data.attendance_report.percentage + '%'}
                                </td>
                            </tr>
                        }, this)
                    }
                </tbody>
            </Table>
        )
    }
}
