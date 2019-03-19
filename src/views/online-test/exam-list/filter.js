import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleChange, initial } from './../../../redux-modules/modules/listOnlineExam'
import { schoolYears, getSemesterList } from './../../../utils/common'

class FilterOnlineExam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            school_years: []
        }
    }
    // componentDidMount() {
    //     this.props.initial()
    //     schoolYears.call(this, false, { listOptions: true })
    //     handleChangeSemester()
    // }
    // handleChangeSemester(e) {
    //     const value = e.value
    //     console.log('value', value)
    //     // getSemesterList.call(this, )
    // }
    render() {
        let listOnlineExam = _.get(this, 'props.listOnlineExam', {})
        let selectedYear = listOnlineExam ? listOnlineExam.selectedYear : ''
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
                            // onChange={(e) => { this.props.handleChange(e.value, 'selectedYear') }}
                            // options={this.state.school_years ? this.state.school_years : []}
                            // value={this.state.school_years.find((element) => { return element.value == selectedYear })}
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
                <button type="submit" className="btn-green">Filter</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listOnlineExam: state.listOnlineExam, //listOnlineExam dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange,
    initial,
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(FilterOnlineExam)