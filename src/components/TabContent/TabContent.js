import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import Table from '../Table/Table'
import '../../styles/tab-content.css'

export default class ContentTab extends Component {
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
      <Nav>
        {items.map((item, key) => {
          let tab = key + 1
          return (
            <NavItem key={key} className="tab-score">
              <NavLink
                className={classnames({ active: tab === this.state.activeTab })}
                key={key}
                href="#"
                onClick={() => { this.toogle(tab); }}>
                {item}
              </NavLink>
            </NavItem>
          )
        }, this)}
      </Nav>

    )
    return tabs
  }

  render() {
    return (
      <div>
          {this.tabs(this.props.tab)}
          <Table tab={this.state.activeTab} />
      </div>
    )
  }
}
