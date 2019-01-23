import React, { Component } from 'react'
import Select from 'react-select'

export default class FilterNilai extends Component {
    render() {
        return (
            <div className="filter-nilai">
                <h5><strong>Filter</strong></h5>
                <br />
                <form>
                    <label>Semester</label>
                    <Select
                        value={this.props.selectedSemester}
                        onChange={(e) => { this.props.onChangeSemester(e) }}
                        options={this.props.listSemester}
                        placeholder="Pilih Semester..."
                    />
                    <br /><br />
                    <label>Kelas</label>
                    <Select
                        value={this.props.selectedClass}
                        onChange={(e) => { this.props.onChangeClass(e) }}
                        options={this.props.listClass}
                        placeholder="Pilih Kelas..."
                    />
                    <br /><br />
                    <label>Mata Pelajaran</label>
                    <Select
                        value={this.props.selectedSubject}
                        onChange={(e) => { this.props.onChangeSubject(e) }}
                        options={this.props.listSubject}
                        placeholder="Pilih Pelajaran..."
                    />
                    <br /><br />
                </form>
                <button type="submit" onClick={this.props.handleSubmit} className="btn-green">Filter</button>
            </div>
        )
    }
}
