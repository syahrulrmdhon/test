import React, { Component } from 'react'
import './../../styles/global/component.css'
import './../../styles/student/murid.scss'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Header from '../global/header'
import { apiClient } from '../../utils/apiClient'
import Page from  './../../components/Title'
import Loader from './../global/loader'

class DaftarMurid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            error: null,
            data: [],
            schoolYear: ''
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
                // student.score = student.class_rank.score ? student.class_rank.score : '-'
                student.knowledge_score = student.class_rank.knowledge.score ? student.class_rank.knowledge.score: '-'
                student.skill_score = student.class_rank.skill.score ? student.class_rank.skill.score: '-'
                student.attitude_score = student.class_rank.attitude.score ? student.class_rank.attitude.score: '-'
                student.overall_rank = student.class_rank.overall_rank.rank ? student.class_rank.overall_rank.rank: '-'
            })
            this.setState({
                data: data, 
                schoolYear: response.data.data.school_year
            })
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
        this.props.history.push({
            pathname:'detail/' + row.id,
            state: {status:'murid'}
        });
    }

    componentDidMount() {
        this.getStudentList()
    }

    render() {
        const homeroomClass = JSON.parse(localStorage.getItem('homeroom_class')).name
        
        const options = {
            onRowClick: this.onRowClick
        };

        return (
            <Page title='Daftar Murid'>
            <div className="padding-content student-list">
                <Header></Header>
                <div className="margin-content">
                    <div className="content-block border-0">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="table-title">{homeroomClass}</div>
                                <div className="school-year">Tahun Ajaran {this.state.schoolYear}</div>
                                {
                                    this.state.data.length ?
                                    <BootstrapTable bordered={false} hover data={this.state.data} options={options} className="table-content">
                                        <TableHeaderColumn row="0" rowSpan="2" dataField="id" isKey hidden></TableHeaderColumn>
                                        <TableHeaderColumn row="0" rowSpan="2" columnClassName="student-detail__name" dataField="full_name" dataSort>
                                            Nama Murid
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="0" rowSpan="2" columnClassName="nis" dataField="nis" dataSort>
                                            NIS
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="0" rowSpan="2" columnClassName="nis" dataField="nisn" dataSort>
                                            NISN
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="0" rowSpan="2" columnClassName="score" className="text-center" dataField="percentage" dataFormat={this.getAttendancePrecentage} dataSort>
                                            Kehadiran Rata-Rata
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="0" colSpan="3"columnClassName="score text-center" className="text-center">
                                            Nilai Rata-Rata
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="1" columnClassName="score text-center" className="text-center" dataField="knowledge_score" dataSort>
                                            Pengetahuan
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="1" columnClassName="score text-center" className="text-center" dataField="skill_score" dataSort>
                                            Keterampilan
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="1" columnClassName="score text-center" className="text-center cell-border-right" dataField="attitude_score" dataSort>
                                            Sikap
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn row="0" rowSpan="2" columnClassName="score text-center" className="text-center border-right-0" dataField="overall_rank" dataSort>
                                            Peringkat
                                        <i className="fa fa-sort"></i>
                                        </TableHeaderColumn>
                                    </BootstrapTable>
                                : 
                                    <Loader loader={true} />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Page>
        )
    }
}
export default DaftarMurid;