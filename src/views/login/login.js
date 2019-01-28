import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../../styles/login.css'
import { apiClient } from '../../utils/apiClient'
import Logo from './../../assets/images/gredu-complete.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'reactstrap';
import { getDate, setError } from '../../utils/common'
import Error from '../global/error'




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visible:false,
            user: {},
            errors: {},
            schools: [],
            message:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUser = this.getUser.bind(this)
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

        apiClient('post', url, user).then(res => {
            localStorage.setItem("token", res.data.data.auth_token)
            this.setSchoolList()

        })
            .catch(err => {
                let response = err.response
                let data = response.data
                console.log(this.state.email, this.state.password, "here")
                if(this.state.email || this.state.password === ''){
                    this.setState({
                        errors: setError(data),
                    })
                }else{
                    this.onShowAlert(data)
                    console.log("or here")
                }
                

            })
    }

    onShowAlert(data){
        this.setState({visible:true,message:data.error.user_authentication[0]},()=>{
          window.setTimeout(()=>{
            this.setState({visible:false})
          },2000)
        });
    }

    setSchoolList() {
        apiClient('get', 'v1/schools/list').then(response => {
            let schools = response.data.data.schools
            let school_length = schools.length

            if (school_length > 1) {
                localStorage.setItem("school_list", schools)
                this.props.history.push('/switch')
            } else { // case school only 1
                let school_id = schools[0].id || null

                localStorage.setItem("school_id", school_id)
                this.getUser()
                this.props.history.push('/home')
            }

        })
    }
    getUser() {
        const url = 'v1/users'
        apiClient('get', url).then(res => {
            localStorage.setItem("user_id", res.data.data.user.id)

            if (res.data.data.homeroom_class != null) {
                localStorage.setItem("class_id", res.data.data.homeroom_class.id)
            }

            // attribute full
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            localStorage.setItem("school", JSON.stringify(res.data.data.school))
            localStorage.setItem("current_period", JSON.stringify(res.data.data.current_period))
            localStorage.setItem("homeroom_class", JSON.stringify(res.data.data.homeroom_class))
        })
    }
    render() {
        const { visible, message,errors } = this.state;
        console.log(errors,"my err")
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

                                <Alert color="danger" className="alert" isOpen={visible}>
                                        {message}
                                </Alert>

                                <form onSubmit={this.handleSubmit}>
                                <h5><strong>Masuk ke akun Gredu kamu</strong></h5>
                                <br /><br />
                                <input type="text" name="email" onChange={this.handleChange.bind(this)} value={this.state.email} placeholder="Alamat Email" className="col-12"></input>
                                <Error data={this.state.errors} fieldname= 'email' />
                                <br /><br />
                                <input type="password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Kata Sandi" className="col-12"></input>
                                <Error data={this.state.errors} fieldname= 'password' />
                                <br /><br />
                                <button type="submit" className="btn btn-young-green col-12">Masuk</button>
                                <br /><br />
                                <br />
                                </form>
                            </div>
                            <div className="verification">
                                <p>Belum punya akun?<Link to="/verification"> Verifikasi Akun</Link></p>
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
export default Login;

{/* <form onSubmit={this.handleSubmit}>
<h5><strong>Masuk ke akun Gredu kamu</strong></h5>
<br /><br />
<input type="text" name="email" onChange={this.handleChange.bind(this)} value={this.state.email} placeholder="Alamat Email" className="col-12"></input>
<br /><br />
<input type="password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Kata Sandi" className="col-12"></input>
<br /><br />
<button type="submit" className="btn btn-young-green col-12">Masuk</button>
<br /><br />
<br />
</form> */}