import React, { Component } from 'react'
import './../../styles/rapor.css';
import './../../styles/global/component.css'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Header from '../global/header';
import MenuBar from '../global/navbar';

import ExportLogo from './../../assets/images/export.svg';
import PrintLogo from './../../assets/images/print.svg';

class Rapor extends Component {
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
            <div className="rapor">
                <Header></Header>
                <MenuBar></MenuBar>
                <br /><br />
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <h5><strong>Filter</strong></h5>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <label>Murid</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="1">Semua Murid</option>
                                    <option value="2">Murid Beresiko</option>
                                    <option value="3">Murid Tidak Beresiko</option>
                                </select>
                                <br /><br />
                                <label>Semester</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="s1">1</option>
                                    <option value="s2">2</option>
                                </select>
                                <br /><br />
                                <button type="submit" className="btn-green">Filter</button>
                            </form>
                            <br />
                            <div className="export-print">
                                <button>
                                    <img className="export" src={ExportLogo} alt="" />
                                </button>
                                <button>
                                    <img className="print" src={PrintLogo} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="right-content col-10 row">
                            <h5 className="col-8"><strong>Rapor Kelas X IPA 2</strong></h5>
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
                            <TabContent className="col-12" activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Table bordered striped responsive hover sm>
                                        <thead>
                                            <tr>
                                                <th>Nama Siswa</th>
                                                <th>Matematika</th>
                                                <th>Bahasa Indonesia</th>
                                                <th>Kesenian</th>
                                                <th>IPA</th>
                                                <th>IPS</th>
                                                <th>Kehadiran</th>
                                                <th>Total Nilai (GPA)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Table bordered striped responsive hover sm>
                                        <thead>
                                            <tr>
                                                <th>Nama Siswa</th>
                                                <th>Matematika</th>
                                                <th>Bahasa Indonesia</th>
                                                <th>Kesenian</th>
                                                <th>IPA</th>
                                                <th>IPS</th>
                                                <th>Kehadiran</th>
                                                <th>Total Nilai (GPA)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85%</td>
                                                <td>90</td>
                                                <td>80</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Table bordered striped responsive hover sm>
                                        <thead>
                                            <tr>
                                                <th>Nama Siswa</th>
                                                <th>Matematika</th>
                                                <th>Bahasa Indonesia</th>
                                                <th>Kesenian</th>
                                                <th>IPA</th>
                                                <th>IPS</th>
                                                <th>Kehadiran</th>
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
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                            <tr>
                                                <th>Muhammad Jihaduddin Fikri Amrillah</th>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>90</td>
                                                <td>95</td>
                                                <td>85</td>
                                                <td>90%</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </TabPane>
                            </TabContent>
                            <br />
                        </div>
                    </div>
                    <br /><br /><br /><br /><br /><br /><br />
                </div>
            </div>
        )
    }
}
export default Rapor;