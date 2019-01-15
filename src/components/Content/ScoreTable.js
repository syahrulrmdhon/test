import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TabContent, TabPane } from 'reactstrap'
import Axios from 'axios'

import '../../styles/student/table.scss'

export default class ScoreTable extends Component {
  constructor(props) {
    super(props);
   this.state = {
    users: [],
    modal: false
  };
}

  componentDidMount() {
    Axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const users = res.data;
      this.setState({
        users
      });
    })
  }
  
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
                  {
                    this.state.users.map( (user, index) => {
                      return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.company.catchPhrase}</td>
                        <td>{user.id}</td>
                        <td>{user.id}</td>
                        <td><Link to="">Lihat Deskripsi</Link></td>
                      </tr>
                    })
                  }
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
                {
                  this.state.users.map( (user, index) => {
                    return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.company.catchPhrase}</td>
                        <td>{user.id}</td>
                        <td>{user.id}</td>
                        <td><Link to="">Lihat Deskripsi</Link></td>
                      </tr>
                    })
                  }
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
                {
                  this.state.users.map( (user, index) => {
                    return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.company.catchPhrase}</td>
                        <td>{user.address.zipcode}</td>
                        <td>
                          <div className="status">
                            <div className="indicator red-indicator"></div>Butuh Perhatian
                          </div>
                        </td> 
                      </tr>
                    })
                  }
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
