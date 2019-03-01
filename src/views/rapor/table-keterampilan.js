import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ArrowKeterampilan from './arrow-keterampilan';

export default class TableKeterampilan extends Component {
    render() {
        return (
            <Table bordered striped responsive hover>
                <thead className='text-center'>
                    <tr>
                        <th className='align-top'>Nama Siswa</th>
                        {
                            this.props.dTableSkill && this.props.dTableSkill.final_scores && this.props.dTableSkill.final_scores.subjects.map(function (x, i) {
                                return <th key={i} className='align-top'>
                                    {x.name}
                                </th>
                            })
                        }
                        <th className='align-top'>Kehadiran</th>
                        <th className='align-top'>Total Nilai (GPA)</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        this.props.tableSkill.map(function (data, i) {
                            return <tr key={i}>
                                <td className='student-name text-left' onClick={(e) => (this.props.nameClicked(e, data.id))}>{data.full_name}</td>
                                {data.final_scores.subjects.map(function (x, i) {
                                    return <td key={i}>
                                        {x.score.score === null ? '-' : x.score.score}
                                    </td>
                                })}
                                <td>{data.final_scores.attendance_report.percentage === null ? '-' : data.final_scores.attendance_report.percentage + '%'}</td>
                                <td>
                                    <div className='d-flex'>
                                        <ArrowKeterampilan
                                            arrow={data.final_scores.total_average.improvement_status}
                                        />
                                        <span className='padding-left-1'>
                                            {data.final_scores.total_average.score === null ? '-' : data.final_scores.total_average.score}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        }, this)
                    }
                </tbody>
            </Table>
        )
    }
}
