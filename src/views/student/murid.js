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
            let data = response.data.data.users
            data.map(student => {
                student.nis = student.student.nis
                student.nisn = student.student.nisn
                student.percentage = student.attendance_report.percentage
                student.score = student.class_rank.score ? student.class_rank.score : '-'
                student.rank = student.class_rank.rank ? student.class_rank.rank: '-'
            })
            this.setState({data: data})
        })
    }
    
    getAttendancePrecentage(cell) {
        if (cell === null) {
            cell = '-'
        }
        else {
            cell = `${cell}%`
        }
        return `${cell}`
    }
    
    onRowClick(row) {
        this.props.history.push('detail/' + row.id);
    }

    componentDidMount() {
        this.getStudentList()
    }

    render() {
        const options = {
            onRowClick: this.onRowClick
        };
        return (
            <div className="padding-content student-list">
                <Header></Header>
                <div className="margin-8">
                    <div className="content-block">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="table-title">Daftar Murid Kelas X IPA 2</div>
                                <div className="school-year">Tahun Ajaran 2018/2019</div>
                                <BootstrapTable bordered={false} hover data={this.state.data} options={options} className="table-content">
                                    <TableHeaderColumn dataField="id" isKey hidden></TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="nis" dataField="nis" dataSort>
                                        NIS
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="nis" dataField="nisn" dataSort>
                                        NISN
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="student-detail__name" dataField="full_name" dataSort>
                                        Nama Murid
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score" className="text-center" dataField="percentage" dataFormat={this.getAttendancePrecentage} dataSort>
                                        Kehadiran Rata-Rata
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score text-center" className="text-center" dataField="score" dataSort>
                                        Nilai Rata-Rata
                                    <i className="fa fa-sort"></i>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn columnClassName="score text-center" className="text-center" dataField="rank" dataSort>
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