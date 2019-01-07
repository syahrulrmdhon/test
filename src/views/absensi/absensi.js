import React, { Component } from 'react'
import './../../styles/absensi/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import ModalAbsensi from './modal'

import { Table } from 'reactstrap'
import Select from 'react-select';
import Axios from 'axios';

const selectClass = [
  { label: "X IPA 1", value: "x ipa 1" },
  { label: "X IPA 2", value: "x ipa 2" },
  { label: "X IPS 1", value: "x ips 1" },
  { label: "X IPS 2", value: "x ips 2" }
];
const selectAbsensi = [
  { label: "Absensi Harian", value: "harian" },
  { label: "Absensi Mata Pelajaran", value: "pelajaran" }
];
const selectPelajaran = [
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
      selectedOptionKelas: null,
      selectedOptionAbsensi: null,
      selectedOptionPelajaran: null
    };

    this.handleChangeAbsensi = this.handleChangeAbsensi.bind(this);
    this.handleChangeKelas = this.handleChangeKelas.bind(this);
    this.handleChangePelajaran = this.handleChangePelajaran.bind(this);

    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    Axios.get(process.env.API_URL + '/users')
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  handleChangeAbsensi(selectedOptionAbsensi) {
    this.setState({ selectedOptionAbsensi });
    console.log('ABSENSI', selectedOptionAbsensi);
  }
  handleChangeKelas(selectedOptionKelas) {
    this.setState({ selectedOptionKelas });
    console.log('KELAS', selectedOptionKelas);
  }
  handleChangePelajaran(selectedOptionPelajaran) {
    this.setState({ selectedOptionPelajaran });
    console.log('KELAS', selectedOptionPelajaran);
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
                    <Select
                      options={selectAbsensi}
                      placeholder="Pilih Tipe Absensi"
                      value={this.state.selectedOptionAbsensi}
                      onChange={this.handleChangeAbsensi}
                    />
                    <br />
                    <label>Kelas</label>
                    <Select
                      options={selectClass}
                      placeholder="Pilih Kelas"
                      value={this.state.selectedOptionKelas}
                      onChange={this.handleChangeKelas}
                    />
                    <br />
                    <label>Mata Pelajaran</label>
                    <Select
                      options={selectPelajaran}
                      placeholder="Pilih Mata Pelajaran"
                      value={this.state.selectedOptionPelajaran}
                      onChange={this.handleChangePelajaran}
                    />
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
