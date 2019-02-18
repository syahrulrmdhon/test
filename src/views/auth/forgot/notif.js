import React, { Component } from 'react'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import Logo from './../../../assets/images/gredu-complete.svg'
import { Link } from 'react-router-dom'
import { AuthClient } from '../../../utils/auth-client'
import { error, modal } from './../../global/modal'

export default class Notif extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {}
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
                email: dataUser.email
            })

        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = `authentication/forgot_password`
        const forgot = {
            user: {
                email: this.state.email
            }

        }

        AuthClient('post', url, forgot).then(res => {
            modal({
                message: 'Berhasil',
                description: 'Permintaan Anda sudah dikirim ulang',
                btns: [
                    {
                        label: 'Tutup',
                        className: 'btn green',
                        // event: this.props.history.push('/notif-forgot')
                    }
                ]
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
            <div className="background">
                <div className="login">
                    <div className="row box col-12">
                        <div className="left-content col-lg-6">
                            <div className="main-left">
                                <img src={Logo} alt=""></img>
                                <br /><br />
                                <h3>Web Teacher</h3>
                            </div>
                        </div>
                        <div className="right-content-login col-lg-6">
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
                                        <span className='margin-top-6'><Link to="/" className='normal-text-green'>&nbsp;Kembali ke Login</Link></span>
                                    </div>
                                </form>
                            </div>
                            <br /><br />
                            <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
