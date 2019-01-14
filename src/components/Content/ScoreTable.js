import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TabContent, TabPane } from 'reactstrap'

import '../../styles/student/table.scss'

export default class ScoreTable extends Component {
  render() {
    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane className="knowledge" tabId={1}>
            <div className="table-content">
              <Table bordered striped responsive>
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
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>Baik dalam kompetensi menyebutkan sistem pemerintahan</td>
                    <td>83</td>
                    <td>B</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Bahasa Indonesia</td>
                    <td>Baik dalam membuat kalimat essay menggunakan KTSP</td>
                    <td>88</td>
                    <td>B</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Bahasa Inggris</td>
                    <td>Kurang baik memahami tenses</td>
                    <td>68</td>
                    <td>C</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Pendidikan Agama</td>
                    <td>Cukup memahami sikap teladan di lingkungan sekolah</td>
                    <td>78</td>
                    <td>C</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Sejarah Umum</td>
                    <td>Kurang memahami jenis-jenis peradaban sebelum perang dunia</td>
                    <td>68</td>
                    <td>D</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr className="total-score">
                    <td colSpan="2" className="border-right-0 text-center">Jumlah Nilai Pengetahuan</td>
                    <td className="border-left-0 border-right-0 text-center">350.0</td>
                    <td className="border-left-0 border-right-0"></td>
                    <td className="border-left-0"></td>
                  </tr>
                  <tr className="average-score">
                    <td colSpan="2" className="border-right-0 text-center">Nilai Pengetahuan Rata-Rata</td>
                    <td className="border-left-0 border-right-0 text-center">83.33</td>
                    <td className="border-left-0 border-right-0"></td>
                    <td className="border-left-0"></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
          <TabPane className="knowledge" tabId={2}>
            <div className="table-content">
              <Table bordered striped responsive>
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
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>Baik dalam kompetensi menyebutkan sistem pemerintahan</td>
                    <td>83</td>
                    <td>B</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Bahasa Indonesia</td>
                    <td>Baik dalam membuat kalimat essay menggunakan KTSP</td>
                    <td>88</td>
                    <td>B</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Bahasa Inggris</td>
                    <td>Kurang baik memahami tenses</td>
                    <td>68</td>
                    <td>C</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Pendidikan Agama</td>
                    <td>Cukup memahami sikap teladan di lingkungan sekolah</td>
                    <td>78</td>
                    <td>C</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr>
                    <td>Sejarah Umum</td>
                    <td>Kurang memahami jenis-jenis peradaban sebelum perang dunia</td>
                    <td>68</td>
                    <td>D</td>
                    <td><Link to="">Lihat Deskripsi</Link></td>
                  </tr>
                  <tr className="total-score">
                    <td colSpan="2" className="border-right-0 text-center">Jumlah Nilai Pengetahuan</td>
                    <td className="border-left-0 border-right-0 text-center">350.0</td>
                    <td className="border-left-0 border-right-0"></td>
                    <td className="border-left-0"></td>
                  </tr>
                  <tr className="average-score">
                    <td colSpan="2" className="border-right-0 text-center">Nilai Pengetahuan Rata-Rata</td>
                    <td className="border-left-0 border-right-0 text-center">83.33</td>
                    <td className="border-left-0 border-right-0"></td>
                    <td className="border-left-0"></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </TabPane>
          <TabPane className="attitude" tabId={3}>
            <div className="table-content">
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th className="text-left">Mata Pelajaran</th>
                    <th className="text-left">Keterangan</th>
                    <th>Tanggal Penilaian</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matematika</td>
                    <td>Memukul Jeremy dan Doni dengan penggaris besi</td>
                    <td>14/11/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator red-indicator"></div>Butuh Perhatian
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>Meminjamkan payung ketika hujan ke saya</td>
                    <td>3/10/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator blue-indicator"></div>Sangat Baik
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Bahasa Indonesia</td>
                    <td>Baik dalam membuat kalimat essay menggunakan KTSP</td>
                    <td>14/11/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator red-indicator"></div>Butuh Perhatian
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Bahasa Inggris</td>
                    <td>Kurang baik memahami tenses</td>
                    <td>3/10/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator blue-indicator"></div>Sangat Baik
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Pendidikan Agama</td>
                    <td>Cukup memahami sikap teladan di lingkungan sekolah</td>
                    <td>14/11/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator red-indicator"></div>Butuh Perhatian
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Sejarah Umum</td>
                    <td>Kurang memahami jenis-jenis peradaban sebelum perang dunia</td>
                    <td>3/10/2018</td>
                    <td>
                      <div className="status">
                        <div className="indicator blue-indicator"></div>Sangat Baik
                        </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="total-status">
                <div className="pull-left">
                  Total Sikap Butuh Perhatian
                  <br />
                  Total Sikap Sangat Baik
                </div>
                <div>
                  3 (<span>tiga</span>)
                  <br />
                  5 (<span>lima</span>)
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
