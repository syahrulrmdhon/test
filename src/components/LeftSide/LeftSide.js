import React, { Component } from 'react'
import './../../styles/student/side.css'
import Avatar from './../../assets/images/img_avatar.png'

export default class LeftSide extends Component {
  render() {
    return (
      <div className="left-content col-2 border-right text-center">
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
