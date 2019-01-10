import React, { Component } from 'react'

import ExportLogo from './../../assets/images/export.svg'
import PrintLogo from './../../assets/images/print.svg'

const listMurid = [
    { label: "Semua Murid", value: "semua" },
    { label: "Murid Beresiko", value: "beresiko" },
    { label: "Murid Tidak Beresiko", value: "tidak beresiko" }
]
const listSemester = [
    { label: "1", value: 1 },
    { label: "2", value: 2 }
]

export default class FilterRapor extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            listMurid,
            selectedMurid: "",
            listSemester,
            selectedSemester: ""
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="filter-rapor">
                <h5><strong>Filter</strong></h5>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>Murid</label>
                    <select value={this.state.selectedMurid}
                        onChange={(e) => this.setState({ selectedMurid: e.target.value })}>
                        {
                            this.state.listMurid.map((murid) =>
                                <option key={murid.value} value={murid.value}>
                                    {murid.label}
                                </option>
                            )
                        }
                    </select>
                    <br /><br />
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
                    <button type="submit" className="btn-green">Filter</button>
                </form>
                <br />
                <img className="export" src={ExportLogo} alt="" />
                <img className="print" src={PrintLogo} alt="" />
            </div>
        )
    }
}
