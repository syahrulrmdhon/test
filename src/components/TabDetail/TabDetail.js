import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import '../../styles/student/tab-menu.scss'

export default class TabDetail extends Component {
  constructor() {
    super();

    this.tabs = this.tabs.bind(this)
  }


  tabs(items) {
    console.log("tabs", items)
    const tabs = (
      <Nav className="tab-menu">
        {
          items.map((item, key) => {
          let tab = key + 1
              return (
              <NavItem key={key} className={classnames({ active: this.props.activeMenu === tab })}>
                <NavLink
                  key={key}
                  href="#"
                  onClick={() => this.props.toggle(tab)}>
                  {item}
                </NavLink>
              </NavItem>  
              )
          })
        }
      </Nav>
    )
    return tabs
  }

  render() {
    return (
      <div>
          {this.tabs(this.props.menu)}
      </div>
    )
  }
}
