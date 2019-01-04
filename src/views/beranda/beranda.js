import React, { Component } from 'react'
import Axios from 'axios'
import './../../styles/beranda.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Beranda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            error: null
        };
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
        const url = 'https://jsonplaceholder.typicode.com/users'
        Axios.get(url)
            .then(res => {
                const users = res.data;
                this.setState({ users });
                console.log('DATA', res);
            })
    }

    render() {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return (
            <div className="beranda">
                <Header></Header>
                <MenuBar></MenuBar>
                <BootstrapTable data={this.state.users} options={options}>
                    <TableHeaderColumn dataField='id' isKey dataSort>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>



        )
    }
}
export default Beranda;