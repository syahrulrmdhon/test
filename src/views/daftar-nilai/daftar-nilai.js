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

export default class DaftarNilai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',

            // filter
            listClass: [],
            selectedClass: "",
            listSemester: [],
            selectedSemester: "",
            listSubject: [],
            selectedSubject: "",
            listTable: [],
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
        this.getKnowledge = this.getKnowledge.bind(this)
        // this.getSkill = this.getSkill.bind(this)
        this.getAttitude = this.getAttitude.bind(this)
    }

    componentDidMount() {
        this.getSemesterList()
        this.getClassList()
        this.getSubjectList()
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getSemesterList() {
        const url = `${process.env.API_URL}v1/filters/semesters?school_id=${localStorage.getItem("school_list")}`
        const self = this

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            let semester = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    semester.push({ value: data.id, label: data.period_name })
                })
            }
            self.setState({
                listSemester: semester
            })
        })
    }
    getClassList() {
        const url = `${process.env.API_URL}v1/filters/classes?school_id=${localStorage.getItem("school_list")}`
        const self = this

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            let kelas = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    kelas.push({ value: data.id, label: data.name })
                    self.setState({ idClass: data.id })
                })
            }
            self.setState({
                listClass: kelas
            })
        })
    }
    getSubjectList(idClass) {
        let url = ""
        if (idClass === undefined) {
            url = `${process.env.API_URL}v1/filters/subjects?school_id=${localStorage.getItem("school_list")}`
        } else {
            url = `${process.env.API_URL}v1/filters/subjects?school_id=${localStorage.getItem("school_list")}&class_id=${idClass}`
        }
        const self = this

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            let subject = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    subject.push({ value: data.id, label: data.subject_name })
                })
            }
            self.setState({
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
    getKnowledge() {
        let url = `${process.env.API_URL}v1/scores/index?school_id=${localStorage.getItem("school_list")}&semester=${this.state.selectedSemester.label}&category=knowledge&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
        const self = this

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            let tableKnowledge = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                console.log('DATUM', datum)
                datum.map(function (data, i) {
                    tableKnowledge.push({ data })
                    console.log('DATUM DATA KNOWLEDGE', data)

                    // get index ulangan harian pengetahuan
                    data.subject_score_details.daily_exam.scores.map(function (x, i) {
                        self.setState({
                            idxScores: i + 1
                        })
                    })

                    // get index tugas pengetahuan
                    data.subject_score_details.task.scores.map(function (x, i) {
                        self.setState({
                            idxTugas: i + 1
                        })
                    })
                })
            }
            self.setState({
                tableKnowledge: tableKnowledge
            })
        })
    }
    // getSkill() {
    //     let url = `${process.env.API_URL}v1/scores/index?school_id=${localStorage.getItem("school_list")}&semester=${this.state.selectedSemester.label}&category=skill&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
    //     const self = this

    //     axios({
    //         method: 'get',
    //         url: url,
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     }).then(function (res) {
    //         let tableSkill = []
    //         for (var i in res.data.data) {
    //             const datum = res.data.data[i]
    //             datum.map(function (data, i) {
    //                 tableSkill.push({ data })
    //                 // console.log('DATUM DATA SKILL', data)

    //                 // get index ulangan harian keterampilan
    //                 data.subject_score_details.task.scores.map(function (x, i) {
    //                     self.setState({
    //                         idxScoresSkill: i + 1
    //                     })
    //                 })
    //             })
    //         }
    //         self.setState({
    //             tableSkill: tableSkill
    //         })
    //     })
    // }
    getAttitude() {
        let url = `${process.env.API_URL}v1/scores/index?school_id=${localStorage.getItem("school_list")}&semester=${this.state.selectedSemester.label}&category=attitude&class_id=${this.state.selectedClass.value}&school_subject_id=${this.state.selectedSubject.value}`
        const self = this

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            let tableAttitude = []
            for (var i in res.data.data) {
                const datum = res.data.data[i]
                datum.map(function (data, i) {
                    tableAttitude.push({ data })
                })
            }
            self.setState({
                tableAttitude: tableAttitude
            })
        })
    }
    handleSubmit() {
        this.getKnowledge()
        // this.getSkill()
        this.getAttitude()
    }

    render() {
        return (
            <div className="nilai">
                <Header></Header>
                <MenuBar></MenuBar>
                <div className="content">
                    <div className="row">
                        <div className="left-content col-2">
                            <FilterNilai
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
                                                listTable={this.state.tableKnowledge}
                                                idxScores={this.state.idxScores}
                                                idxTugas={this.state.idxTugas}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="table-content">
                                            <TableKeterampilan
                                                listTable={this.state.tableSkill}
                                                idxScoresSkill={this.state.idxScoresSkill}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <div className="table-content">
                                            <TableSikap
                                                listTable={this.state.tableAttitude}
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