import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
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
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table margin-table-nilai">
              <thead className="thead-light">
                <tr>
                  <th className="text-center"><i className="icon-people"></i></th>
                  <th>User</th>
                  <th className="text-center">Country</th>
                  <th>Usage</th>
                  <th className="text-center">Payment Method</th>
                  <th>Activity</th>
                </tr>
              </thead>
              
            </Table>
          </div>
      </div>
    )
  }
}


