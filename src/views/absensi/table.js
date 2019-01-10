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
        Axios.get(process.env.API_URL + '/users')
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
                <div className="row">
                    <div className="col-8">
                        <h5><strong>Tanggal 17 Desember 2018</strong></h5>
                    </div>
                    <div className="col-4 input-container">
                        <input className="input-field" type="text" placeholder="Cari siswa disini..." name="search" />
                        <i className="fa fa-search icon"></i>
                    </div>
                </div>
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
                                this.state.users.map(function (i, x) {
                                    return <tr key={x}>
                                        <th>{x + 1}</th>
                                        <th>{i.name}</th>
                                        <th className="align-center" title="Hadir">
                                            <input type="radio" className="rd-btn" name={"absen[" + x + "]"} value="hadir"></input>
                                        </th>
                                        <th className="align-center" title="Sakit">
                                            <input type="radio" name={"absen[" + x + "]"} value="sakit"></input>
                                        </th>
                                        <th className="align-center" title="Ijin">
                                            <input type="radio" name={"absen[" + x + "]"} value="ijin"></input>
                                        </th>
                                        <th className="align-center" title="Alpha">
                                            <input type="radio" name={"absen[" + x + "]"} value="alpha"></input>
                                        </th>
                                        <th className="align-center">
                                            <button className="btn-white" onClick={this.showModal}>Lihat Keterangan</button>
                                        </th>
                                    </tr>
                                },
                                    this
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                <ModalAbsensi modal={this.state.modal} toggle={this.showModal}/>
            </div>
        )
    }
}
