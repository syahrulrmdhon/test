import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/student/murid.scss'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import Header from '../global/header'
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
        this.setState({
            sortName,
            sortOrder
        });
    }

    getStudentList() {
        const url = 'v1/students/list'
        
        apiClient('get', url).then(response => {
            this.setState({ data: response.data.data })
            console.log(response.data.data)
        })
    }
    getNis(cell) {
        return cell.nis;
    }
    getNisn(cell) {
        return cell.nisn;
    }
    getAttendancePrecentage(cell) {
        console.log(cell)
        return `${cell.percentage}%`
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
        console.log(options.sortName)
        console.log(options.sortOrder)
        return (
            <div className="padding-content student-list">
                <Header></Header>
                <div className="margin-8">
                    <div className="content-block">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="table-title">Daftar Murid Kelas X IPA 2</div>
                                <div className="school-year">Tahun Ajaran 2018/2019</div>
                                <BootstrapTable bordered={false} hover data={this.state.data.users} options={options} className="table-content">
                                    <TableHeaderColumn dataField="id" isKey hidden></TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="nis" dataField="student" dataFormat={this.getNis} dataSort={true}>
                                        NIS
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="nis" dataField="student" dataFormat={this.getNisn} dataSort={true}>
                                        NISN
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="name" dataField="full_name" dataSort={true}>
                                        Nama Murid
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score" className="text-center" dataField="attendance_report" dataFormat={this.getAttendancePrecentage} dataSort={true}>
                                        Kehadiran Rata-Rata
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score" className="text-center" dataField="class_rank" dataFormat={this.getScore} dataSort={true}>
                                        Nilai Rata-Rata
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score" className="text-center" dataField="class_rank" dataFormat={this.getRank} dataSort={true}>
                                        Peringkat
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DaftarMurid;