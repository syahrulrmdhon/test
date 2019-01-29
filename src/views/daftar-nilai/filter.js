import React, { Component } from 'react'
import Select from 'react-select'

export default class FilterNilai extends Component {
    render() {
        return (
            <div className="filter-nilai">
                <h5 className="padding-top-1">
                    <strong className="large-text">Filter</strong>
                </h5>
                <br />
                <form className="margin-top-4">
                    <label className="padding-bottom-2 small-text-filter">Semester</label>
                    <Select
                        value={this.props.selectedSemester}
                        onChange={(e) => { this.props.onChangeSemester(e) }}
                        options={this.props.listSemester}
                        classNamePrefix='select'
                        placeholder="Pilih Semester..."
                    />
                    <br /><br />
                    <label className="padding-bottom-2 small-text-filter">Kelas</label>
                    <Select
                        value={this.props.selectedClass}
                        onChange={(e) => { this.props.onChangeClass(e) }}
                        options={this.props.listClass}
                        classNamePrefix='select'
                        placeholder="Pilih Kelas..."
                    />
                    <br /><br />
                    <label className="padding-bottom-2 small-text-filter">Mata Pelajaran</label>
                    <Select
                        isDisabled={this.props.disabledSelectSubject}
                        value={this.props.selectedSubject}
                        onChange={(e) => { this.props.onChangeSubject(e) }}
                        options={this.props.listSubject}
                        classNamePrefix='select'
                        placeholder="Pilih Pelajaran..."
                    />
                    <br /><br />
                </form>
                <button type="submit" onClick={this.props.handleSubmit} className="btn-green">Filter</button>
            </div>
        )
    }
}
