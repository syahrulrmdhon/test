import React, { Component } from 'react'
import Select from 'react-select'
import { getDate } from '../../utils/common'
import DatePicker from 'react-datepicker'
export default class FilterAbsensi extends Component {

    render() {
        const now = new Date()
        const attendanceType = this.props.selectedAttendanceType.value

        return (
            <div className="filter">
                <div className="title">Filter</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="field-filter">
                        <label>Pilih Tanggal</label>
                        <div className="position-relative">
                            <DatePicker
                                className="w-100"
                                selected={this.props.selectedDate}
                                onChange={this.props.handleDateChange}
                                placeholderText="Weeks start on Monday"
                                value={getDate('case-1', this.props.selectedDate)}
                                maxDate = {now}
                                />
                            <i className="fa fa-calendar calendar-icon" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="field-filter">
                        <label>Tipe Absensi</label>
                        <Select
                            value={this.props.selectedAttendanceType}
                            onChange={event => this.props.selectAttendanceType(event)}
                            options={this.props.attendanceTypes}
                            classNamePrefix='select'
                            placeholder='Pilih Tipe Absensi' />
                    </div>
                    <div className="field-filter">
                        <label>Kelas</label>
                        <Select
                            value={this.props.selectedClass}
                            onChange={event => this.props.selectClass(event)}
                            options={this.props.classes}
                            classNamePrefix='select'
                            placeholder='Pilih Kelas' />
                    </div>
                    {
                        attendanceType === 'subject' &&

                        <div className="field-filter">
                            <label>Mata Pelajaran</label>
                            <Select
                                value={this.props.selectedSubject}
                                onChange={event => this.props.selectSubject(event)}
                                options={this.props.subjects}
                                classNamePrefix='select'
                                placeholder='Pilih Mata Pelajaran' />
                        </div>
                    }
                </form>
                <button type="submit" onClick={this.props.handleFilterSubmit} className="btn-green">Filter</button>
            </div>
        )
    }
}
