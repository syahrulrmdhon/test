import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../../styles/login.css'
import { apiClient } from '../../utils/apiClient'
import { getUser } from '../../utils/common'

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

        this.handleSubmit = this.handleSubmit.bind(this)
        // this.getUser = this.getUser.bind(this)
        this.setSchoolList = this.setSchoolList.bind(this)
    }
    handleChange(e) {
        let user = {}
        user[e.target.name] = e.target.value
        this.setState(user)
    }
    handleSubmit (e) {
        e.preventDefault()

        const url = 'authentication/request_token'
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        apiClient('post', url, user).then(res => {
            localStorage.setItem("token", res.data.data.auth_token)
            this.setSchoolList()

        })
    }
    setSchoolList(){
        apiClient('get', 'v1/schools/list').then(response => {
            let schools = response.data.data.schools
            let school_length = schools.length
            
            if(school_length > 1){
                localStorage.setItem("school_list", JSON.stringify(schools))
                this.props.history.push('/switch')
            } else { // case school only 1
                let school_id = schools[0].id || null 

                localStorage.setItem("school_id", school_id)
                getUser()
                this.props.history.push('/home')
            }

        })
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
                                <input type="password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Kata Sandi" className="col-12"></input>
                                <br /><br />
                                <button type="submit" className="btn btn-young-green col-12">Masuk</button>
                                <br /><br />
                                {/* <p className="col-12">Lupa Kata Sandi? <Link to='' >Klik Di sini</Link></p> */}
                                <br />
                            </form>
                        </div>
                        <br /><br />
                        <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;