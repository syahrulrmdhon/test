import React, { Component } from 'react'
import Select from 'react-select'

export default class FilterAbsensi extends Component {
    
    render() {
        return (
            <div className="filter-absensi">
                <h5><strong>Filter</strong></h5>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>Tipe Absensi</label>
                    <Select 
                        value={this.props.selectedAttendanceType}
                        onChange={event => this.props.selectAttendanceType(event)}
                        options={this.props.attendanceTypes} 
                        placeholder='Pilih Tipe Absensi' />                    
                    <br /><br />
                    <label>Kelas</label>
                    <Select 
                        value={this.props.selectedClass}
                        onChange={event => this.props.selectClass(event)}
                        options={this.props.classes}
                        placeholder='Pilih Kelas' />
                    <br /><br />
                    <label>Mata Pelajaran</label>
                    <Select 
                        value={this.props.selectedSubject}
                        onChange={event => this.props.selectSubject(event)}
                        options={this.props.subjects} 
                        placeholder='Pilih Mata Pelajaran' />
                    <br /><br />
                </form>
                <button type="submit" onClick={this.props.handleSubmit} className="btn-green">Filter</button>
            </div>
        )
    }
}
