import React, { Component } from 'react'
import Select from 'react-select'

// import ExportLogo from './../../assets/images/export.svg'

export default class FilterRapor extends Component {
    render() {
        return (
            <div className="filter-rapor">
                <h5 className="padding-top-1">
                    <strong className="large-text">Filter</strong>
                </h5>
                <form className="margin-top-4">
                    <label className="padding-bottom-2 small-text-filter">Murid</label>
                    <Select
                        value={this.props.selectedStatus}
                        onChange={(e) => { this.props.onChangeStatus(e) }}
                        options={this.props.listStatus}
                        classNamePrefix='select'
                        placeholder="Pilih Murid..."
                    />
                    <br /><br />
                    <label className="padding-bottom-2 small-text-filter">Semester</label>
                    <Select
                        value={this.props.selectedSemester}
                        onChange={(e) => { this.props.onChangeSemester(e) }}
                        options={this.props.listSemester}
                        classNamePrefix='select'
                        placeholder="Pilih Semester..."
                    />
                    <br /><br />
                </form>
                <button onClick={this.props.handleSubmit} type="submit" className="btn-green">Filter</button>
                <br />
                {/* <img className="export" src={ExportLogo} alt="" /> */}
                <br />
            </div>
        )
    }
}
