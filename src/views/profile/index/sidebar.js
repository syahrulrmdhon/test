import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

//scss
import './../../../styles/profile.scss'

//data
import { sidebarMenu } from './data'

export class SideBar extends Component {
  render() {
    let content = []
    sidebarMenu.map((data) => {
      content.push(
        <NavLink
          key={Math.random()}
          to={data.link}
          className="label-menu disblock padding-2"
          activeClassName="label-menu-active"
        >
          {data.name}
        </NavLink>
      )
    })
    return (
      <div className="left-block line">
          <div className="padding-5 label-profile">
            Profil Anda
          </div>
        <div className="margin-left-5">
          {content}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
