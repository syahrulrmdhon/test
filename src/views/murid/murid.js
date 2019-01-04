import React, { Component } from 'react'
import Axios from 'axios'
import './../../styles/murid.css'
import './../../styles/global/component.css'
// import { Table } from 'reactstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

class DaftarMurid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onSortChange(sortName, sortOrder) {
        console.info('onSortChange', arguments);
        this.setState({
            sortName,
            sortOrder
        });
    }

    componentDidMount() {
        Axios.get(process.env.API_URL + '/users')
            .then(res => {
                const users = res.data;
                this.setState({ users });

            })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {

    }

    render() {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return (
            <div className="murid">
                <Header></Header>
                <MenuBar></MenuBar>
                <br /><br />
                <div className="content">
                    <div className="row">
                        <div className="right-content col-12">
                            <h5><strong>Daftar Murid Kelas X IPA 2</strong></h5>
                            <h6>Tahun Ajaran 2018/2019</h6>
                            <br />
                            <BootstrapTable striped data={this.state.users} options={options} className="table-content">
                                <TableHeaderColumn dataField='id' isKey dataSort={true}>
                                    NIS
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='email' dataSort={true}>
                                    NISN
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='username' dataSort={true}>
                                    Nama Murid
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='username' dataSort={true}>
                                    Kehadiran Rata-Rata
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='username' dataSort={true}>
                                    Nilai Rata-Rata
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='username' dataSort={true}>
                                    Peringkat
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DaftarMurid;