import React, { Component } from 'react'
import Avatar from './../../assets/images/img_avatar.png'
import './../../styles/student/side.css'

export default class Side extends Component {
  render() {
    return (
      <div>
        <div className="avatar-wrapper">
          <img className="avatar" src={Avatar} />
        </div>
        <div className="font-weight-bold mt-3">
          Fransiska Dominika
              </div>
        <div className="ranking">
          Peringkat 13
              </div>
        <div className="profile text-left">
          <div className="field">
            <div className="label">NIS:</div>
            13010036
                </div>
          <div className="field">
            <div className="label">NISN:</div>
            9965682223
                </div>
          <div className="field">
            <div className="label">No. Telp:</div>
            082200909087
                </div>
          <div className="field">
            <div className="label">Nama Ayah:</div>
            King Spinka Sr.
                </div>
          <div className="field">
            <div className="label">Nama Ibu:</div>
            Carole Barton Ph D
                </div>
          <div className="field">
            <div className="label">Alamat:</div>
            Jl. Taman Nasional 13
          </div>
        </div>
      </div>
    )
  }
}
