import React, { Component } from 'react'
import './../../styles/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

// import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Table, TabContent, Card, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
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
            <div className="col-lg-10 row">
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
                  <div className="col-12">
                    <h5><strong>Tanggal 17 Desember 2018</strong></h5>
                  </div>
                </div>
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
        <br /> <br /> <br />
      </div >
    )
  }
}
