import React, { Component } from 'react'
import './../../styles/global/not-found.css'
import Header from './header'
import { NavLink } from 'reactstrap'
import Page from './../../components/Title'
import Koneksi from './../../assets/images/koneksi-internet.svg'

export default class NoConnection extends Component {
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }
    refresh(){
        window.history.back()
    }
    render() {
        return (
            <React.Fragment>
                <Page title='No Connection'>
                    <div className="no-connection padding-content">
                        <Header navbar={false}/>
                        <div className="container not-found no-connection">
                            <div className="row">
                                <div className="notfound margin">
                                    <img src={Koneksi}/>
                                    <h2>Koneksi internet Anda Terganggu</h2>
                                    <p>Silahkan periksa koneksi dan buka ulang situs ini.</p>
                                    <NavLink className="font-grey" onClick={this.refresh}>
                                        Muat Ulang
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
