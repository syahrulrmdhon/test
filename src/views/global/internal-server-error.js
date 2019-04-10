import React, { Component } from 'react'
import '../../styles/global/not-found.css'
import Header from './header'
import { NavLink } from 'reactstrap'
import Page from './../../components/Title'
import Illustration from './../../assets/images/all-ilustrasi.png'

export default class InternalServerError extends Component {
    constructor(props){
        super(props)
        this.refresh = this.refresh.bind(this)
    }

    refresh(){
        window.history.go(-2)
    }
    render() {
        return (
            <React.Fragment>
                <Page title='Internal Server Error'>
                    <div className="padding-content">
                        <Header navbar={false}/>
                        <div className="container not-found">
                            <div className="row">
                                <div className="col-7 h-100">
                                    <img className="illustration" src={Illustration}></img>
                                </div>
                                <div className="col-5 h-100 notfound margin">
                                    <h1>500</h1>
                                    <h2>Maaf, Halaman ini sedang kami perbaiki.</h2>
                                    <p>Semoga informasi ini tidak merusak hari Anda.<br/>Selamat Mengajar.</p>
                                    <br/>
                                    <pre id="log"></pre>
                                    <NavLink className="font-grey" onClick={this.refresh}>
                                        Refresh
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            </React.Fragment>
        )
    }
}
