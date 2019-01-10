import React, { Component } from 'react'

const listClass = [
    { label: "X IPA 1", value: "x ipa 1" },
    { label: "X IPA 2", value: "x ipa 2" },
    { label: "X IPS 1", value: "x ips 1" },
    { label: "X IPS 2", value: "x ips 2" }
  ];
  const listAbsensi = [
    { label: "Absensi Harian", value: "harian" },
    { label: "Absensi Mata Pelajaran", value: "pelajaran" }
  ];
  const listPelajaran = [
    { label: "Fisika Dasar II", value: "fisika2" },
    { label: "Matematika Dasar II", value: "matematika2" },
    { label: "Sejarah Nasional II", value: "sejarah2" },
    { label: "Biologi II", value: "biologi2" }
  ];

export default class FilterAbsensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listAbsensi,
          selectedAbsensi: "",
          listClass,
          selectedClass: "",
          listPelajaran,
          selectedPelajaran: ""
        };
      }
    render() {
        return (
            <div className="filter-absensi">
                <h5><strong>Filter</strong></h5>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>Tipe Absensi</label>
                    <select value={this.state.selectedClass}
                        onChange={(e) => this.setState({ selectedAbsensi: e.target.value })}>
                        {
                            this.state.listAbsensi.map((absen) =>
                                <option key={absen.value} value={absen.value}>
                                    {absen.label}
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
