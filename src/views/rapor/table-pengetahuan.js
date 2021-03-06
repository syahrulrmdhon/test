import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ArrowPengetahuan from './arrow-pengetahuan';

export default class TablePengetahuan extends Component {
    render() {
        return (
            <Table bordered striped hover responsive>
                <thead className='text-center'>
                    <tr>
                        <th className='align-top'>Nama Siswa</th>
                        {
                            this.props.dTableKnowledge && this.props.dTableKnowledge.final_scores && this.props.dTableKnowledge.final_scores.subjects.map(function (x, i) {
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
                        this.props.tableKnowledge.map(function (data, i) {
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
                                        <ArrowPengetahuan
                                            arrow={data.final_scores.total_average.improvement_status}
                                        />
                                        <span className='arrow padding-left-1'>
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
