import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios'
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

    componentDidMount() {
        Axios.get(process.env.API_URL + 'users')
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
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
                                this.props.students.map((student, index) => {
                                    return <tr key={student.user.id}>
                                        <th>{index + 1}</th>
                                        <th>{student.user.full_name}</th>
                                        <th className="align-center" title="Hadir">
                                            <input type="radio" className="rd-btn" name={student.user.id} value="present"></input>
                                        </th>
                                        <th className="align-center" title="Sakit">
                                            <input type="radio" name={student.user.id} value="sick"></input>
                                        </th>
                                        <th className="align-center" title="Ijin">
                                            <input type="radio" name={student.user.id} value="permission"></input>
                                        </th>
                                        <th className="align-center" title="Alpha">
                                            <input type="radio" name={student.user.id} value="abstain"></input>
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
