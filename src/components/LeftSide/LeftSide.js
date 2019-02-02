import React, { Component } from 'react'
import './../../styles/student/side.scss'

export default class LeftSide extends Component {
  render() {
    return (
      <div className="left-content col-2 border-right text-center">
          {this.props.children}
      </div>
    )
  }
}
