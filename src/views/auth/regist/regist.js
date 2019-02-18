import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Logo from './../../../assets/images/gredu-complete.svg'
import Calendar from './../../../assets/images/calendar.svg'
import './../../../styles/global/component.css'
import { AuthClient } from '../../../utils/auth-client'
import { error, modal } from './../../global/modal'
import { getDate } from './../../../utils/common'
import moment from 'moment/moment.js'

export default class Regist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uniqueCode: '',
            dob: '',
            selectedDate: new Date()
        }
    }

    handleDateChange(date) {
        let formatter = moment(date).format('YYYY-MM-DD')
        let formatted = new Date(formatter)
        this.setState({ 
            selectedDate: formatted
        })
    }
    handleChange(e) {
        let regist = {}
        regist[e.target.name] = e.target.value
        this.setState(regist)
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = `authentication/register`
        const regist = {
            unique_id: this.state.uniqueCode,
            dob: this.state.selectedDate
        }

        AuthClient('post', url, regist).then(res => {
            localStorage.setItem("token_auth", res.data.data.auth_token)
            modal({
                message: 'Berhasil',
                description: 'Data yang Anda masukkan benar',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push('/verification')
                    }
                ]
            })
        }).catch(err => {
            error({
                message: 'Gagal, data salah atau tidak lengkap',
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
                                    <p className='text-left desc'>
                                        Jika kamu belum mengetahui Unique Code untuk mendaftarkan akun, silahkan kontak email kami <span className='normal-text-green'>help@gredu.asia</span>
                                    </p>
                                    <br /><br />
                                    <br /><br />
                                    <input
                                        value={this.state.uniqueCode}
                                        onChange={this.handleChange.bind(this)}
                                        type='text' name='uniqueCode'
                                        className='w-100 margin-bottom-2'
                                        placeholder='Unique Code'

                                    />
                                    <div className='date-register'>
                                        <DatePicker
                                            className="col-sm-12"
                                            selected={this.state.selectedDate}
                                            onChange={this.handleDateChange.bind(this)}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="yyyy-MM-dd"
                                            withPortal
                                        />
                                    </div>
                                    <i className="float-right fa fa-calendar calendar-icon" aria-hidden="true" />
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
