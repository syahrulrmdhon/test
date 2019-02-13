import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import './../../../styles/student/tab-menu.scss'

export default class Tab extends Component {
    constructor(props) {
        super(props)
    }

    tabs(items) {
        const tabs = (
            <Nav className='margin-left-6'>
                {
                    items.map((item, key) => {
                        let tab = key + 1
                        return (
                            <NavItem key={key} className={classnames({ active: this.props.activeMenu === tab })}>
                                <NavLink key={key} href="#">
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
