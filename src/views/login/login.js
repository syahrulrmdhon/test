import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './../../styles/login.css';

import Logo from './../../assets/images/gredu-complete.svg'

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="row box col-12">
                    <div className="left-content col-lg-6">
                        <div className="main-left">
                            <img src={Logo} alt=""></img>
                            <br /><br />
                            <h3>Web Teacher</h3>
                        </div>
                    </div>
                    <div className="right-content col-lg-6">
                        <div className="main-right col-12">
                            <h5><strong>Masuk ke akun Gredu kamu</strong></h5>
                            <br />
                            <input type="text" placeholder="Alamat Email" className="col-12"></input>
                            <br />
                            <input type="text" placeholder="Kata Sandi" className="col-12"></input>
                            <br /><br />
                            <Link to='/murid' className="btn btn-young-green col-12">Masuk</Link>
                            <br /><br />
                            <p className="col-12">Lupa Kata Sandi? <Link to='' >Klik Di sini</Link></p>
                            <br />
                        </div>
                        <br /><br />
                        <p className="copyright col-12">Copyright © (2018) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;