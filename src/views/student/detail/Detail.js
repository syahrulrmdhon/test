import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../global/header'
import '../../../styles/student/detail.scss'

import LeftSide from '../../../components/LeftSide/LeftSide'
import RightSide from '../../../components/RightSide/RightSide'
import Tab from '../../../components/TabDetail/TabDetail';
import TabContent from '../../../components/TabContent/TabContent';
import Table from '../../../components/Table/Table'

import Avatar from './../../../assets/images/img_avatar.png'

export default class Detail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      activeMenu: 1
    };
    this.toggle = this.toggle.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  
  toggleMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      })
    }
  }

  render() {
    const tabMenu = ['Rincian Nilai', 'Rincian Absensi', 'Catatan Wali Kelas'];
    const tabContent = ['Pengetahuan', 'Keterampilan', 'Sikap'];
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
              <Tab menu={tabMenu} activeMenu={this.state.activeMenu} toggle={this.toggleMenu} />
            </div>
          </div>
          <div className="row rounded-10">
            <LeftSide>
              <div className="avatar-wrapper">
                <img className="avatar" src={Avatar} alt=""/>
              </div>
              <div className="mt-3">Fransiska Dominika</div>
              <div className="ranking">Peringkat 13</div>
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
            <RightSide>
              <TabContent 
                tab={tabContent} 
                className="total-score" 
                toggle={this.toggle} 
                activeTab={this.state.activeTab} />
              <Table activeTab={this.state.activeTab} />
            </RightSide>
          </div>
        </div>
      </div>
    )
  }
}