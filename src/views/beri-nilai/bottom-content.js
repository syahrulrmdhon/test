import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import {
  Table,
} from 'reactstrap';
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'

var FontAwesome = require('react-fontawesome');

export default class componentName extends Component {
  render() {
    return (
      <div className="bottom-contents">
        <div className="row  title-content">
          <div className="col-sm-6 ">
            <span>Hasil Perolehan Nilai</span>
          </div>
          <div className="col-sm-3">
            <Select
              classNamePrefix='select'
              placeholder='Urutkan Berdasarkan' />
          </div>
          <div className="col-sm-3">
            <div className="search-in-table">
              <input className="input-field" type="text" placeholder="Cari murid disini..." name="search" />
              <i className="fa fa-search icon"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Table responsive className="table-outline mb-0 d-none d-sm-table custom-table">
              <thead className="thead-light">
                <tr>
                  <th col="2">Nama Murid</th>
                  <th className="text-left">Email</th>
                  <th>Nilai</th>
                  <th className="text-center">Beri Nilai</th>
                  <th>Rincian</th>
                </tr>
              </thead>
              <tbody className="">
                <tr><th></th></tr>
                <tr className="tbody-table-nilai spacer highlighted">
                  <td className="text-left left-col">
                    <div className="col-sm-7 avatar">
                      <Avatar src={Ava} size="40" round={true} />
                    </div>
                    <div className="col-sm-2">
                      <span className="name">Yiorgos Avraamu</span>
                    </div>
                  </td>
                  <td >tritika@ensyspace.com</td>
                  <td className="label-nilai">N/A</td>
                  <td ><FontAwesome name="pencil" width="30" /></td>
                  <td ><FontAwesome name="ellipsis-h" size="50" /></td>
                </tr>
                <tr><th></th></tr>
                <tr className="tbody-table-nilai spacer highlighted">
                  <td className="text-left left-col">
                    <div className="col-sm-7 avatar">
                      <Avatar src={Ava} size="40" round={true} />
                    </div>
                    <div className="col-sm-2">
                      <span className="name">Yiorgos Avraamu</span>
                    </div>
                  </td>
                  <td >tritika@ensyspace.com</td>
                  <td className="label-nilai">N/A</td>
                  <td ><FontAwesome name="pencil" width="30" /></td>
                  <td ><FontAwesome name="ellipsis-h" size="50" /></td>
                </tr>
                
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}


