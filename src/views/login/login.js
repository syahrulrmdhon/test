import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../../styles/login.css'
import { apiClient } from '../../utils/apiClient'
import Logo from './../../assets/images/gredu-complete.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'reactstrap';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visible:false,
            user: {},
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
    handleSubmit(email, password) {

        const url = 'authentication/request_token'
        const user = {
            email: email,
            password: password
        }

        apiClient('post', url, user).then(res => {
            localStorage.setItem("token", res.data.data.auth_token)
            this.setSchoolList()

        })
            .catch(err => {
                this.onShowAlert(err.response.data)
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
        const { visible, message } = this.state;
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

                                <h5><strong>Masuk ke akun Gredu kamu</strong></h5>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            console.log(values.email, values.password)
                                            this.handleSubmit(values.email, values.password)
                                            setSubmitting(false);
                                        }, 500);
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string()
                                            .email()
                                            .required("Email can't be empty"),
                                        password: Yup.string()
                                            .required("Password can't be empty")
                                    })}
                                >
                                    {props => {
                                        const {
                                            values,
                                            touched,
                                            errors,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit
                                        } = props;
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <br /><br />
                                                <input
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    type="text"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="col-12"
                                                />
                                                {errors.email &&
                                                    touched.email && <div className="input-feedback">{errors.email}</div>}
                                                <br /><br />
                                                <input
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    type="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="col-12"
                                                    autoComplete="off"
                                                />
                                                {errors.password &&
                                                    touched.password && <div className="input-feedback">{errors.password}</div>}
                                                <br /><br />
                                                <button type="submit" className="btn btn-young-green col-12">Masuk</button>

                                            </form>
                                        );
                                    }}
                                </Formik>
                            </div>
                            <div className="verification">
                                <p>Belum punya akun?<Link to="/"> Verifikasi Akun</Link></p>
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