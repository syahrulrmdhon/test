import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import Letter from './../../../assets/images/letter@3x.png'
import { Link } from 'react-router-dom'
import { error, modal } from './../../global/modal'
import { apiClient } from '../../../utils/apiClient'
import Page from './../../../components/Title'

export default class NotifRegist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            email: ''
        }
    }
    componentDidMount() {
        this.getDataUser()
    }
    getDataUser() {
        const url = `authentication/verification_email`

        apiClient('get', url).then(res => {
            let dataUser = res.data.data.user
            this.setState({
                user: dataUser,
                email: dataUser.email
            })

        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = window.location.href + '/:code&token_type=base64'
        const endpoint = `authentication/verification_email?url=${url}`
        const data = {
            email: this.state.email
        }

        apiClient('post', endpoint, data).then(res => {
            modal({
                message: 'Berhasil',
                description: 'Email sudah terkirim, cek kembali email Anda',
                btns: [
                    {
                        label: 'Selesai',
                        className: 'btn green',
                        event: this.props.history.push('/notif-regist')
                    }
                ]
            })
        }).catch(err => {
            error({
                message: 'Email sudah terkirim, cek kembali email Anda',
                btns: [
                    {
                        label: 'Tutup',
                        className: 'btn bcred cwhite'
                    }
                ]
            })
        })
    }
    render() {
        return (
            <Page title='Verification'>
                <div className='verification'>
                    <div className="header padding-2">
                        <img className="logo margin-left-4" src={Logo} alt="" />
                    </div>
                    <div className="body-gredu">
                        <div className="align-center">
                            <img src={Letter} />
                        </div>
                        <div className="title margin-top-6 align-center">
                            Verifikasi Email Kamu
                    </div>
                        <div className="info align-center margin-top-4">
                            Selamat datang di Gredu Web Teacher, kami telah mengirim verifikasi ke email
                        <span className='normal-text-green'> {this.state.email}</span>
                        </div>
                        <div className="info align-center">
                            Silahkan periksa email Anda dan klik tautan untuk memverifikasi akun.
                    </div>
                        <div className="confirm align-center margin-top-6">
                            Tidak menerima email verifikasi?
                        <span className='normal-text-green' onClick={this.handleSubmit.bind(this)}>
                                Kirim Ulang
                        </span>
                        </div>
                        <div className="confirm margin-top-2">
                            Kirim email verifikasi ke email lain?
                        <span className='normal-text-green'>
                                <Link to='/verification'>Ubah Email</Link>
                            </span>
                        </div>
                        <div className='contact margin-top-2'>
                            Ada kendala di akun ini?
                        <span className='normal-text-green'>
                                <a href="mailto:help@gredu.asia">Hubungi Gredu</a>
                            </span>
                        </div>

                    </div>
                </div>
            </Page>
        )
    }
}
