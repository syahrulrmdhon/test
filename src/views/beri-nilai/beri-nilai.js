import React, { Component } from 'react';
import SingleBarChart from './../../components/chart/index'
import { Link } from 'react-router-dom'
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import TopContent from './top-content'
import TopContentEvaluasi from './evaluasi/top-content-evaluasi'
import BottomContent from './bottom-content'
import BottomContentEvaluasi from './evaluasi/bottom-content-evaluasi'
import { apiClient } from '../../utils/apiClient'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import SubjectEvaluasi from './evaluasi/subject-evaluasi';

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

            <TabPane tabId={2}>
              <div className="bg-white container-fluid container-fluid-custom rounded-corners col-12 shadow-box">
                <TopContentEvaluasi />
              </div>
              <div className="row">
                <div className="col-9 bg-white margin-right-4 margin-top-6 container-subject shadow-box">
                  <BottomContentEvaluasi />
                </div>
                <div className="col-2 margin-left-2 bg-white margin-top-6 container-subject shadow-box">
                  <div className="content-subject">
                    <SubjectEvaluasi />
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
