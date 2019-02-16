import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'
import { Link } from 'react-router-dom'

export default class NotifRegist extends Component {
    render() {
        return (
            <div className='verification'>
                <div className="header padding-2">
                    <img className="logo margin-left-4" src={Logo} alt="" />
                </div>
                <div className="body-gredu">
                    <div className="align-center">
                        <img src={LogoFull} />
                    </div>
                    <div className="title margin-top-6 align-center">
                        Verifikasi Email Kamu
                    </div>
                    <div className="info align-center margin-top-4">
                        Selamat datang di Gredu Web Teacher, kami telah mengirim verifikasi ke email
                        <span className='normal-text-green'> mario.noya@gmail.com</span>
                    </div>
                    <div className="info align-center">
                        Silahkan periksa email Anda dan klik tautan untuk memverifikasi akun.
                    </div>
                    <div className="confirm align-center margin-top-6">
                        Tidak menerima email verifikasi?
                        <span className='normal-text-green'>
                            <Link to='/verification'>&nbsp;Kirim Ulang</Link>
                        </span>
                    </div>
                    <div className="confirm margin-top-2">
                        Email kamu salah?
                        <span className='normal-text-green'>
                            <Link to='/verification'>&nbsp;Ubah Email</Link>
                        </span>
                    </div>
                    <div className='contact margin-top-2'>
                        Ada kendala di akun ini?
                        <span className='normal-text-green'>
                            <Link to='/verification'>&nbsp;Hubungi Gredu</Link>
                        </span>
                    </div>
                    {/* <p className="contact">Ada kendala di akun ini?</p> */}
                    <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                </div>
            </div>
        )
    }
}
