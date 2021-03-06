import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../../styles/login.css'
import { apiClient } from '../../utils/apiClient'
import { getUser } from '../../utils/common'
import Logo from './../../assets/images/gredu-complete.svg';
import { Alert } from 'reactstrap';
import Error from '../global/error'
import { modal } from './../global/modal'
import Page from './../../components/Title'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visible: false,
            user: {},
            errors: {},
            schools: [],
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.setSchoolList = this.setSchoolList.bind(this)
        this.onShowAlert = this.onShowAlert.bind(this)
    }
    handleChange(e) {
        let user = {}
        user[e.target.name] = e.target.value
        this.setState(user)
    }
    handleSubmit(e) {
        e.preventDefault()
        const url = 'authentication/request_token'
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        user.email = user.email.toLowerCase()

        apiClient('post', url, user).then(res => {
            localStorage.setItem("token", res.data.data.auth_token)
            console.log(localStorage.getItem('token'),"school")
            apiClient('get', 'v1/schools/list').then(response => {
                let schools = response.data.data.schools
                let school_length = schools.length
                
                console.log("here no")
                this.setSchoolList()
                console.log("here after")

                if (school_length > 1) {
                    
                    localStorage.setItem("school_list", JSON.stringify(schools))
                    this.props.history.push('/switch')
                } else { // case school only 1
                    let school_id = schools[0].id || null
    
                    localStorage.setItem("school_id", school_id)
                    getUser(true)
                    // this.props.history.push('/home')
                }
                
                
            })

        })
            .catch(err => {
                let response = err.response
                let data = response.data
                console.log("here, error")
                let description = data.error.user_authentication.join(', ')
                // this.setSchoolList()

                modal({
                    message: 'Gagal Login',
                    description: 'Akun tidak terdaftar.'
                })
            })

    }

    onShowAlert(data) {
        this.setState({ visible: true, message: data.error.user_authentication[0] }, () => {
            window.setTimeout(() => {
                this.setState({ visible: false })
            }, 2000)
        });
    }

    setSchoolList() {
        console.log(localStorage.getItem('token'),"school")
        apiClient('get', 'v1/schools/list').then(response => {
            let schools = response.data.data.schools
            let school_length = schools.length
            
            if (school_length > 1) {
                localStorage.setItem("school_list", JSON.stringify(schools))
                this.props.history.push('/switch')
            } else { // case school only 1
                let school_id = schools[0].id || null

                localStorage.setItem("school_id", school_id)
                getUser(true)
                this.props.history.push('/home')
            }

        })
        .catch(err => {
            console.log("here, error")
            // let description = data.error.user_authentication.join(', ')
            // // this.setSchoolList()
            
        })
    }

    render() {
        const { visible, message, errors } = this.state;
        return (
            <Page title="Login">
                <div className="background">
                    <div className="login">
                        <div className="row box">
                            <div className="left-content col-md-6">
                                <div className="main-left">
                                    <img src={Logo} alt=""></img>
                                    <br /><br />
                                    <h3>Web Teacher</h3>
                                </div>
                            </div>
                            <div className="right-content-login col-md-6">
                                <div className="main-right col-12">
                                    <Alert color="danger" className="alert" isOpen={visible}>
                                        {message}
                                    </Alert>

                                    <form onSubmit={this.handleSubmit}>
                                        <h5><strong>Masuk ke akun Gredu kamu</strong></h5>
                                        <br /><br />
                                        <input type="text" name="email" onChange={this.handleChange.bind(this)} value={this.state.email} placeholder="Alamat Email" className="col-12"></input>
                                        <Error data={this.state.errors} fieldname='email' />
                                        <br /><br />
                                        <input type="password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Kata Sandi" className="col-12"></input>
                                        <Error data={this.state.errors} fieldname='password' />
                                        <br /><br />
                                        <button type="submit" className="btn btn-young-green col-12">Masuk</button>
                                        <div className='float-right margin-top-4'>
                                            <p>Lupa kata sandi?<Link to="/forgot" className='normal-text-green'> Klik Di sini</Link></p>
                                        </div>
                                        <br /><br />
                                        <br />
                                    </form>
                                </div>
                                <div className="verification">
                                    <p>Belum punya akun?<Link to="/regist"> Verifikasi Akun</Link></p>
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
export default Login;