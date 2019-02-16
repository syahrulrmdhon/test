import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'

export default class Verification extends Component {
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
                        Selamat Datang! Mario Noya
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
                    <div className="margin-top-6">
                        <div className="row">
                            <div className="col-sm-offset-4 col-sm-4">
                                <input className="email fullwidth padding-4" placeholder='Masukkan Email Baru...'>
                                </input>
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
                    <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                </div>
            </div>
        )
    }
}
