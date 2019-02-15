import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/beri-nilai/main.scss'
import Logo from './../../assets/images/gredu-complete.svg'
import { Link } from 'react-router-dom'

export default class Forgot extends Component {
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
                                <form onSubmit={this.handleSubmit}>
                                    <h5 className='header-auth'><strong>Lupa Kata Sandi</strong></h5>
                                    <br />
                                    <p className='text-left'>
                                        Silahkan masukan email kamu, kami akan mengirimkan pengaturan ulang kata sandi kamu.
                                    </p>
                                    <br /><br />
                                    <input type='text' name='email' placeholder='Alamat Email' className='col-sm-12'></input>
                                    <br /><br />
                                    <button type='submit' className='btn-young-green margin-top-4'>Daftar</button>
                                    <div className='float-right margin-top-4'>
                                        <p>Sudah ingat kata kunci?<Link to="/" className='normal-text-green'> Login Disini</Link></p>
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
