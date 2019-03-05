import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

//scss
import './../../../styles/profile.scss'

//data
import { sidebarMenu } from './data'

export class componentName extends Component {
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
      <div className="padding-5">
        <div className="label-profile">
          Profile Anda
            </div>
        <div className="margin-top-3">
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

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
