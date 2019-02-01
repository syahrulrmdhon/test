import React, {Component} from 'react'
import Leasons from './leasons'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leasons: [
        {
          id: 1,
          task: 'Tugas 1',
          title: 'Mengidentifikasi Konotasi dalam Teks Laporan',
          scoreFilled: 38,
          haveQuestion: false,
          classAssigned: ['X IPS 2', 'X IPS 3', 'X IPS 4']
        },
        {
          id: 2,
          task: 'Tugas 2',
          title: 'Remedial Konotasi dalam Teks Laporan',
          scoreFilled: 100,
          haveQuestion: true,
          classAssigned: ['X IPS 2', 'X IPS 3', 'X IPS 4']
        },
        {
          id: 3,
          task: 'Tugas 3',
          title: 'Mengidentifikasi Denotasi dalam Teks Laporan',
          scoreFilled: 90,
          haveQuestion: true,
          classAssigned: ['X IPS 2', 'X IPS 3', 'X IPS 4', 'X IPS 5', 'X IPS 6', 'X IPS 7', 'X IPA 2', 'X IPA 3']
        },
        {
          id: 3,
          task: 'Tugas 4',
          title: 'Remedial Denotasi dalam Teks Laporan',
          scoreFilled: 64,
          haveQuestion: true,
          classAssigned: ['X IPS 2', 'X IPS 3', 'X IPS 4', 'X IPS 5', 'X IPS 6', 'X IPS 7', 'X IPA 2', 'X IPA 3']
        }
      ]
    }
  }

  render() {
    return (
      <div className="margin-top-6 margin-left-3 margin-right-6">
        <div className="row align-items-center">
          <div className="col-sm-6 exam__wrapper-title">
            <label className="header-title">Daftar Tugas</label>
            <div className="exam__topic-description">Topik 3 Memahami Makna Denotasi dan Konotasi dalam Percakapan</div>
          </div>
          <div className="col-sm-6">
            <div className="float-right">
              <a href="javascript:void(0);" className="submit-btn default">Tambah Tugas</a>
            </div>
          </div>
        </div>
        <div className="exam__wrapper-panel">
          <Leasons leasons={this.state.leasons}/>
        </div>
      </div>
    )
  }
}

export default Content;