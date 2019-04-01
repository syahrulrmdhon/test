import React, { Component } from 'react'
import '../../styles/global/not-found.css'
import Header from './header'
import { NavLink } from 'reactstrap'
import Page from './../../components/Title'
import Astronaut from './../../assets/images/astronaut.svg'
import Planet from './../../assets/images/group.svg'

export default class InternalServerError extends Component {
    render() {
        return (
            <React.Fragment>
                <Page title='Internal Server Error'>
                    <div className="padding-content">
                        <Header navbar={false}/>
                        <div className="container not-found">
                            <div className="row">
                                <div className="col-5 h-100 notfound margin">
                                    <h1>500</h1>
                                    <h2>Internal Server Error.</h2>
                                    <p>Ini benar-benar bukan Kesalahan Anda. Biarkan kami bantu Anda ke halaman yang benar.</p>
                                    <br/>
                                    <pre id="log"></pre>
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
