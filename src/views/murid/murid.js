import React, { Component } from 'react'
import './../../styles/murid.css';
import './../../styles/global/component.css'
import { Table } from 'reactstrap';

import Header from '../global/header';
import MenuBar from '../global/navbar';

class DaftarMurid extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };

        this.handleChange = this.handleChange.bind(this);
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
                            <h6><strong>Urutkan Berdasarkan</strong></h6>
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
                            <h6><strong>Kelas X IPA 2</strong></h6>
                            <br />
                            <Table bordered striped responsive hover sm>
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
                                    <tr>
                                        <th scope="row">13010036</th>
                                        <td>36010033</td>
                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                        <td>87%</td>
                                        <td>78</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13010036</th>
                                        <td>36010033</td>
                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                        <td>87%</td>
                                        <td>78</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13010036</th>
                                        <td>36010033</td>
                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                        <td>87%</td>
                                        <td>78</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13010036</th>
                                        <td>36010033</td>
                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                        <td>87%</td>
                                        <td>78</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">13010036</th>
                                        <td>36010033</td>
                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                        <td>87%</td>
                                        <td>78</td>
                                        <td>13</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        )
    }
}
export default DaftarMurid;