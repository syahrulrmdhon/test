import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from '../../components/Content/Content'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

export default class Detail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      activeMenu: 1,
      homeroomTeacherActiveTab : 1,
      startDate: null,
      endDate: null
    };
    this.toggle = this.toggle.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.homeroomTeacherTab =  this.homeroomTeacherTab.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)

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

  homeroomTeacherTab(tab) {
    if (this.state.homeroomTeacherActiveTab !== tab) {
      this.setState({
        homeroomTeacherActiveTab: tab
      })
    }
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    const tabMenu = ['Rincian Nilai', 'Rincian Absensi', 'Catatan Wali Kelas'];
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
              <TabMenu menu={tabMenu} activeMenu={this.state.activeMenu} toggle={this.toggleMenu} />
            </div>
          </div>
          <Content activeTab={this.state.activeMenu}/>
        </div>
      </div>
    )
  }
}