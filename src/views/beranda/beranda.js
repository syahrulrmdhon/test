import React, { Component } from 'react'
import './../../styles/beranda.css';

import Header from '../global/header';
import MenuBar from '../global/navbar';

class Beranda extends Component {
    render() {
        return (
            <div className="beranda">
                <Header></Header>
                <MenuBar></MenuBar>
            </div>
        )
    }
}
export default Beranda;