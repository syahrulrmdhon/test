import React, { Component } from 'react'
import './../../styles/daftar-nilai.css';

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class DaftarNilai extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="nilai">
                <Header></Header>
                <MenuBar></MenuBar>
                <br /><br />
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <h5><strong>Filter</strong></h5>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <label>Semester</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                <br /><br />
                                <label>Kelas</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="x1">X IPS 1</option>
                                    <option value="x2">X IPS 2</option>
                                </select>
                                <br /><br />
                                <label>Mata Pelajaran</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="bindo">Bahasa Indonesia</option>
                                    <option value="matem">Matematika</option>
                                </select>
                                <br /><br />
                                <button type="submit" className="btn-green">Urutkan</button>
                            </form>
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="float-left"><strong>Daftar Nilai</strong></h5>
                                </div>
                                <div className="col-4">
                                    <span className="float-right">
                                        <Nav tabs>
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}>
                                                    Pengetahuan
                                        </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}>
                                                    Keterampilan
                                        </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '3' })}
                                                    onClick={() => { this.toggle('3'); }}>
                                                    Sikap
                                        </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <br />
                                    </span>
                                </div>
                                <TabContent className="col-12" activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Table bordered striped responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Nama Siswa</th>
                                                    <th colSpan="2">Ulangan Harian</th>
                                                    <th>Rata-Rata</th>
                                                    <th colSpan="2">Tugas</th>
                                                    <th>Rata-Rata</th>
                                                    <th>UTS</th>
                                                    <th>UAS/UKK</th>
                                                    <th>Nilai Rapor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Table bordered striped responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Nama Siswa</th>
                                                    <th colSpan="2">Ulangan Harian</th>
                                                    <th>Rata-Rata</th>
                                                    <th colSpan="2">Tugas</th>
                                                    <th>Rata-Rata</th>
                                                    <th>UTS</th>
                                                    <th>UAS/UKK</th>
                                                    <th>Nilai Rapor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>95</td>
                                                    <td>85</td>
                                                    <td>90</td>
                                                    <td>80</td>
                                                    <td>90</td>
                                                    <td>90</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Table bordered striped responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Nama Murid</th>
                                                    <th>Sangat Baik</th>
                                                    <th>Butuh Perhatian</th>
                                                    <th>Kehadiran</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                                <tr>
                                                    <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                    <td>90</td>
                                                    <td>90</td>
                                                    <td>90%</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                </TabContent>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default DaftarNilai;