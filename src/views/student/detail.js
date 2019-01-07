import React, { Component } from 'react'
import Header from '../global/header'
import '../../styles/student/detail.css'
// import '../../styles/global/component.css'

import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import Avatar from './../../assets/images/img_avatar.png'
import Print from './../../assets/images/print_new.svg'
import Export from './../../assets/images/export_new.svg'

export default class Detail extends Component {


  constructor(props) {
    super(props);

    this.showDetail = this.showDetail.bind(this);
    this.state = {
        activeMenu: '1',
        activeTab: '1'
    };
}

  showDetail(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      });
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <div className="detail bg-grey">
        <Header />
        <div className="bg-white">
          <div className="back">
            <a href="#">&lt; <span>Kembali</span></a>
          </div>
        </div>
        <div className="content">
          <div className="row detail-menu">
            <div className="offset-3 col-9 padding-left-0">
              <Nav tabs>
                <NavItem className={classnames({ active: this.state.activeMenu === '1' })}>
                  <NavLink 
                    href="#"
                    onClick={() => { this.showDetail('1'); }}>
                    Rincian Nilai
                  </NavLink>
                </NavItem>
                <NavItem className={classnames({ active: this.state.activeMenu === '2' })}>
                  <NavLink
                    href="#"                    
                    onClick={() => { this.showDetail('2'); }}>
                    Rincian Absensi
                  </NavLink>
                </NavItem>
                <NavItem className={classnames({ active: this.state.activeMenu === '3' })}>
                  <NavLink
                    href="#"
                    onClick={() => { this.showDetail('3'); }}>
                    Catatan Wali Kelas
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <div className="row rounded-10">
            <div className="left-content col-3 border-right text-center">
              <div className="avatar-wrapper">
                <img className="avatar" src={Avatar} />
              </div>
              <div className="font-weight-bold mt-3">
                Fransiska Dominika
              </div>
              <div className="ranking">
                Peringkat 13
              </div>
              <div className="profile text-left">
                <div className="field">
                  <div className="label">NIS:</div>
                  13010036
                </div>
                <div className="field">
                  <div className="label">NISN:</div>
                  9965682223
                </div>
                <div className="field">
                  <div className="label">No. Telp:</div>
                  082200909087
                </div>
                <div className="field">
                  <div className="label">Nama Ayah:</div>
                  King Spinka Sr.
                </div>
                <div className="field">
                  <div className="label">Nama Ibu:</div>
                  Carole Barton Ph D
                </div>
                <div className="field">
                  <div className="label">Alamat:</div>
                  Jl. Taman Nasional 13
                </div>                  
              </div>
            </div>
            <div className="right-content col-9 padding-left-6 padding-right-6 padding-top-6">
              <Nav tabs className="border-0 pull-left">
                <NavItem className="tab-score">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}>
                    Pengetahuan
                  </NavLink>
                </NavItem>
                <NavItem className="tab-score">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}>
                    Keterampilan
                  </NavLink>
                </NavItem>
                <NavItem className="tab-score">
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}>
                    Sikap
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="pull-right">
                <span className="print">
                  <img src={Export} />
                  Ekspor Semua Nilai
                </span>
                <span className="export">
                  <img src={Print} /> 
                  Cetak Semua Nilai
                </span>
              </div>
              <div className="clearfix" />
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="table-content">
                    <Table bordered striped responsive hover>
                      <thead>
                        <tr>
                          <th className="text-left">Mata Pelajaran</th>
                          <th className="text-left">Deskripsi</th>
                          <th>Nilai Rapor</th>
                          <th>Predikat</th>
                          <th>Deskripsi Lainnya</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Matematika</td>
                          <td>Sangat baik dalam menjelaskan pecahan-pecahan senilai dengan gambar</td>
                          <td>91</td>
                          <td>A</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr>
                          <td>Pendidikan Kewarganegaraan</td>
                          <td>Baik dalam kompetensi menyebutkan sistem pemerintahan</td>
                          <td>83</td>
                          <td>B</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr>
                          <td>Bahasa Indonesia</td>
                          <td>Baik dalam membuat kalimat essay menggunakan KTSP</td>
                          <td>88</td>
                          <td>B</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr>
                          <td>Bahasa Inggris</td>
                          <td>Kurang baik memahami tenses</td>
                          <td>68</td>
                          <td>C</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr>
                          <td>Pendidikan Agama</td>
                          <td>Cukup memahami sikap teladan di lingkungan sekolah</td>
                          <td>78</td>
                          <td>C</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr>
                          <td>Sejarah Umum</td>
                          <td>Kurang memahami jenis-jenis peradaban sebelum perang dunia</td>
                          <td>68</td>
                          <td>D</td>
                          <td>Lihat Deskripsi</td>
                        </tr>
                        <tr className="total-score">
                          <td colSpan="2" className="border-right-0">Jumlah Nilai Pengetahuan</td>
                          <td className="border-left-0 border-right-0 text-center">350.0</td>
                          <td className="border-left-0 border-right-0"></td>
                          <td className="border-left-0"></td>
                        </tr>
                        <tr className="average-score">
                          <td colSpan="2" className="border-right-0">Nilai Pengetahuan Rata-Rata</td>
                          <td className="border-left-0 border-right-0 text-center">83.33</td>
                          <td className="border-left-0 border-right-0"></td>
                          <td className="border-left-0"></td>
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
    )
  }
}
