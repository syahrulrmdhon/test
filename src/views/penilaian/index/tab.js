import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default class Tab extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="margin-top-4">
                <Nav tabs className="toggle">
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.props.activeTab === 'knowledge' })}
                        onClick={() => { this.props.tabToggle('knowledge'); }}
                        >
                        Pengetahuan
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.props.activeTab === 'skill' })}
                        onClick={() => { this.props.tabToggle('skill'); }}
                        >
                        Keterampilan
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.props.activeTab === 'attitude' })}
                        onClick={() => { this.props.tabToggle('attitude'); }}
                        >
                        Sikap
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}