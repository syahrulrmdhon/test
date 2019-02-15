import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Logo from './../../assets/images/gredu-complete.svg'
import Calendar from './../../assets/images/calendar.svg'
import './../../styles/global/component.css'

export default class Regist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
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
                                    <h5><strong>Daftarkan akun Gredu kamu</strong></h5>
                                    <br />
                                    <p className='text-left'>Jika kamu belum mengetahui Unique Code untuk mendaftarkan akun, silahkan kontak email kami help@gredu.asia
                                    </p>
                                    <br /><br />
                                    <input type='text' name='unique_code' placeholder='Unique Code' className='col-sm-12'></input>
                                    <br /><br />
                                    <input type='text' name='dob' className='col-sm-11'
                                        placeholder='yyyy-mm-dd'>
                                    </input>
                                    <button type='submit' className='btn-young-green margin-top-4'>Daftar</button>
                                    <div className='float-right margin-top-4'>
                                        <p>Sudah punya akun?<Link to="/"> Login Disini</Link></p>
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
