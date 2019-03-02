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
    const tabs = (
      <Nav>
        {
          items.map((item, key) => {
            let label = item.label
            let categories = item.categories
            let tab = key + 1
            let view = []
            let flag = true
            if(this.props.assessment_category){
              if(!categories.includes(this.props.assessment_category)){
                flag = false
              }
            }

            if(flag){
              view.push(
                <NavItem key={key} className={classnames({ active: this.props.activeMenu === tab })}>
                  <NavLink
                    key={key}
                    href="#"
                    onClick={() => this.props.toggle(tab)}>
                    {label}
                  </NavLink>
                </NavItem>
              )
            }
              return (  
                <div key={key}>
                  {view}
                </div>
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
