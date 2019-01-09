import React, { Component } from 'react'
import './../../styles/penilaian.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { Table, TabContent, TabPane } from 'reactstrap'
import { Button, ButtonGroup } from 'react-bootstrap'
import classnames from 'classnames'

const listPenilaian = [
    { label: "Pilih Tipe Penilaian", value: "" }
];
const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
];
const listPelajaran = [
    { label: "Fisika Dasar II", value: "fisika2" },
    { label: "Matematika Dasar II", value: "matematika2" },
    { label: "Sejarah Nasional II", value: "sejarah2" },
    { label: "Biologi II", value: "biologi2" }
];

class Penilaian extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: '1',
            listPenilaian,
            selectedPenilaian: "",
            listClass,
            selectedClass: "",
            listPelajaran,
            selectedPelajaran: ""
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleSubmit() {

    }

    render() {
        return (
            <div className="penilaian">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <h5><strong>Filter</strong></h5>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <label>Tipe Penilaian</label>
                                <select value={this.state.selectedPenilaian}
                                    onChange={(e) => this.setState({ selectedPenilaian: e.target.value })}>
                                    {
                                        this.state.listPenilaian.map((penilaian) =>
                                            <option key={penilaian.value} value={penilaian.value}>
                                                {penilaian.label}
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
                                <div className="col-4">
                                    <div className="float-left">
                                        <ButtonGroup justified>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}>Pengetahuan</Button>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}>Keterampilan</Button>
                                            <Button bsClass="tab-nilai" className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggle('3'); }}>Sikap</Button>
                                        </ButtonGroup>
                                        <br /><br />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <button className="btn-white float-right">Tambah Penilaian</button>
                                </div>
                                <TabContent>
                                    <TabPane tabId="1">
                                        <div className="table-content">
                                            <Table bordered striped responsive hover>

                                            </Table>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        nganu 2
                                    </TabPane>
                                    <TabPane tabId="3">
                                        nganu 3
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Penilaian;