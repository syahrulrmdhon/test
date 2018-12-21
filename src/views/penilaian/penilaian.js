import React, { Component } from 'react'
import './../../styles/penilaian.css';

import Header from '../global/header';
import MenuBar from '../global/navbar';

class Penilaian extends Component {
    render() {
        return (
            <div className="penilaian">
                <Header></Header>
                <MenuBar></MenuBar>
            </div> 
        )
    }
}
export default Penilaian;