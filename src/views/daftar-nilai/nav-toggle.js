import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default class NavToggle extends Component {
    render() {
        return (
            <span className='float-right'>
                <Nav tabs className='toggle border-0 pull-right tab-span'>
                    <NavItem className='tab-nilai'>
                        <NavLink className={classnames({ active: this.props.activeTab === '1' })} onClick={() => { this.props.toggle('1') }}>
                            Pengetahuan
                        </NavLink>
                    </NavItem>
                    <NavItem className='tab-nilai'>
                        <NavLink className={classnames({ active: this.props.activeTab === '2' })} onClick={() => { this.props.toggle('2') }}>
                            Keterampilan
                        </NavLink>
                    </NavItem>
                    <NavItem className='tab-nilai'>
                        <NavLink
                             className={classnames({ active: this.props.activeTab === '3' })} 
                            //  onClick={() => { this.props.toggle('3') }}
                            >
                            Sikap
                        </NavLink>
                    </NavItem>
                </Nav>
            </span>
        )
    }
}
