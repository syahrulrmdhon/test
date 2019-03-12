import React, { Component } from 'react'
import Select from 'react-select'
import classnames from 'classnames'

export default class FilterRapor extends Component {
    render() {
        let isDisabled = false
        if (this.props.selectedClass === '' || this.props.selectedSemester === '' || this.props.selectedSubject === '') {
            isDisabled = "cursor"
        }
        return (
            <div className='filter'>
                <div className='title'>Filter</div>
                <form>
                    <div className='field-filter'>
                        <label>Murid</label>
                        <Select
                            value={this.props.selectedStatus}
                            onChange={(e) => { this.props.onChangeStatus(e) }}
                            options={this.props.listStatus}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Murid...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Semester</label>
                        <Select
                            value={this.props.selectedSemester}
                            onChange={(e) => { this.props.onChangeSemester(e) }}
                            options={this.props.listSemester}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Semester...'
                        />
                    </div>
                </form>
                <button type="submit" className={classnames("btn-green", isDisabled)}
                    disabled={isDisabled} onClick={this.props.handleSubmit} className="btn-green">
                    Filter
                </button>
            </div>
        )
    }
}
