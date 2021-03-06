import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../global/header'
import Page from './../../components/Title'
import Sidebar from './index/sidebar'
import { apiClient } from './../../utils/apiClient'
import Select from 'react-select'
import User from './../../assets/images/avatar_def.svg'
import User_male from './../../assets/images/m_avatar.svg'
import User_female from './../../assets/images/f_avatar.svg'
import DatePicker from 'react-datepicker'
import {
  getUSer,
  getRegion,
  handlingInputText,
  handlingInputSelectRegion,
  handleRemoveProfilePicture
} from './../../redux-modules/modules/user'
import { bindActionCreators } from 'redux';
import { getDate } from './../../utils/common'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { error, modal } from './../global/modal'
import {
  region,
  cities,
  getUser
} from './../../utils/common'


// scss
import './../../styles/profile.scss'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export class Basic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      regionOptions: [],
      citiesOptions: [],
      cityDefaultOpt: [],
      base64: '',

    }
    this.submit = this.submit.bind(this)
    this.onCofirm = this.onCofirm.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleRegion = this.handleRegion.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.onPreviewPhoto = this.onPreviewPhoto.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.handleProfilePicture = this.handleProfilePicture.bind(this);
  }

  componentDidMount() {
    this.props.getUSer()
    region.call(this, false, {
      regionOptions: true,
    })

    cities.call(this, false, {
      cityDefaultOpt: true,
    })
    const url = 'v1/users'
      apiClient('get', url).then(res => {
          localStorage.setItem("user", JSON.stringify(res.data.data.user))
      })
    // window.location.href="/profile/basic-information"


  }

  handleRegion(e, props) {
    this.props.handlingInputSelectRegion(e, props)
    let region_id = this.props.region && this.props.region.user && this.props.region.user.data && this.props.region.user.data.user && this.props.region.user.data.user.address_attributes && this.props.region.user.data.user.address_attributes.region_id
    this.handleCity(region_id)
  }


  handleCity(region) {
    apiClient('get', `/v1/filters/cities?region_id=${region}`).then(response => {
      let city = response.data.data.cities || []
      const temps = city
      let cities = []

      temps.map((temp, idx) => {
        cities.push({
          value: temp.id,
          label: temp.name,
        })
      })

      this.setState({
        citiesOptions: cities,
      })
    })
  }


  handleChange(date) {
    this.props.handlingInputText(date, 'dob')
    this.setState({
      startDate: this.props.user && this.props.user.user && this.props.user && this.props.user.user.dob
    });
  }

  handleProfilePicture(data) {
    let userObj = {}
    let datas = {
      profile_url: '',
    }
    userObj['user'] = datas

    // attribute full
    let url = `/v1/users/update_basic_info`
    apiClient('put', url, userObj).then(res => {
      getUser(false)
      window.location.reload(true)
    })
      .catch(err => {
        let response = err.response
        let data = response.data.status_code
        if (data === 400) {
          error({
            message: 'Gagal semua form harus diisi',
            btns: [
              {
                label: 'Ulangi',
                className: 'btn bcred cwhite'
              }
            ]
          })
        }
      })
  }

  confirmDelete(e) {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose, onConfirm }) => {
        return (
          <div className="react-confirm-alert modal-alert">
            <div className="react-confirm-alert-body">
              <div className="header align-center">
                <h1>Apakah anda yakin Menghapus Foto Profil? </h1>
              </div>
              <div className="react-confirm-alert-button-group toggle">
                <div className="align-center fullwidth">
                  <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                  <a href="javascript:void(0);" className="btn green" onClick={() => { this.handleProfilePicture(''); }}>Yakin</a>
                </div>
              </div>
            </div>
          </div>
        )
      },
    })
  }

  onCofirm(e) {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose, onConfirm }) => {
        return (
          <div className="react-confirm-alert modal-alert">
            <div className="react-confirm-alert-body">
              <div className="header align-center">
                <h1>Simpan Perubahan </h1>
              </div>
              <div className="react-confirm-alert-button-group toggle">
                <div className="align-center fullwidth">
                <div className="disblock margin-bottom-3">
                    <span className="description">Perubahan dilakukan. Apakah anda ingin menyimpannya?</span>
                </div>
                  <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                  <a href="javascript:void(0);" className="btn green" onClick={() => { this.submit(); }}>Yakin</a>
                </div>
              </div>
            </div>
          </div>
        )
      },
    })
  }

  submit() {
    let userObj = {}
    let data_attitbutes = this.props.user && this.props.user.user && this.props.user.user.address_attributes
    let data = {
      address_attributes: data_attitbutes,
      dob: this.props.user && this.props.user.user && this.props.user.user.dob,
      pob: this.props.user && this.props.user.user && this.props.user.user.pob,
      email: this.props.user && this.props.user.user && this.props.user.user.email,
      phone_number: this.props.user && this.props.user.user && this.props.user.user.phone_number,
      profile_url: this.state.base64.split(",")[1],
      full_name: this.props.user && this.props.user.user && this.props.user.user.full_name,
    }
    userObj['user'] = data

    console.log(this.state.base64.split(",")[0],"type")



    // attribute full
    let url = `/v1/users/update_basic_info`
    apiClient('put', url, userObj).then(res => {
      getUser(true)
      window.location.reload(true)

    })
      .catch(err => {
        let response = err.response
        let data = response.data.status_code
        if (data === 400) {
          error({
            message: 'Gagal semua form harus diisi',
            btns: [
              {
                label: 'Ulangi',
                className: 'btn bcred cwhite'
              }
            ]
          })
        }
      })


  }

  onPreviewPhoto(evt) {
    var files = evt.target.files;
    for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      var reader = new FileReader();
      console.log(files, "onvent")
      reader.onload = ((event) => {
        this.setState({
          base64: event.target.result
        })
        document.getElementById("image").src = event.target.result
      })
      reader.readAsDataURL(file);
    
    }
  }


  render() {
    let full_name = this.props.user && this.props.user.user && this.props.user && this.props.user.user.full_name
    let address = this.props.user && this.props.user.user && this.props.user && this.props.user.user.address_attributes && this.props.user.user.address_attributes.street
    let region = this.props.region && this.props.region.user && this.props.region.user.data && this.props.region.user.data.user && this.props.region.user.data.user.address_attributes && this.props.region.user.data.user.address_attributes.region_id
    let city = this.props.region && this.props.region.user && this.props.region.user.data && this.props.region.user.data.user && this.props.region.user.data.user.address_attributes && this.props.region.user.data.user.address_attributes.city_id
    let postal_code = this.props.user && this.props.user.user && this.props.user && this.props.user.user.address_attributes && this.props.user.user.address_attributes.postal_code
    let phone = this.props.user && this.props.user.user && this.props.user && this.props.user.user.phone_number
    let email = this.props.user && this.props.user.user && this.props.user && this.props.user.user.email
    let dob = this.props.user && this.props.user.user && this.props.user && this.props.user.user.dob
    let pob = this.props.user && this.props.user.user && this.props.user && this.props.user.user.pob
    let photo_url = this.props.user && this.props.user.user && this.props.user && this.props.user.user.url
    let gender = this.props.user && this.props.user.user && this.props.user && this.props.user.user.gender

    let check_dob = dob ? dob : null

    let select_region = []
    let select_city = []
    let data_cities = this.state.citiesOptions.length === 0 ? this.state.cityDefaultOpt : this.state.citiesOptions
    select_region.push(
      <Select
          key={Math.random()}
        classNamePrefix="select"
        className="fullwidth"
        placeholder="Masukan Nama Provinsi"
        value={this.state.regionOptions.find((element) => { return element.value === region })}
        options={this.state.regionOptions}
        onChange={(e) => { this.handleRegion(e, 'region_id') }}
      />
    )

    select_city.push(
      <Select
          key={Math.random()}
        classNamePrefix="select"
        className="fullwidth"
        placeholder="Masukan Nama Kota Kecamatan"
        value={data_cities.find((element) => { return element.value === city })}
        options={data_cities}
        onChange={(e) => { this.props.handlingInputSelectRegion(e, 'city_id') }}
      />
    )

    dob = dob ? dob : new Date()
    let action = []
    if (photo_url === '' || photo_url === null) {
      action.push(
        <div className="col-sm-12" key={Math.random()}>
          <label htmlFor="1" className="pointer padding-2 border-full label-upload label-text">
            Unggah Foto Baru
          <i className="margin-left-2 fa fas fa-upload"></i>
          </label>
          <input type="file" className="button-upload" onChange={this.onPreviewPhoto} id="1" />

        </div>
      )
    } else {
      action.push(
        <div key={Math.random()} className="col-sm-12">
          <label htmlFor="1" className="pointer padding-2 border-full label-upload label-text">
            Unggah Foto Baru
          <i className="margin-left-2 fa fas fa-upload"></i>
          </label>
          {/* <label htmlFor="1" className="pointer margin-left-2 padding-2 border-full hapus-foto label-text">
            Hapus Foto
          </label> */}
          <input type="file" className="button-upload" onChange={this.onPreviewPhoto} id="1" />
        </div>
      )
    }

    let data_photo = photo_url ? photo_url : User
    let style = ''
    if (data_photo == User) {
      style = 'remove-profile hide'
      if (gender == 'M'){
        data_photo = User_male
      }else if(gender == 'F'){
        data_photo = User_female
      }
    } else {
      style = 'remove-profile'
    }
    return (
      <Page title="Basic Information">
        <Header />
        <div className="basic">
          <div className="padding-content">
            <div className="margin-content">
              <div className="content-block main-block fit-screen">
                <div className="row">
                  <div className="col-sm-2">
                    <Sidebar />
                  </div>
                  <div className="col-sm-10 right-block">
                    <div className="padding-top-3 padding-left-4 ">
                      <form name="form" id="form">
                        <div className="margin-top-5">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="col-sm-1">
                                <div className={style}>
                                  <i className="fa fa-close" onClick={this.confirmDelete}></i>
                                </div>
                                <img id="image" src={data_photo} className="profile-photo" alt="/" />
                              </div>
                              <div className="col-sm-6 margin-left-6 margin-top-2">
                                {action}
                                <div className="col-sm-12">
                                  <div className="notice margin-top-2">
                                    Besar file maksimum: 1 Mb
                                </div>
                                  <div className="notice margin-top-1">
                                    Ekstensi file yang diperbolehkan: .PNG, jpg,jpeg dan gif.
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                          </div>
                        </div>
                        <div className="form-position padding-top-4">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="padding-top-3">
                                <label>Nama Lengkap</label>
                                <div className="padding-top-1 input-group ">
                                  <input
                                    type="text"
                                    className="col-sm-12  form-outine"
                                    placeholder="Masukan Nama Lengkap"
                                    defaultValue={full_name ? full_name : ''}
                                    onChange={(e) => { this.props.handlingInputText(e, 'full_name') }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-position padding-top-2">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="padding-top-3">
                                <label>Alamat</label>
                                <div className="padding-top-1 input-group ">
                                  <input
                                    type="text"
                                    className="col-sm-12  form-outine"
                                    placeholder="Masukan Alamat"
                                    defaultValue={address ? address : ''}
                                    onChange={(e) => { this.props.handlingInputText(e, 'street') }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-position padding-top-2">
                          <div className="row">
                            <div className="fullwidth">
                              <div className="padding-top-3">
                                <div className="col-sm-4">
                                  <label>Provinsi</label>
                                  <div className="padding-top-1 input-group ">
                                    {select_region}
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <label>Kota Kecamatan</label>
                                  <div className="padding-top-1 input-group ">
                                    {select_city}
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <label>Kode Pos</label>
                                  <div className="padding-top-1 input-group ">
                                    <input
                                      type="text"
                                      className="col-sm-12  form-outine"
                                      placeholder="Masukan Nama Kode Pos"
                                      defaultValue={postal_code ? postal_code : ''}
                                      onChange={(e) => { this.props.handlingInputText(e, 'postal_code') }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-position padding-top-2">
                          <div className="row">
                            <div className="fullwidth">
                              <div className="padding-top-3">
                                <div className="col-sm-4">
                                  <label>No. Telp</label>
                                  <div className="padding-top-1 input-group ">
                                    <input
                                      type="number"
                                      className="fullwidth"
                                      placeholder="Masukan Nama Provinsi"
                                      defaultValue={phone ? phone : ''}
                                      onChange={(e) => { this.props.handlingInputText(e, 'phone_number') }}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <label>Email</label>
                                  <div className="padding-top-1 input-group ">
                                    <input
                                      type="text"
                                      className="col-sm-12  form-outine"
                                      placeholder="Masukan Nama Kode Pos"
                                      defaultValue={email ? email : ''}
                                      onChange={(e) => { this.props.handlingInputText(e, 'email') }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-position padding-top-2">
                          <div className="row">
                            <div className="fullwidth">
                              <div className="padding-top-3">
                                <div className="col-sm-4">
                                  <label>Tanggal Lahir</label>
                                  <div className="padding-top-1">
                                    <DatePicker
                                      className='fullwidth'
                                      selected={this.state.startDate ? this.state.startDate : check_dob}
                                      onChange={this.handleChange}
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode='select'
                                      dateFormat='yyyy-MM-dd'
                                      // defaultValue={dob ? getDate('case-1', new Date(dob)) : new Date()}
                                      placeholderText='Tanggal Lahir'
                                    >
                                      <div style={{ color: '#4a4a4a', fontSize: '12px', textAlign: 'center' }}>
                                        Pilih Tanggal Lahir Anda
                                    </div>
                                    </DatePicker>
                                    <i className='float-right fa fa-calendar icon-calender' aria-hidden='true' />

                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <label>Tempat Lahir</label>
                                  <div className="padding-top-1 input-group ">
                                    <input
                                      type="text"
                                      className="col-sm-12  form-outine"
                                      placeholder="Masukan Nama Tempat Lahir"
                                      defaultValue={pob ? pob : ''}
                                      onChange={(e) => { this.props.handlingInputText(e, 'pob') }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="form-position padding-top-4">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="padding-top-3 padding-bottom-3">
                              <button
                                className="submit-btn"
                                onClick={this.onCofirm}
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user && state.user.data,
  region: state

})



const mapDispatchToProps = dispatch => bindActionCreators(
  { 
    getUSer, 
    getRegion,
    handlingInputText,
    handlingInputSelectRegion,
    handleRemoveProfilePicture
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Basic)
