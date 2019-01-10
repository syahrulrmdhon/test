import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default class TabDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
    };

    this.tabs = this.tabs.bind(this)
  }

  toogle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  tabs(items) {
    const tabs = (
      <div>
        {items.map((item, key) => {
          let tab = key + 1
              return (
              <NavItem key={key} className={classnames({ active: tab === this.state.activeTab })}>
                <NavLink
                  key={key}
                  href="#"
                  onClick={() => { this.toogle(tab); }}>
                  {item}
                </NavLink>
              </NavItem>  
              )
        }, this)}
      </div>
    )
    return tabs
  }

  render() {
    return (
      <div>
        <Nav>
          {this.tabs(this.props.tab)}
        </Nav>
      </div>
    )
  }
}
