import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ModalAbsensi from './modal'

export default class TableAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal: false
        };
        this.showModal = this.showModal.bind(this);
    }
    
    showModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        let data = null
        if(this.props.searchAttendances === null) {
            data = []
        }
        else if (this.props.searchAttendances.length !== 0) {
            data = this.props.searchAttendances
        }
        else {
            data = this.props.attendances
        }
        return (
            <div className="attendance-table">
                <div className="table-content">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th className="text-left">Nama Murid</th>
                                <th>Hadir</th>
                                <th>Sakit</th>
                                <th>Ijin</th>
                                <th>Alpha</th>
                                {/* <th>Keterangan</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                data.map((attendance, index) => {
                                    return <tr key={attendance.user_id}>
                                        <td className="text-center number">{index + 1}</td>
                                        <td className="absensi__name" onClick={(event) => (this.props.nameClicked(event, attendance.user_id))}>{attendance.name}</td>
                                        <td className="align-center" title="Hadir">
                                        <div className="status">
                                            <label htmlFor={'present-' + attendance.user_id}></label>
                                            <input type="radio" className="rd-btn" name={attendance.user_id} value="present" onChange={event => this.props.handleOptionChange(event)} id={'present-' + attendance.user_id} checked={attendance.status === 'present'}/>
                                            <div className="check"></div>
                                            </div>
                                        </td>
                                        <td className="align-center" title="Sakit">
                                        <div className="status">
                                            <label htmlFor={'sick-' + attendance.user_id}></label>
                                            <input type="radio" name={attendance.user_id} value="sick" onChange={event => this.props.handleOptionChange(event)} id={'sick-' + attendance.user_id} checked={attendance.status === 'sick'}/>
                                            <div className="check"></div>
                                            </div>
                                        </td>
                                        <td className="align-center" title="Ijin">
                                        <div className="status">
                                            <label htmlFor={'permission-' + attendance.user_id}></label>
                                            <input type="radio" name={attendance.user_id} value="permission" onChange={event => this.props.handleOptionChange(event)} id={'permission-' + attendance.user_id} checked={attendance.status === 'permission'}/>
                                            <div className="check"></div>
                                            </div>
                                        </td>
                                        <td className="align-center" title="Alpha">
                                        <div className="status alpha">
                                            <label htmlFor={'abstain-' + attendance.user_id}></label>
                                            <input type="radio" name={attendance.user_id} value="abstain" onChange={event => this.props.handleOptionChange(event)} id={'abstain-' + attendance.user_id} checked={attendance.status === 'abstain'}/>
                                            <div className="check"></div>
                                            </div>
                                        </td>
                                        {/* <td className="align-center">
                                            <button className="show bg-white" onClick={this.showModal}>Lihat Keterangan</button>
                                        </td> */}
                                    </tr>
                                }, this)
                            }
                        </tbody>
                    </Table>
                </div>
                <ModalAbsensi modal={this.state.modal} toggle={this.showModal}/>
            </div>
        )
    }
}
