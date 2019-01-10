import React, { Component } from 'react'
import '../../styles/global/not-found.css'
import { NavLink } from 'reactstrap'

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>4<span></span>4</h1>
                        </div>
                        <h2>Oops! Page Not Be Found</h2>
                        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
      unavailable</p>
                        <NavLink className="font-grey" href="/home">
                            Back to Homepage
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
