import React, { Component } from 'react'
import Avatar from './../../assets/images/avatar_def.svg'
import Avatar_male from './../../assets/images/m_avatar.svg'
import Avatar_female from './../../assets/images/f_avatar.svg'

export default class ProfileDetail extends Component {
  render() {
    let photo_url = this.props.user && this.props.user.user && this.props.user && this.props.user.user.url
    let data_photo = photo_url ? photo_url : Avatar
    const response = this.props.dataProfile
      // Edited by Risky S.
      if  (response.user.gender == 'M'){
      data_photo = Avatar_male  
      } else if(response.user.gender == 'F'){
       data_photo = Avatar_female 
      }
    return (
      <div>
        <div className="avatar-wrapper">
          <img className="avatar" src={data_photo} alt="" />
        </div>
        <div className="mt-3 detail-name">
          {response && response.user && response.user.full_name}
        </div>
        {/* <div className="ranking">
          Peringkat { response && response.class_rank && response.class_rank.rank ? response && response.class_rank && response.class_rank.rank : '-' }
        </div> */}
        <div className="profile text-left">
          <div className="field">
            <div className="label">NIS:</div>
            {response && response.user && response.user.nis}
        </div>
          <div className="field">
            <div className="label">NISN:</div>
            {response && response.user &&  response.user.nisn}
        </div>
          <div className="field">
            <div className="label">No. Telp:</div>
            {response && response.user && response.user.phone_number}
        </div>
          <div className="field">
            <div className="label">Nama Ayah:</div>
            {response && response.parents && response.parents.father && response.parents.father.full_name}
        </div>
          <div className="field">
            <div className="label">Nama Ibu:</div>
            {response && response.parents && response.parents.mother && response.parents.mother.full_name}
        </div>
          <div className="field">
            <div className="label">Alamat:</div>
            {response && response.user &&  response.user.addresses[0].full_address.street}
        </div>
        </div>
      </div>
    )
  }
}
