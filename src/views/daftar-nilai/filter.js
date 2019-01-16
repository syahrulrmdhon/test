import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'

export default class FilterNilai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            listClass: [],
            selectedClass: "",
            listSemester: [],
            selectedSemester: "",
            listSubject: [],
            selectedSubject: "",
            id: ""
        };
    }
    componentDidMount() {
        this.getSemesterList()
        this.getClassList()
        this.getSubjectList()
        this.getGrades()
    }

    getSemesterList() {
        const url = `${process.env.API_URL}/v1/filters/semesters?school_id=${localStorage.getItem("school_list")}&school_year=2018/2019`
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
        const url = `${process.env.API_URL}/v1/filters/classes?school_id=${localStorage.getItem("school_list")}`
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
                    self.setState({ id: data.id })
                })
            }
            self.setState({
                listClass: kelas
            })
        })
    }
    getSubjectList() {
        const url = `${process.env.API_URL}v1/filters/subjects?school_id=${localStorage.getItem("school_list")}&class_id=${this.state.id}`
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

    render() {
        return (
            <div className="filter-nilai">
                <h5><strong>Filter</strong></h5>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>Semester</label>
                    <select value={this.state.selectedSemester}
                        onChange={(e) => this.setState({ selectedSemester: e.target.value })}>
                        {
                            this.state.listSemester.map((semester) =>
                                <option key={semester.value} value={semester.value}>
                                    {semester.label}
                                </option>
                            )
                        }
                    </select>
                    <br /><br />
                    <label>Kelas</label>
                    <select value={this.state.selectedClass}
                        onChange={(e) => this.setState({ selectedClass: e.target.value })}>
                        {
                            this.state.listClass.map((kelas) =>
                                <option key={kelas.value} value={kelas.value}>
                                    {kelas.label}
                                </option>
                            )
                        }
                    </select>
                    <br /><br />
                    <label>Mata Pelajaran</label>
                    <select value={this.state.selectedSubject}
                        onChange={(e) => this.setState({ selectedSubject: e.target.value })}>
                        {
                            this.state.listSubject.map((pelajaran) =>
                                <option key={pelajaran.value} value={pelajaran.value}>
                                    {pelajaran.label}
                                </option>
                            )
                        }
                    </select>
                    <br /><br />
                    <button type="submit" className="btn-green">Filter</button>
                </form>
            </div>
        )
    }
}
