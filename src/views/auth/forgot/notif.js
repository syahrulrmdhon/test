import React, { Component } from 'react'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import Logo from './../../../assets/images/gredu-complete.svg'
import { Link } from 'react-router-dom'

export default class Notif extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user:{}
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
                                    <h5 className='header-auth'><strong>Pengaturan Ulang Kata Sandi Telah Dikirim!</strong></h5>
                                    <br />
                                    <p className='text-left'>
                                        Kami telah mengirim pengaturan ulang kata sandi kamu ke email
                                        <span className='normal-text-green'> mario.noya@gmail.com</span>
                                    </p>
                                    <br /><br /><br /><br />
                                    <p className='float-left'>
                                        Tidak menerima email masuk?
                                    </p>
                                    <br/>
                                    <div>
                                        <button type='submit' className='btn-young-green margin-top-4 col-sm-6 float-left'>Kirim Ulang</button>
                                        <br/><br/>
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
