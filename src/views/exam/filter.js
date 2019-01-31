import React, { Component } from 'react'
import Select from 'react-select';

const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
];

export default class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedPenilaian: "",
            listClass,
            selectedClass: "",
            selectedPelajaran: ""
        }
    }
    render() {
        return (
            <div className="margin-top-6 margin-left-3">
                <label className="header-title">Filter</label>
                <div className="margin-top-4">
                    <form>
                        <div className="content-input">
                            <label className="content-label">Kelas</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Kelas"
                                name= "class_id" />
                        </div>
                        <div className="content-input margin-top-6">
                            <button className="filter-btn">Filter</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
