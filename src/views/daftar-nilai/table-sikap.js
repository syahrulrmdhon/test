import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableSikap extends Component {
    render() {
        return (
            <div className="table-sikap">
                <Table bordered striped responsive hover>
                    <thead>
                        <tr>
                            <th>Nama Murid</th>
                            <th>Sangat Baik</th>
                            <th>Butuh Perhatian</th>
                            <th>Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listTable.map(function (data, i) {
                                return <tr key={i}>
                                    <td>{data.data.full_name}</td>
                                    <td>{data.data.subject_score_details.sb}</td>
                                    <td>{data.data.subject_score_details.bp}</td>
                                    <td>{data.data.attendance_report.percentage}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
