import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './../../styles/login.css'

import Logo from './../../assets/images/gredu-complete.svg'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: {},
            schools: []
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSchoolList = this.getSchoolList.bind(this);
    }
    handleChange(e) {
        let user = {}
        user[e.target.name] = e.target.value
        this.setState(user)
    }
    handleSubmit(e) {
        e.preventDefault()
        const self = this

        const url = (process.env.API_URL + 'authentication/request_token')
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios({
            method: 'post',
            url: url,
            data: user,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user })
        }).then(function (res) {
            console.log('DATA LOGIN', res.data.data)
            self.props.history.push('/home')
            localStorage.setItem("token", res.data.data.auth_token)
            self.getSchoolList()
        })
    }
    getSchoolList() {

        const url = (process.env.API_URL + 'v1/schools/list')
        
        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function(res) {
            console.log('SCHOOL LIST', res.data.data.schools[0].id)
            localStorage.getItem("token")
            localStorage.setItem("school_list", res.data.data.schools[0].id)
        })
    }
    componentDidMount() {
        
    }

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
                            <form onSubmit={this.handleSubmit}>
                                <h5><strong>Masuk ke akun Gredu kamu</strong></h5>
                                <br /><br />
                                <input type="text" name="email" onChange={this.handleChange.bind(this)} value={this.state.email} placeholder="Alamat Email" className="col-12"></input>
                                <br /><br />
                                <input type="text" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Kata Sandi" className="col-12"></input>
                                <br /><br />
                                <button type="submit" className="btn btn-young-green col-12">Masuk</button>
                                <br /><br />
                                <p className="col-12">Lupa Kata Sandi? <Link to='' >Klik Di sini</Link></p>
                                <br />
                            </form>
                        </div>
                        <br /><br />
                        <p className="copyright">Copyright © (2018) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;