import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../global/header'
import '../../../styles/student/detail.css'

import LeftSide from '../../../components/LeftSide/LeftSide'
import RightSide from '../../../components/RightSide/RightSide'
import Tab from '../../../components/TabDetail/TabDetail'

import Avatar from './../../../assets/images/img_avatar.png'

export default class Detail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  
  render() {
    const tabs = ['Rincian Nilai', 'Rincian Absensi', 'Catatan Wali Kelas'];
    return (
      <div className="detail bg-grey">
        <Header />
        <div className="bg-white">
          <div className="back">
            <Link to="">&lt; Kembali</Link>
          </div>
        </div>
        <div className="content">
          <div className="row detail-menu">
            <div className="offset-2 col-10 padding-left-0">
              <Tab tab={tabs}/>
            </div>
          </div>
          <div className="row rounded-10">
            <LeftSide>
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
            </LeftSide>
            <RightSide />
          </div>
        </div>
      </div>
    )
  }
}