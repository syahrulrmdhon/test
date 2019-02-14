import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import '../../styles/global/tab-content.scss'

export default class ContentTab extends Component {
  constructor() {
    super();
    this.tabs = this.tabs.bind(this)
  }

  tabs(items) {
    const tabs = (
      <Nav tabs>
        {
          items.map((item, key) => {
          let tab = key + 1
          return (
            <NavItem key={key} className="nav__tab-content">
              <NavLink
                className={classnames({ active: this.props.activeTab === tab })}
                key={key}
                href="#"
                onClick={() =>  this.props.toggle(tab)}>
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
      <div className={["tab-wrapper", this.props.class].join(' ')}>
        {this.tabs(this.props.tab)}
      </div>
    )
  }
}
