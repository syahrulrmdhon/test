import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../global/header'
import Page from './../../components/Title'
import Sidebar from './index/sidebar'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { error, modal } from './../global/modal'
import { apiClient } from './../../utils/apiClient'


// scss
import './../../styles/profile.scss'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: {
                old_pass: 'password',
                new_pass: 'password',
                confirm_pass: 'password'
            },
            value: {
                old_pass_value: '',
                new_pass_value: '',
                confirm_pass_value: ''
            }
        }

        this.onShow = this.onShow.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
        this.onCofirm = this.onCofirm.bind(this)
    }

    onCofirm(e) {
        e.preventDefault()

        confirmAlert({
            customUI: ({ onClose, onConfirm }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>Apakah anda yakin? </h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                                    <a href="javascript:void(0);" className="btn green" onClick={() => { this.submit();  }}>Yakin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    submit() {
        const { value } = this.state
        let userObj = {}
        let user = {
            previous_password: value.old_pass_value,
            new_password: value.new_pass_value,
            new_password_confirmation: value.confirm_pass_value
        }

        userObj['user'] = user

        if(value.new_pass_value !== value.confirm_pass_value){
            console.log("here")
            error({
                message: 'Kata sandi harus sama',
                btns: [
                    {
                        label: 'Ulangi',
                        className: 'btn bcred cwhite'
                    }
                ]
            })
        }else{
            let url = `/v1/users/change_password`
            apiClient('put', url, userObj).then(res => {
                localStorage.clear()
              modal({
                message: 'Berhasil',
                description: 'Password Berhasil diubah',
                btns: [
                  {
                    label: 'Lanjut',
                    className: 'btn green',
                    event: this.props.history.push({
                     pathname:'/'
                    })
                  }
                ]
              })
            })
              .catch(err => {
                let response = err.response
                let data = response.data.status_code
                if(data === 400) {
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

    }

    onShow(e, props) {
        e.preventDefault();
        e.stopPropagation();

        let type = this.state.type
        type[props] = type[props] === 'input' ? 'password' : 'input'
        this.setState({
            type: type
        })
    }

    onChange(e, props) {
        e.preventDefault()

        let value = this.state.value
        value[props] = e.target.value
        this.setState({
            value: value
        })

    }
    render() {
        const { type, value } = this.state
        return (
            <Page title="Ganti Kata Sandi">
                <Header />
                <div className="password">
                    <div className="padding-content">
                        <div className="margin-8">
                            <div className="content-block main-block fit-screen">
                                <div className="row">
                                    <div className="col-sm-2 left-block fit-screen">
                                        <Sidebar />
                                    </div>
                                    <div className="col-sm-10 right-block">
                                        <div className="padding-top-6 padding-left-4 ">
                                            <div className="title">
                                                Ubah Kata Sandi
                                            </div>
                                            <div className="form padding-top-5">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="padding-top-3">
                                                            <label>Kata Sandi Lama</label>
                                                            <div className="padding-top-1 input-group ">
                                                                <input
                                                                    type={type.old_pass}
                                                                    className="col-sm-3  form-outine"
                                                                    placeholder="Masukan Kata Sandi Lama"
                                                                    value={value.old_pass_value}
                                                                    onChange={(e) => { this.onChange(e, 'old_pass_value') }}
                                                                />
                                                                <div className="input-group-prepend ">
                                                                    <span className="input-group-text " onClick={(e) => { this.onShow(e, 'old_pass') }} >
                                                                        <i className="fa far fa-eye"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="padding-top-3">
                                                            <label>Kata Sandi Baru</label>
                                                            <div className="padding-top-1 input-group ">
                                                                <input
                                                                    type={type.new_pass}
                                                                    className="col-sm-3  form-outine"
                                                                    placeholder="Kata Sandi Baru"
                                                                    value={value.new_pass_value}
                                                                    onChange={(e) => { this.onChange(e, 'new_pass_value') }}
                                                                />
                                                                <div className="input-group-prepend ">
                                                                    <span className="input-group-text " onClick={(e) => { this.onShow(e, 'new_pass') }} >
                                                                        <i className="fa far fa-eye"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="padding-top-3">
                                                            <label>Ulangi Kata Sandi Baru</label>
                                                            <div className="padding-top-1 input-group ">
                                                                <input
                                                                    type={type.confirm_pass}
                                                                    className="col-sm-3  form-outine"
                                                                    placeholder="Ulangi Kata Sandi Baru"
                                                                    value={value.confirm_pass_value}
                                                                    onChange={(e) => { this.onChange(e, 'confirm_pass_value') }}
                                                                />
                                                                <div className="input-group-prepend ">
                                                                    <span className="input-group-text " onClick={(e) => { this.onShow(e, 'confirm_pass') }} >
                                                                        <i className="fa far fa-eye"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="margin-top-12">
                                                            <button
                                                                className="submit-btn default"
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
