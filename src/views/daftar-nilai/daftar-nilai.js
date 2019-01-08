import React, { Component } from 'react'
import './../../styles/daftar-nilai.css';

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { Table, TabContent, TabPane } from 'reactstrap'
import { Button, ButtonGroup } from 'react-bootstrap'
import classnames from 'classnames';

const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
];
const listSemester = [
    { label: "1", value: 1 },
    { label: "2", value: 2 }
]
const listPelajaran = [
    { label: "Fisika Dasar II", value: "fisika2" },
    { label: "Matematika Dasar II", value: "matematika2" },
    { label: "Sejarah Nasional II", value: "sejarah2" },
    { label: "Biologi II", value: "biologi2" }
];

class DaftarNilai extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            listClass,
            selectedClass: "",
            listSemester,
            selectedSemester: "",
            listPelajaran,
            selectedPelajaran: ""
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
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <h5><strong>Filter</strong></h5>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <label>Semester</label>
                                <select value={this.state.selectedSemester}
                                    onChange={(e) => this.setState({ selectedSemester: e.target.value })}>
                                    {
                                        this.state.listSemester.map((semester) =>
                                            <option key={semester.value} value={semester.value}>
                                                {semester.label}
                                            </option>
                                        )
                                    }
                                </select>
                                <br /><br />
                                <label>Kelas</label>
                                <select value={this.state.selectedClass}
                                    onChange={(e) => this.setState({ selectedClass: e.target.value })}>
                                    {
                                        this.state.listClass.map((kelas) =>
                                            <option key={kelas.value} value={kelas.value}>
                                                {kelas.label}
                                            </option>
                                        )
                                    }
                                </select>
                                <br /><br />
                                <label>Mata Pelajaran</label>
                                <select value={this.state.selectedPelajaran}
                                    onChange={(e) => this.setState({ selectedPelajaran: e.target.value })}>
                                    {
                                        this.state.listPelajaran.map((pelajaran) =>
                                            <option key={pelajaran.value} value={pelajaran.value}>
                                                {pelajaran.label}
                                            </option>
                                        )
                                    }
                                </select>
                                <br /><br />
                                <button type="submit" className="btn-green">Filter</button>
                            </form>
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="float-left"><strong>Daftar Nilai</strong></h5>
                                </div>
                                <div className="col-4">
                                    <span className="float-right">
                                        <ButtonGroup justified>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}>Pengetahuan</Button>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}>Keterampilan</Button>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggle('3'); }}>Sikap</Button>
                                        </ButtonGroup>
                                        <br /><br />
                                        {/* <Nav tabs>
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
                                        </Nav> */}
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