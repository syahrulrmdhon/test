import React, { Component } from 'react';
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import TopContent from './top-content'
import BottomContent from './bottom-content'
import { TabContent, TabPane } from 'reactstrap'
import RightContent from './right-content'
export default class Nilai extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeMenu: 1,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      })
    }
  }

  render() {
    const tabMenu = ['Perolehan Nilai', 'Evaluasi Soal'];
    return (
      <div className="details-nilai bg-grey">
        <Header navbar={false} />
        <div className="content-wrapper content-wrap-custom-size ">
          <div className="row detail-menu">
            <div className="offset-2 col-sm-10 tab-menu tab-position">
              <TabMenu
                menu={tabMenu}
                activeMenu={this.state.activeMenu}
                toggle={this.toggleMenu}
              />
            </div>
          </div>
          <TabContent activeTab={this.state.activeMenu}>
            <TabPane tabId={1} >
              {/* <div className="bg-white container-fluid container-fluid-custom rounded-corners">
                <TopContent />
              </div>
              <div className="row">
                <div className="col-sm-9 ">
                 <div className="bg-white container-fluid-custom rounded-corners bottom-content"> 
                  <BottomContent />
                </div>
              </div>
              <div className="col-sm-3 ">
                <div className="bg-white  rounded-corners bottom-content padding-2">
                     <RightContent />
                </div>
              </div>
              </div> */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="content-block main-block">
                  <TopContent />
                  </div>
                </div>
              </div>
              <div className="row margin-top-4">
                <div className="col-sm-9">
                  <div className="content-block main-block">
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="content-block main-block">
                  </div>
                </div>
              </div>
              
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}


