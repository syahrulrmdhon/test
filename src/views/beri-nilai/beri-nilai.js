import React, { Component } from 'react';
import SingleBarChart from './../../components/chart/index'
import { Link } from 'react-router-dom'
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import TopContent from './top-content'
import BottomContent from './bottom-content'
import { apiClient } from '../../utils/apiClient'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
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
    console.log(this.state.activeMenu, "here stat")
    return (
      <div className="detail bg-grey">
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
              <div className="bg-white container-fluid container-fluid-custom rounded-corners">
                <TopContent />
              </div>
              <div className="col-sm-9 bg-white container-fluid container-fluid-custom rounded-corners bottom-content">
                <BottomContent />
              </div>
              <div className="col-sm-2 bg-white  container-fluid-custom rounded-corners bottom-content">
                  
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}
