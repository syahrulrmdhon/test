import React, { Component } from 'react'
import Select from 'react-select';

const listPenilaian = [
    { label: "Pilih Tipe Penilaian", value: "" }
];
const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
];
const listPelajaran = [
    { label: "Fisika Dasar II", value: "fisika2" },
    { label: "Matematika Dasar II", value: "matematika2" },
    { label: "Sejarah Nasional II", value: "sejarah2" },
    { label: "Biologi II", value: "biologi2" }
];

export default class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listPenilaian,
            selectedPenilaian: "",
            listClass,
            selectedClass: "",
            listPelajaran,
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
                            <label className="content-label">Tipe Penilaian</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Tipe Penilaian"
                                name= "type_assessment"
                                // onChange={this.handleAttribute}
                                // options={this.state.listClass}
                                // value={this.state.classs_id}
                            />
                        </div>
                        <div className="content-input">
                            <label className="content-label">Kelas</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Kelas"
                                name= "class_id"
                                // onChange={this.handleAttribute}
                                // options={this.state.listClass}
                                // value={this.state.classs_id}
                            />
                        </div>
                        <div className="content-input">
                            <label className="content-label">Mata Pelajaran</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Mata Pelajaran"
                                name= "subject_id"
                                // onChange={this.handleAttribute}
                                // options={this.state.listClass}
                                // value={this.state.classs_id}
                            />
                        </div>
                        <div className="content-input margin-top-6">
                            <button className="submit-btn">Filter</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
