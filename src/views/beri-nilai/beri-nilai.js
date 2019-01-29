import React, { Component } from 'react';
import  SingleBarChart  from './../../components/chart/index'
import { Link } from 'react-router-dom'
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from '../../components/Content/Content'
import { apiClient } from '../../utils/apiClient'

export default class Nilai extends Component {
  constructor(props){
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
    const tabMenu = ['Perolehan Nilai'];

    return (
      <div className="detail bg-grey">
        <Header navbar={false} />
        <div className="content-wrapper content-wrap-custom-size ">
          <div className="row detail-menu">
            <div className="offset-2 col-10 tab-menu">
              <TabMenu 
                menu={tabMenu}
                activeMenu={this.state.activeMenu}
                toggle={this.toggleMenu} />
            </div>
          </div>
          <Content 
            activeTab={this.state.activeMenu}
         />
        </div>
      </div>
    )
  }
}
