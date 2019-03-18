import React, { Component } from 'react'
import Select from 'react-select'

export default class FilterOnlineExam extends Component {
    render() {
        return (
            <div className='filter h-100'>
                <div className='title'>Filter</div>
                <form>
                    <div className='field-filter'>
                        <label>Periode</label>
                        <Select
                            // value={this.props.selectedSemester}
                            // onChange={(e) => { this.props.onChangeSemester(e) }}
                            // options={this.props.listSemester}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Periode...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Semester</label>
                        <Select
                            // value={this.props.selectedSemester}
                            // onChange={(e) => { this.props.onChangeSemester(e) }}
                            // options={this.props.listSemester}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Semester...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Tipe Ujian</label>
                        <Select
                            // value={this.props.selectedSemester}
                            // onChange={(e) => { this.props.onChangeSemester(e) }}
                            // options={this.props.listSemester}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Tipe Ujian...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Pilih Kelas</label>
                        <Select
                            // value={this.props.selectedSemester}
                            // onChange={(e) => { this.props.onChangeSemester(e) }}
                            // options={this.props.listSemester}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Kelas...'
                        />
                    </div>
                </form>
                <button type="submit"className="btn-green">Filter</button>
            </div>
        )
    }
}
