import React, { Component } from 'react'
import UpArrow from './../../assets/images/up-green-arrow.png'
import DownArrow from './../../assets/images/down-red-arrow.png'


export default class ArrowKeterampilan extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const data = this.props.arrow || {}
    let arrow = ""
    if (data === "up") {
      arrow = <img src={UpArrow} alt="" />
    } else if (data === "down") {
      arrow = <img src={DownArrow} alt="" />
    }
    return (
      <span className="arrow">{arrow}</span>
    )
  }
}
