import React, { Component } from 'react'
import './../../styles/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

import 'react-day-picker/lib/style.css';
import { Table } from 'reactstrap'
import Axios from 'axios';

export default class Absensi extends Component {
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
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {

  }
  render() {
    return (
      <div className="absensi">
        <Header></Header>
        <MenuBar></MenuBar>
        <br /><br />
        <div className="content">
          <div className="row">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-3 left-content">
                  <h5><strong>Filter</strong></h5>
                  <br />
                  <form onSubmit={this.handleSubmit}>
                    <label>Tipe Absensi</label>
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value="">Pilih Tipe Absensi</option>
                      <option value="harian">Absensi Harian</option>
                      <option value="mapel">Absensi Mata Pelajaran</option>
                    </select>
                    <br /><br />
                    <label>Kelas</label>
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value="">Pilih Kelas</option>
                      <option value="x2">X IPA 2</option>
                      <option value="x1">X IPA 1</option>
                    </select>
                    <br /><br />
                    <label>Mata Pelajaran</label>
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value="">Pilih Mata Pelajaran</option>
                      <option value="bi">Bahasa Indonesia</option>
                      <option value="mtk">Matematika</option>
                      <option value="english">Bahasa Inggris</option>
                    </select>
                    <br /><br />
                    <button type="submit" className="btn-green">Filter</button>
                  </form>

                </div>
                <div className="col-9 center-content">
                  <div className="row">
                    <div className="col-9">
                      <h5><strong>Tanggal 17 Desember 2018</strong></h5>
                    </div>
                    <div className="col-3">
                      Search bar...
                  </div>
                  </div>
                  <br />
                  <Table bordered striped responsive hover className="table-sm absen">
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
                              <button className="btn-white">Lihat Keterangan</button>
                            </th>
                          </tr>
                        })
                      }
                    </tbody>
                  </Table>
                  <div className="float-right col-3">
                    <button type="submit" className="btn-green">Simpan</button>
                  </div>
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
        {/* <br /> <br /> <br /><br /><br /><br /> */}
      </div >
    )
  }
}
