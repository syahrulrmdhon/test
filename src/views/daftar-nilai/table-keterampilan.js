import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableKeterampilan extends Component {
    render() {
        let content = []
        if (this.props.tableSkill.length > 0) {
            let data = this.props.tableSkill
            data.map((data) => {
                content.push(
                    <tr key={Math.random()} className='text-center'>
                        <td className='student-name text-left' onClick={(e) => (this.props.nameClicked(e, data.id))}>
                            {data.full_name}
                        </td>
                        {
                            data.subject_score_details.task.scores.length > 0 ?
                                data.subject_score_details.task.scores.map((x) => {
                                    console.log('x', x)
                                    return (
                                        <td key={Math.random()}>
                                            {x.result.score === null ? '-' : x.result.score}
                                        </td>
                                    )
                                })
                                :
                                <td>-</td>
                        }
                        <td>
                            {
                                data.subject_score_details.task.average.score === null ? '-' : data.subject_score_details.task.average.score
                            }
                        </td>
                    </tr>
                )
            })
        }
        return (
            <Table bordered striped responsive hover>
                <thead className='text-center'>
                    <tr>
                        <th>Nama Siswa</th>
                        <th colSpan={this.props.idxScoresSkill}>Tugas</th>
                        <th>Rata-Rata</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </Table>
        )
    }
}
