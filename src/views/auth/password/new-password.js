import React, { Component } from 'react'
import Avatar from 'react-avatar'
import Ava from './../../../assets/images/img_avatar.png'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'

export default class NewPassword extends Component {
    render() {
        return (
            <div className='verification'>
                <div className="header padding-2">
                    <img className="logo margin-left-4" src={Logo} alt="" />
                </div>
                <div className="body-gredu">
                    <div className="align-center">
                        <Avatar src={Ava} size="70" round={true} />
                    </div>
                    <div className="margin-top-4 align-center">
                        <i className='fa fa-camera'></i>
                        <span className='info'> Change Profile Photo</span>
                    </div>
                    <div className="direct align-center margin-top-6 margin-bottom-4">
                        Buat Password Baru Kamu
                    </div>
                    <form>
                        <input type='text' name='password' placeholder='Kata Kunci' className='input'></input>
                        <input type='text' name='re-password' placeholder='Ketik Kembali Kata Kunci' className='input margin-top-2'></input>
                    </form>
                    <div className='margin-top-6'>
                        <div className='row'>
                            <div className='col-sm-offset-4 col-sm-2'>
                                <button type='submit' className='btn-white margin-top-4'>Kembali</button>
                            </div>
                            <div className='col-sm-2'>
                                <button type='submit' className='btn-young-green margin-top-4'>Selesai</button>
                            </div>
                        </div>
                    </div>
                    <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                </div>
            </div>
        )
    }
}
