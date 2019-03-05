import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'
import { error, modal } from './../../global/modal'
import { apiClient } from '../../../utils/apiClient'
import Page from "./../../../components/Title";
import './../../../styles/auth.scss'
// import { loadReCaptcha } from 'react-recaptcha-google'
// import { ReCaptcha } from 'react-recaptcha-google'

export default class Verification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            user: {},
            fullname: '',
            url: props.location
        }
        // this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        // this.verifyCallback = this.verifyCallback.bind(this);
    }
    componentDidMount() {
        this.getDataUser()
        // loadReCaptcha()
        // if (this.captchaDemo) {
        //     console.log("started, just a second...")
        //     this.captchaDemo.reset();
        //     this.captchaDemo.execute();
        // }
    }
    // onLoadRecaptcha() {
    //     if (this.captchaDemo) {
    //         this.captchaDemo.reset();
    //         this.captchaDemo.execute();
    //     }
    // }
    // verifyCallback(recaptchaToken) {
    //     console.log(recaptchaToken, "<= your recaptcha token")
    // }
    getDataUser() {
        const url = `authentication/verification_email`

        apiClient('get', url).then(res => {
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
        const url = window.location.href + '/:code&token_type=base64'
        console.log('url', url)
        const endpoint = `authentication/verification_email?url=${url}`
        const verification = {
            email: this.state.email
        }

        apiClient('post', endpoint, verification).then(res => {
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
        })
            .catch(err => {
                let errMsg = err.response.data.errors[0].description[0]
                error({
                    message: errMsg,
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
            <Page title="Verification">
                <div className="verification body-verification">
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
                                <input
                                    value={this.state.email}
                                    type='text' name='email'
                                    onChange={this.handleChange.bind(this)}
                                    className="email"
                                    placeholder='Masukkan Email Baru...'
                                />
                            </div>
                            {/* <div className='margin-top-4'>
                                <div className='row'>
                                    <div className='col-sm-offset-4 col-sm-4'> */}
                            {/* <ReCaptcha
                                        sitekey="6LfmsZIUAAAAAF6hxijf2Z1__aiR6vEz6rCuKeDe"
                                        sitekey='6LfmsZIUAAAAAPBJa8bL9KkTcvf9cd5sv-mg2-fs'
                                        onloadCallback={this.onLoadRecaptcha}
                                        verifyCallback={this.verifyCallback}
                                    /> */}
                            {/* </div>
                                </div>
                            </div> */}
                            <button type='submit' className='btn-young-green margin-top-4 button'>Daftar</button>
                        </form>
                        <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                    </div>
                </div>
            </Page >
        )
    }
}
