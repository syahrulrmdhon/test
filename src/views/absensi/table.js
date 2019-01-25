import React, { Component } from 'react'
import { Table } from 'reactstrap'
import ModalAbsensi from './modal'

export default class TableAbsensi extends Component {
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
        return (
            <div className="table-absensi">
                <br />
                <div className="table-content">
                    <Table bordered striped responsive hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Murid</th>
                                <th>Hadir</th>
                                <th>Sakit</th>
                                <th>Ijin</th>
                                <th>Alpha</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.attendances.map((attendance, index) => {
                                    return <tr key={attendance.user_id}>
                                        <th>{index + 1}</th>
                                        <th>{attendance.name}</th>
                                        <th className="align-center" title="Hadir">
                                            <input type="radio" className="rd-btn" name={attendance.user_id} value="present" onChange={event => this.props.handleOptionChange(event)} id={attendance.user_id} checked={attendance.status === 'present'}/>
                                        </th>
                                        <th className="align-center" title="Sakit">
                                            <input type="radio" name={attendance.user_id} value="sick" onChange={event => this.props.handleOptionChange(event)} id={attendance.user_id} checked={attendance.status === 'sick'}/>
                                        </th>
                                        <th className="align-center" title="Ijin">
                                            <input type="radio" name={attendance.user_id} value="permission" onChange={event => this.props.handleOptionChange(event)} id={attendance.user_id} checked={attendance.status === 'permission'}/>
                                        </th>
                                        <th className="align-center" title="Alpha">
                                            <input type="radio" name={attendance.user_id} value="abstain" onChange={event => this.props.handleOptionChange(event)} id={attendance.user_id} checked={attendance.status === 'abstain'}/>
                                        </th>
                                        <th className="align-center">
                                            <button className="btn-white" onClick={this.showModal}>Lihat Keterangan</button>
                                        </th>
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
