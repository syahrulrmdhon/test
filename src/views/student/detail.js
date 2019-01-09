import React, { Component } from 'react'
import Header from '../global/header'
import '../../styles/student/detail.css'

import { Nav, NavItem, NavLink } from 'reactstrap'
import Table from './table'
import Side from './side'
import classnames from 'classnames'
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
            <div className="offset-2 col-10 padding-left-0">
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
            <div className="left-content col-2 border-right text-center">
              <Side />
            </div>
            <div className="right-content col-10 padding-left-6 padding-right-6 padding-top-6">
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
              <Table tab={this.state.activeTab}/>   
            </div>
          </div>
        </div>
      </div>
    )
  }
}
