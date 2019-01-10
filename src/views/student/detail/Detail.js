import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../global/header'
import '../../../styles/student/detail.css'

import LeftSide from '../../../components/LeftSide/LeftSide'
import RightSide from '../../../components/RightSide/RightSide'
import Tab from '../../../components/TabDetail/TabDetail';
import TabContent from '../../../components/TabContent/TabContent';


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
    console.log(this.state.activeTab,"kimi")
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
              <Tab tabMenu={tabs} tabID={this.state.activeTab} toggle={(e) => {this.toggle}} />
            </div>
          </div>
          <div className="row rounded-10">
            <LeftSide />
            <RightSide >
            {
              console.log(tabs)
            }
                <TabContent tab={tabs} className="total-score" activeTab={this.state.activeTab}/>
           </RightSide>
          </div>
        </div>
      </div>
    )
  }
}