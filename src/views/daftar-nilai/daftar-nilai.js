import React, { Component } from 'react'
import axios from 'axios'
import './../../styles/daftar-nilai.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import FilterNilai from './filter'
import TablePengetahuan from './table-pengetahuan'
import TableKeterampilan from './table-keterampilan'
import TableSikap from './table-sikap';
import { apiClient } from '../../utils/apiClient'

export default class DaftarNilai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            idClass: undefined,

            // filter
            listClass: [],
            selectedClass: "",
            listSemester: [],
            selectedSemester: "",
            listSubject: [],
            selectedSubject: "",
            tableKnowledge: [],
            tableSkill: [],
            tableAttitude: [],

            // knowledge
            idxScores: 0,
            idxTugas: 0,

            // skill
            idxScoresSkill: 0
        };
        this.toggle = this.toggle.bind(this);
        this.getClassList = this.getClassList.bind(this)
        this.onChangeClass = this.onChangeClass.bind(this)
        this.getSemesterList = this.getSemesterList.bind(this)
        this.onChangeSemester = this.onChangeSemester.bind(this)
        this.getSubjectList = this.getSubjectList.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.getSemesterList()
        this.getClassList()
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getSemesterList() {
        const url = `v1/filters/semesters?`

        apiClient('get', url).then(res => {
            const data = res.data.data.semesters.map(
                ({ period_name, id }) => ({ label: period_name, value: id })
            )
            this.setState({
                listSemester: data
            })
        })
    }
    getClassList() {
        const url = `v1/filters/classes`

        apiClient('get', url).then(res => {
            const data = res.data.data.classes.map(
                ({ id, name }) => ({ label: name, value: id })
            )
            this.setState({
                listClass: data
            })
        })
    }
    getSubjectList(idClass) {
        let url = ""
        if (idClass === undefined) {
            url = `v1/filters/subjects?`
        } else {
            url = `v1/filters/subjects?class_id=${idClass}`
        }
        apiClient('get', url).then(res => {
            let subject = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    subject.push({ value: data.id, label: data.subject_name })
                })
            }
            this.setState({
                listSubject: subject
            })
        })
    }
    onChangeSemester(selectedSemester) {
        this.setState({ selectedSemester })
    }
    onChangeClass(selectedClass) {
        this.setState({ selectedClass })
        const idClass = selectedClass.value
        this.getSubjectList(idClass)
    }
    onChangeSubject(selectedSubject) {
        this.setState({ selectedSubject })
    }
    disabledSelectSubject() {
        document.getElementById("mySelect").disabled = true;
    }
    getKnowledge() {
        let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=knowledge&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
        return apiClient('get', url)
    }
    getSkill() {
        let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=skill&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
        return apiClient('get', url)
    }
    getAttitude() {
        let url = `v1/scores/index?semester=${this.state.selectedSemester.label}&category=attitude&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
        return apiClient('get', url)
    }
    handleSubmit() {
        let dataKnowledge = []
        let dataSkill = []
        let tableKnowledge = []
        let tableAttitude = []
        let tableSkill = []
        this.getKnowledge().then(res => {
            dataKnowledge = res.data.data
            tableKnowledge = res.data.data.users
            this.getAttitude().then(attitudes => {
                tableAttitude = attitudes.data.data.users
                this.getSkill().then(skills => {
                    dataSkill = res.data.data
                    tableSkill = skills.data.data.users
                    this.setState({
                        tableKnowledge: tableKnowledge,
                        tableAttitude: tableAttitude,
                        tableSkill: tableSkill,
                        idxScores: dataKnowledge.count.daily_exam,
                        idxTugas: dataKnowledge.count.task,
                        idxScoresSkill: dataSkill.count.task
                    })
                })
            })
        });
    }

    render() {
        return (
            <div className="body-content">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row row-daftar-nilai">
                        <div className="left-content col-2">
                            <FilterNilai
                                id="mySelect"
                                listClass={this.state.listClass}
                                selectedClass={this.state.selectedClass}
                                listSemester={this.state.listSemester}
                                selectedSemester={this.state.selectedSemester}
                                listSubject={this.state.listSubject}
                                selectedSubject={this.state.selectedSubject}
                                onChangeClass={this.onChangeClass}
                                onChangeSemester={this.onChangeSemester}
                                onChangeSubject={this.onChangeSubject}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                        <div className="right-content col-10">
                            <div className="row">
                                <div className="col-8">
                                    <h5 className="float-left"><strong>Daftar Nilai</strong></h5>
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
                                                tableKnowledge={this.state.tableKnowledge}
                                                idxScores={this.state.idxScores}
                                                idxTugas={this.state.idxTugas}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="table-content">
                                            <TableKeterampilan
                                                tableSkill={this.state.tableSkill}
                                                idxScoresSkill={this.state.idxScoresSkill}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="table-content">
                                            <TableSikap
                                                tableAttitude={this.state.tableAttitude}
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