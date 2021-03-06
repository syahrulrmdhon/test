import React, { Component } from 'react'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import Logo from './../../../assets/images/gredu-complete.svg'
import { Link } from 'react-router-dom'
import { error, modal } from './../../global/modal'
import { apiClient } from '../../../utils/apiClient'
import Page from './../../../components/Title'

export default class Notif extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            email: localStorage.getItem('email')
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = `authentication/forgot_password`
        const forgot = {
            user: {
                email: this.state.email
            }

        }
        localStorage.clear()

        apiClient('post', url, forgot).then(res => {
            modal({
                message: 'Berhasil',
                description: 'Permintaan Anda sudah dikirim ulang',
                btns: [
                    {
                        label: 'Tutup',
                        className: 'btn green',
                    }
                ]
            })
            this.setState({
                email: this.state.email
            })
        }).catch(err => {
            error({
                message: 'Gagal, email tidak terdaftar',
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
            <Page title='Reset Password'>
                <div className="background">
                    <div className="login">
                        <div className="row box">
                            <div className="left-content col-md-6">
                                <div className="main-left">
                                    <img src={Logo} alt=""></img>
                                    <br /><br />
                                    <h3>Web Teacher</h3>
                                </div>
                            </div>
                            <div className="right-content-login col-md-6">
                                <div className="main-right col-12">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <h5 className='header-auth'><strong>Pengaturan Ulang Kata Sandi Telah Dikirim!</strong></h5>
                                        <br />
                                        <p className='text-left'>
                                            Kami telah mengirim pengaturan ulang kata sandi kamu ke email
                                        <span className='normal-text-green'> {this.state.email}</span>
                                        </p>
                                        <br /><br /><br /><br />
                                        <p className='float-left'>
                                            Tidak menerima email masuk?
                                    </p>
                                        <br />
                                        <div>
                                            <button type='submit' className='btn-young-green margin-top-4 col-sm-6 float-left'>Kirim Ulang</button>
                                            <br /><br />
                                            <span className='margin-top-6'><Link to="/" className='normal-text-green'>&nbsp;Halaman Utama</Link></span>
                                        </div>
                                    </form>
                                </div>
                                <br /><br />
                                <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
