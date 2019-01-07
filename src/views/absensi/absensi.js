import React, { Component } from 'react'
import './../../styles/absensi/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import ModalAbsensi from './modal'

import { Table } from 'reactstrap'
import Axios from 'axios';

const listClass = [
  { label: "X IPA 1", value: "x ipa 1" },
  { label: "X IPA 2", value: "x ipa 2" },
  { label: "X IPS 1", value: "x ips 1" },
  { label: "X IPS 2", value: "x ips 2" }
];
const listAbsensi = [
  { label: "Absensi Harian", value: "harian" },
  { label: "Absensi Mata Pelajaran", value: "pelajaran" }
];
const listPelajaran = [
  { label: "Fisika Dasar II", value: "fisika2" },
  { label: "Matematika Dasar II", value: "matematika2" },
  { label: "Sejarah Nasional II", value: "sejarah2" },
  { label: "Biologi II", value: "biologi2" }
];

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      error: null,
      modal: false,
      listAbsensi,
      selectedAbsensi: "",
      listClass,
      selectedClass: "",
      listPelajaran,
      selectedPelajaran: ""
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
  handleSubmit(event) {

  }
  showModal() {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    return (
      <div className="absensi">
        <Header></Header>
        <MenuBar></MenuBar>
        <div className="content">
          <div className="row">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-3 left-content">
                  <h5><strong>Filter</strong></h5>
                  <br />
                  <form onSubmit={this.handleSubmit}>
                    <label>Tipe Absensi</label>
                    <select value={this.state.selectedClass}
                      onChange={(e) => this.setState({ selectedAbsensi: e.target.value })}>
                      {
                        this.state.listAbsensi.map((absen) =>
                          <option key={absen.value} value={absen.value}>
                            {absen.label}
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
                <div className="col-9 center-content">
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
                  <button type="submit" className="btn-green float-right col-3">Simpan</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 right-content">
              <div className="card">
                <h6><strong>Total Kehadiran</strong></h6>
                <h3><strong>19</strong></h3>
                <p>Murid</p>
              </div>
              <br />
              <div className="card">
                <h6><strong>Total Ketidakhadiran</strong></h6>
                <h3><strong>1</strong></h3>
                <p>Murid</p>
              </div>
              <br />
              <div className="card">
                <h6><strong>Persentase Kehadiran</strong></h6>
                <h3><strong>99%</strong></h3>
                <p>Murid</p>
              </div>
            </div>
          </div>
        </div>
        <ModalAbsensi modal={this.state.modal} toggle={this.showModal}>

        </ModalAbsensi>
      </div >
    )
  }
}
