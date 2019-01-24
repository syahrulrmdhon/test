import React, { Component } from 'react'
import Avatar from './../../assets/images/img_avatar.png'

export default class ProfileDetail extends Component {
  
  render() {
    const response = this.props.dataProfile

    return (
      <div>
        <div className="avatar-wrapper">
          <img className="avatar" src={Avatar} alt="" />
        </div>
        <div className="mt-3 name">
          {response.user.full_name}
        </div>
        <div className="ranking">
          Peringkat {response.class_rank.rank ? response.class_rank.rank : '-' }
        </div>
        <div className="profile text-left">
          <div className="field">
            <div className="label">NIS:</div>
            {response.user.nis}
        </div>
          <div className="field">
            <div className="label">NISN:</div>
            {response.user.nisn}
        </div>
          <div className="field">
            <div className="label">No. Telp:</div>
            {response.user.phone_number}
        </div>
          <div className="field">
            <div className="label">Nama Ayah:</div>
            {response.parents.father.full_name}
        </div>
          <div className="field">
            <div className="label">Nama Ibu:</div>
            {response.parents.mother.full_name}
        </div>
          <div className="field">
            <div className="label">Alamat:</div>
            {response.user.addresses[0].full_address}
        </div>
        </div>
      </div>
    )
  }
}
