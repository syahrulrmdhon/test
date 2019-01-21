import React, { Component } from 'react'
import './../../styles/student/murid.css'
import './../../styles/global/component.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import { apiClient } from '../../utils/apiClient'


class DaftarMurid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            error: null,
            data: []
        };

        this.onSortChange = this.onSortChange.bind(this)
        this.getStudentList = this.getStudentList.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
    }

    onSortChange(sortName, sortOrder) {
        console.info('onSortChange', arguments)
        this.setState({
            sortName,
            sortOrder
        });
    }

    getStudentList() {
        const url = 'v1/students/list'
        
        apiClient('get', url).then(response => {
            this.setState({ data: response.data.data })
        })
    }
    getNis(cell) {
        return cell.nis;
    }
    getNisn(cell) {
        return cell.nisn;
    }
    getAttendancePrecentage(cell) {
        return cell.percentage
    }
    getScore(cell) {
        return cell.score
    }
    getRank(cell) {
        return cell.rank
    }
    onRowClick(row) {
        this.props.history.push('detail/' + row.id);
    }
    componentDidMount() {
        this.getStudentList()
        
    }

    render() {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange,
            onRowClick: this.onRowClick
        };
        return (
            <div className="murid">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row">
                        <div className="right-content col-12">
                            <h5><strong>Daftar Murid Kelas X IPA 2</strong></h5>
                            <h6>Tahun Ajaran 2018/2019</h6>
                            <br />
                            <BootstrapTable hover striped data={this.state.data.users} options={options} className="table-content">
                                <TableHeaderColumn dataField="id" isKey hidden></TableHeaderColumn>
                                <TableHeaderColumn dataField="student" dataFormat={this.getNis} dataSort={true}>
                                    NIS
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="student" dataFormat={this.getNisn} dataSort={true}>
                                    NISN
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="full_name" tdStyle={{ color: "blue", cursor: "pointer" }} dataSort={true}>
                                    Nama Murid
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="attendance_report" dataFormat={this.getAttendancePrecentage} dataSort={true}>
                                    Kehadiran Rata-Rata
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="class_rank" dataFormat={this.getScore} dataSort={true}>
                                    Nilai Rata-Rata
                                <i className="fa fa-sort"></i>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="class_rank" dataFormat={this.getRank} dataSort={true}>
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