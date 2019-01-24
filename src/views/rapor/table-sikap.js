import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class TableSikap extends Component {
    render() {
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
                                    <td>{data.full_name}</td>
                                    {data.final_scores.subjects.map(function (x, i) {
                                        return <td key={i}>
                                            {x.status === null ? "N/A" : x.status}
                                        </td>
                                    })}
                                    {/* <td>{data.final_scores.total.score === null ? "N/A" : data.final_scores.total.score}</td> */}
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
