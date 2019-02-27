import React, { Component } from 'react'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import Logo from './../../../assets/images/gredu-complete.svg'
import { Link } from 'react-router-dom'
import { AuthClient } from '../../../utils/auth-client'
import { error, modal } from './../../global/modal'
import Page from './../../../components/Title'


export default class Forgot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
    }
    handleChange(e) {
        let forgot = {}
        forgot[e.target.name] = e.target.value
        this.setState(forgot)
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
            localStorage.setItem('email', res.data.data.user.email)
            modal({
                message: 'Berhasil',
                description: 'Permintaan Anda sudah dikirim',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push('/notif-forgot')
                    }
                ]
            })
        }).catch(err => {
            let errMsg = err.response.data.errors[0].desc
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
            <Page id="Forgot Password">
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
                                        <h5 className='header-auth'><strong>Lupa Kata Sandi</strong></h5>
                                        <br />
                                        <p className='text-left'>
                                            Silahkan masukan email kamu, kami akan mengirimkan pengaturan ulang kata sandi kamu.
                                    </p>
                                        <br /><br />
                                        <input
                                            value={this.state.email}
                                            onChange={this.handleChange.bind(this)}
                                            type='text' name='email'
                                            placeholder='Alamat Email'
                                            className='col-sm-12'
                                        />
                                        <br /><br />
                                        <button type='submit' className='btn-young-green margin-top-4'>
                                            Kirim
                                    </button>
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
            </Page>
        )
    }
}
