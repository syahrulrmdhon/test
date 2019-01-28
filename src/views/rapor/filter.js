import React, { Component } from 'react'
import Select from 'react-select'

// import ExportLogo from './../../assets/images/export.svg'

export default class FilterRapor extends Component {
    render() {
        return (
            <div className="filter-rapor">
                <h5><strong>Filter</strong></h5>
                <br />
                <form>
                    <label>Murid</label>
                    <Select
                        value={this.props.selectedStatus}
                        onChange={(e) => { this.props.onChangeStatus(e) }}
                        options={this.props.listStatus}
                        placeholder="Pilih Murid..."
                    />
                    <br /><br />
                    <label>Semester</label>
                    <Select
                        value={this.props.selectedSemester}
                        onChange={(e) => { this.props.onChangeSemester(e) }}
                        options={this.props.listSemester}
                        placeholder="Pilih Semester..."
                    />
                    <br /><br />
                </form>
                <button onClick={this.props.handleSubmit} type="submit" className="btn-green">Filter</button>
                <br />
                {/* <img className="export" src={ExportLogo} alt="" /> */}
                <br/>
            </div>
        )
    }
}
