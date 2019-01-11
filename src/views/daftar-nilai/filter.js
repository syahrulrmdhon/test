import React, { Component } from 'react'

const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
];
const listSemester = [
    { label: "1", value: 1 },
    { label: "2", value: 2 }
]
const listPelajaran = [
    { label: "Fisika Dasar II", value: "fisika2" },
    { label: "Matematika Dasar II", value: "matematika2" },
    { label: "Sejarah Nasional II", value: "sejarah2" },
    { label: "Biologi II", value: "biologi2" }
];

export default class FilterNilai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            listClass,
            selectedClass: "",
            listSemester,
            selectedSemester: "",
            listPelajaran,
            selectedPelajaran: ""
        };
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
                    <select value={this.state.selectedPelajaran}
                        onChange={(e) => this.setState({ selectedPelajaran: e.target.value })}>
                        {
                            this.state.listPelajaran.map((pelajaran) =>
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
