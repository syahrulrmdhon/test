import React, { Component } from 'react'
import './../../styles/absensi/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import ModalAbsensi from './modal'
import CardAbsensi from './card'
import TableAbsensi from './table'
import FilterAbsensi from './filter'

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSubmit(event) {

  }
  render() {
    return (
      <div className="absensi">
        <Header></Header>
        <MenuBar></MenuBar>
        <div className="content">
          <div className="row">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-3 left-content">
                  <FilterAbsensi />
                </div>
                <div className="col-9 center-content">
                  <TableAbsensi />
                  <button type="submit" onClick={this.handleSubmit} className="btn-green float-right col-3">Simpan</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 right">
              <CardAbsensi />
            </div>
          </div>
        </div>
      </div >
    )
  }
}
