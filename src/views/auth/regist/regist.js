import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Logo from './../../../assets/images/gredu-complete.svg'
import './../../../styles/global/component.css'
import { error, modal } from './../../global/modal'
import moment from 'moment/moment.js'
import { apiClient } from '../../../utils/apiClient'
import { getDate } from './../../../utils/common'
import  Page  from "./../../../components/Title";

export default class Regist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uniqueCode: '',
            dob: '',
            selectedDate: null
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

        apiClient('post', url, regist).then(res => {
            localStorage.setItem('regist_token', res.data.data.auth_token)
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
            let errMsg = err.response.data.errors[0].desc
            error({
                message: errMsg,
                btns: [
                    {
                        label: 'Tutup',
                        className: 'btn bcred cwhite'
                    }
                ]
            })
        })
    }
    render() {
        return (
            <Page title="Registration"> 
            <div className='background'>
                <div className='login'>
                    <div className='row box col-sm-12'>
                        <div className='left-content col-sm-6'>
                            <div className='main-left'>
                                <img src={Logo} alt=''></img>
                                <br /><br />
                                <h3>Web Teacher</h3>
                            </div>
                        </div>
                        <div className='right-content-login col-sm-6'>
                            <div className='main-right col-sm-12'>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <h5 className='header-auth'><strong>Daftarkan akun Gredu kamu</strong></h5>
                                    <br />
                                    <p className='text-left desc'>
                                        Jika kamu belum mengetahui Kode Unik untuk mendaftarkan akun, silahkan kontak email kami <span className='normal-text-green'>help@gredu.asia</span>
                                    </p>
                                    <br /><br />
                                    <br /><br />
                                    <input
                                        value={this.state.uniqueCode}
                                        onChange={this.handleChange.bind(this)}
                                        type='text' name='uniqueCode'
                                        className='w-100 margin-bottom-2'
                                        placeholder='Kode Unik'

                                    />
                                    <div className='auth'>
                                        <DatePicker
                                            className='col-sm-12'
                                            selected={this.state.selectedDate}
                                            onChange={this.handleDateChange.bind(this)}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode='select'
                                            dateFormat='yyyy-MM-dd'
                                            value={getDate('case-1', this.state.selectedDate)}
                                            placeholderText='Tanggal Lahir'
                                        >
                                            <div style={{ color: '#4a4a4a', fontSize: '12px', textAlign: 'center' }}>
                                                Pilih Tanggal Lahir Anda
                                            </div>
                                        </DatePicker>
                                    </div>
                                    <i className='float-right fa fa-calendar calendar-auth' aria-hidden='true' />
                                    <button type='submit' className='btn-young-green margin-top-4'>Daftar</button>
                                    <div className='float-right margin-top-4'>
                                        <p>Sudah punya akun?<Link to='/' className='normal-text-green'> Masuk Disini</Link></p>
                                    </div>
                                </form>
                            </div>
                            <br /><br />
                            <p className='copyright'>Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                        </div>
                    </div>
                </div>
            </div>
            </Page>
        )
    }
}
