import React, { Component } from 'react'
import './../../styles/rapor.css'
import './../../styles/global/component.css'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

import Header from '../global/header'
import MenuBar from '../global/navbar'
import FilterRapor from './filter'
import TablePengetahuan from './table-pengetahuan'
import TableKeterampilan from './table-keterampilan'
import TableSikap from './table-sikap'
import { apiClient } from '../../utils/apiClient'

class Rapor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            listStatus: [],
            selectedStatus: "",
            listSemester: [],
            selectedSemester: "",
            tableKnowledge: [],
            tableSkill: [],
            tableAttitude: [],
        };
        this.toggle = this.toggle.bind(this);
        this.getSemesterList = this.getSemesterList.bind(this)
        this.onChangeSemester = this.onChangeSemester.bind(this)
        this.getStatusList = this.getStatusList.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.getSemesterList()
        this.getStatusList()
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getSemesterList() {
        const url = `v1/filters/semesters`
        apiClient('get', url).then(res => {
            let semester = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    semester.push({ value: data.id, label: data.period_name })
                })
            }
            this.setState({
                listSemester: semester
            })
        })
    }
    onChangeSemester(selectedSemester) {
        this.setState({ selectedSemester })
    }
    getStatusList() {
        const url = `v1/filters/risk_status`
        apiClient('get', url).then(res => {
            let status = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    status.push({ key: data.key, value: data.value })
                })
            }
            this.setState({
                listStatus: status
            })
        })
    }
    onChangeStatus(selectedStatus) {
        this.setState({ selectedStatus })
    }
    getKnowledge() {
        let url = `v1/scores/report?semester=${this.state.selectedSemester.label}&category=knowledge&class_id=${localStorage.getItem("class_id")}&risk_status=${this.state.selectedStatus.key}`
        return apiClient('get', url)
    }
    getSkill() {
        let url = `v1/scores/report?semester=${this.state.selectedSemester.label}&category=skill&class_id=${localStorage.getItem("class_id")}&risk_status=${this.state.selectedStatus.key}`
        return apiClient('get', url)
    }
    getAttitude() {
        let url = `v1/scores/report?semester=${this.state.selectedSemester.label}&category=attitude&class_id=${localStorage.getItem("class_id")}&risk_status=${this.state.selectedStatus.key}`
        return apiClient('get', url)
    }
    handleSubmit() {
        let tableKnowledge = []
        let tableAttitude = []
        let tableSkill = []
        this.getKnowledge().then(res => {
            tableKnowledge = res.data.data.users;
            console.log("KNOWLEDGE", tableKnowledge)
            this.getAttitude().then(attitudes => {
                tableAttitude = attitudes.data.data.users;
                console.log("ATTITUDE", tableAttitude)
                this.getSkill().then(skills => {
                    tableSkill = skills.data.data.users;
                    console.log("skill", tableSkill)
                    this.setState({
                        tableKnowledge: tableKnowledge,
                        tableAttitude: tableAttitude,
                        tableSkill: tableSkill
                    })
                })
            })
        });
    }
    render() {
        return (
            <div className="rapor">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <FilterRapor
                                listSemester={this.state.listSemester}
                                selectedSemester={this.state.selectedSemester}
                                onChangeSemester={this.onChangeSemester}
                                listStatus={this.state.listStatus}
                                selectedStatus={this.state.selectedStatus}
                                onChangeStatus={this.onChangeStatus}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="float-left"><strong>Rapor Kelas X IPA 2</strong></h5>
                                </div>
                                <div className="col-4">
                                    <span className="float-right">
                                        <Nav tabs className="border-0 pull-right">
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}>
                                                    Pengetahuan
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}>
                                                    Keterampilan
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="tab-nilai">
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '3' })}
                                                    onClick={() => { this.toggle('3'); }}>
                                                    Sikap
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </span>
                                </div>
                                <TabContent className="col-12" activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <div className="table-content">
                                            <TablePengetahuan
                                                // tableKnowledge={this.state.tableKnowledge}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="table-content">
                                            <TableKeterampilan
                                                // tableSkill={this.state.tableSkill}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="table-content">
                                            <TableSikap
                                                // tableAttitude={this.state.tableAttitude}
                                            />
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Rapor;