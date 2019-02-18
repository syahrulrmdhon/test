import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'
import { AuthClient } from './../../../utils/auth-client'
import { error, modal } from './../../global/modal'

export default class Verification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            user: {},
            fullname: '',
            url: props.location
        }
    }
    componentDidMount() {
        this.getDataUser()
    }
    getDataUser() {
        const url = `authentication/verification_email`

        AuthClient('get', url).then(res => {
            let dataUser = res.data.data.user
            this.setState({
                user: dataUser,
                fullname: dataUser.full_name
            })

        })
    }
    handleChange(e) {
        let verification = {}
        verification[e.target.name] = e.target.value
        this.setState(verification)
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = window.location.href + '/:code'
        const endpoint = `authentication/verification_email?url=${url}:code`
        const verification = {
            email: this.state.email
        }

        AuthClient('post', endpoint, verification).then(res => {
            modal({
                message: 'Berhasil',
                description: 'Periksa kotak masuk email Anda',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push('/notif-regist')
                    }
                ]
            })
        }).catch(err => {
            error({
                message: 'Gagal, ulangi lagi',
                btns: [
                    {
                        label: 'Ulangi',
                        className: 'btn bcred cwhite'
                    }
                ]
            })
        })
    }
    render() {
        return (
            <div className="verification">
                <div className="header padding-2">
                    <img className="logo margin-left-4" src={Logo} alt="" />
                </div>
                <div className="body-gredu">
                    <div className="align-center">
                        <img src={LogoFull} />
                    </div>
                    <div className="title margin-top-6 align-center">
                        Selamat Datang! {this.state.fullname}
                    </div>
                    <div className="info align-center margin-top-6">
                        Berikut informasi Akun kamu yang terdaftar di data kami. Informasi ini
                    </div>
                    <div className="info align-center">
                        digunakan untuk keperluan Login. Mohon cek kembali!
                    </div>
                    <div className="direct align-center margin-top-6">
                        Masukkan email baru
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="margin-top-6">
                            <div className="row">
                                <div className="col-sm-offset-4 col-sm-4">
                                    <input
                                        value={this.state.email}
                                        type='text' name='email'
                                        onChange={this.handleChange.bind(this)}
                                        className="email fullwidth padding-4"
                                        placeholder='Masukkan Email Baru...'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='margin-top-6'>
                            <div className='row'>
                                <div className='col-sm-offset-4 col-sm-4'>
                                    <button type='submit' className='btn-young-green margin-top-4'>Daftar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                </div>
            </div>
        )
    }
}
