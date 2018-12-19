import React, { Component } from 'react'
import Axios from 'axios';
import './../../styles/murid.css';
import './../../styles/global/component.css'
import { Table } from 'reactstrap';

import Header from '../global/header';
import MenuBar from '../global/navbar';

class DaftarMurid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        Axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
                console.log('DATA', res);
            })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {

    }

    render() {
        return (
            <div className="murid">
                <Header></Header>
                <MenuBar></MenuBar>
                <br /><br />
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <h5><strong>Urutkan Berdasarkan</strong></h5>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="teratas">Peringkat Teratas</option>
                                    <option value="ascending">Nama Murid (A ke Z)</option>
                                    <option value="terbawah">Kehadiran Terendah</option>
                                </select>
                                <br /><br />
                                <button type="submit" className="btn-green">Urutkan</button>
                            </form>
                        </div>
                        <div className="right-content col-10">
                            <h5><strong>Kelas X IPA 2</strong></h5>
                            <br />
                            <Table bordered striped responsive hover className="table-sm">
                                <thead>
                                    <tr>
                                        <th>NIS</th>
                                        <th>NISN</th>
                                        <th>Nama Murid</th>
                                        <th>Kehadiran Rata-Rata</th>
                                        <th>Nilai Rata-Rata</th>
                                        <th>Peringkat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(function (i, x) {
                                            console.log('I', i);
                                            return <tr>
                                                <th scope="row">{i.name}</th>
                                                <td>{i.username}</td>
                                                <td>{i.email}</td>
                                                <td>{i.address.city}</td>
                                                <td>{i.address.street}</td>
                                                <td>{i.address.zipcode}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <br /><br /><br /><br/><br/><br/><br/>
                </div>
            </div>
        )
    }
}
export default DaftarMurid;