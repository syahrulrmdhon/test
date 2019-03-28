import React, { Component } from 'react'
import '../../styles/global/not-found.css'
import Header from './header'
import { NavLink } from 'reactstrap'
import Page from './../../components/Title'
import Astronaut from './../../assets/images/astronaut.svg'
import Planet from './../../assets/images/group.svg'

export default class NotFound extends Component {
    render() {
        return (
            <React.Fragment>
                <Page title='Page Not Found'>
                    <div className="padding-content">
                        <Header navbar={false}/>
                        <div className="container not-found">
                            <div className="row">
                                <div className="col-5 h-100 notfound margin">
                                    <h1>404</h1>
                                    <h2>Halaman yang Anda cari tidak ada.</h2>
                                    <p>Biarkan kami bantu Anda ke halaman yang benar</p>
                                    <NavLink className="font-grey" href="/home">
                                        Halaman Depan
                                    </NavLink>
                                </div>
                                <div className="col-7 h-100">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="planet" src={Planet}></img>
                                        </div>
                                        <div className="col-8">
                                            <img src={Astronaut}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            </React.Fragment>
        )
    }
}
