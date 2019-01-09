import React, { Component } from 'react'
import './../../styles/daftar-nilai.css';

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames';
import FilterNilai from './filter';

class DaftarNilai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };

        this.toggle = this.toggle.bind(this);
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
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <FilterNilai />
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="float-left"><strong>Daftar Nilai</strong></h5>
                                </div>
                                <div className="col-4">
                                    <span className="float-right">
                                        <Nav tabs className="border-0 pull-right">
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
                                    </span>
                                </div>
                                <TabContent className="col-12" activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <div className="table-content">
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="table-content">
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
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
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="table-content">
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
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Muhammad Jihaduddin Fikri Amrillah</td>
                                                        <td>90</td>
                                                        <td>90</td>
                                                        <td>90%</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default DaftarNilai;