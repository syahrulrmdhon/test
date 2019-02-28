import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableSikap extends Component {
    render() {
        return (
            <Table bordered striped responsive hover>
                <thead className='text-center'>
                    <tr>
                        <th className='align-top'>Nama Siswa</th>
                        {
                            this.props.dTableAttitude && this.props.dTableAttitude.final_scores && this.props.dTableAttitude.final_scores.subjects.map(function (x, i) {
                                return <th key={i} className='align-top'>
                                    {x.name}
                                </th>
                            })
                        }
                        <th className='align-top'>Kehadiran</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        this.props.tableAttitude.map(function (data, i) {
                            return <tr key={i}>
                                <td className='student-name text-left' onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                {data.final_scores.subjects.map(function (x, i) {
                                    return <td key={i}>
                                        {x.status === null ? '-' : x.status}
                                    </td>
                                })}
                                <td>{data.final_scores.attendance_report.percentage === null ? '-' : data.final_scores.attendance_report.percentage}</td>
                            </tr>
                        }, this)
                    }
                </tbody>
            </Table>
        )
    }
}
