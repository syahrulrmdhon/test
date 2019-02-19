import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Logo from './../../../assets/images/gredu-complete.svg'
import Calendar from './../../../assets/images/calendar.svg'
import './../../../styles/global/component.css'
import { AuthClient } from '../../../utils/auth-client'
import { error, modal } from './../../global/modal'

export default class Regist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // startDate: new Date(),
            uniqueCode: '',
            dob: ''
        }
    }
    handleChange(e) {
        console.log(e.target.value)
        let regist = {}
        regist[e.target.name] = e.target.value
        this.setState(regist)
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = `authentication/register`
        const regist = {
            unique_id: this.state.uniqueCode,
            dob: this.state.dob
        }

        AuthClient('post', url, regist).then(res => {
            localStorage.setItem("token_auth", res.data.data.auth_token)
            modal({
                message: 'Selamat',
                description: 'Data yang Anda masukkan benar',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push('/verification')
                    }
                ]
            })
        }).catch(err=>{
            console.log(err)
            error({
                message: 'Gagal, akun user tidak ditemukan',
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
                                    <h5 className='header-auth'><strong>Daftarkan akun Gredu kamu</strong></h5>
                                    <br />
                                    <p className='text-left'>
                                        Jika kamu belum mengetahui Unique Code untuk mendaftarkan akun, silahkan kontak email kami <span className='normal-text-green'>help@gredu.asia</span>
                                    </p>
                                    <br /><br />
                                    <br /><br />
                                    <input
                                        value={this.state.uniqueCode}
                                        onChange={this.handleChange.bind(this)}
                                        type='text' name='uniqueCode'
                                        className='col-sm-12 margin-bottom-2'
                                        placeholder='Unique Code'
                                    />
                                    <input
                                        value={this.state.dob}
                                        onChange={this.handleChange.bind(this)}
                                        type='text' name='dob'
                                        className='col-sm-12'
                                        placeholder='yyyy-mm-dd'
                                    />
                                    <button type='submit' className='btn-young-green margin-top-4'>Daftar</button>
                                    <div className='float-right margin-top-4'>
                                        <p>Sudah punya akun?<Link to="/login" className='normal-text-green'> Login Disini</Link></p>
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
