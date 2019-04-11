import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    handleChange, 
    initial 
} from './../../../redux-modules/modules/listOnlineExam'
import { 
    assessmentType, 
    grades,
} from './../../../utils/common'
import { 
    schoolYears, 
    semesterList 
} from './../../../utils/exam-online'

class FilterOnlineExam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            school_years: [],
            listSemester: [],
            assessment_types: [],
            grades: []
        }
        this.changePeriod = this.changePeriod.bind(this)
    }
    componentDidMount() {
        // const current_year = this.props.listOnlineExam ? this.props.listOnlineExam.selectedYear : ''
        this.props.initial()
        schoolYears.call(this)
        semesterList.call(this)
        assessmentType.call(this, {category: 'knowledge', test_type:'periodic'})
        grades.call(this)
        // this.props.handleChange(_.get(current_year, 'id', null), 'selectedYear')
    }
    changePeriod(e) {
        const value = e.value
        semesterList.call(this, {school_year_id: value}, false)
        this.props.handleChange(e.value, 'selectedYear')
    }
    changeSemester(e) {
        const value = e.value
        grades.call(this, {school_period_id: value})
        this.props.handleChange(e.value, 'selectedSemester')
    }
    render() {
        let listOnlineExam = _.get(this, 'props.listOnlineExam', {})
        let selectedYear = listOnlineExam ? listOnlineExam.selectedYear : ''
        let selectedSemester = listOnlineExam ? listOnlineExam.selectedSemester : ''
        let selectedType = listOnlineExam ? listOnlineExam.selectedType : ''
        let selectedGrade = listOnlineExam ? listOnlineExam.selectedGrade: ''
        return (
            <div className='filter h-100'>
                <div className='title'>Filter</div>
                <form>
                    <div className='field-filter'>
                        <label>Periode</label>
                        <Select
                            onChange={(e) => { this.changePeriod(e) }}
                            options={this.state.school_years ? this.state.school_years : []}
                            value={this.state.school_years.find((e) => { return e.value == selectedYear })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Periode...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Semester</label>
                        <Select
                            onChange={(e)=>{this.changeSemester(e)}}
                            options={this.state.listSemester ? this.state.listSemester : []}
                            value={this.state.listSemester.find((e) => { return e.value == selectedSemester })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Semester...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Tipe Ujian</label>
                        <Select
                            onChange={(e) => { this.props.handleChange(e.value, 'selectedType') }}
                            options={this.state.assessment_types ? this.state.assessment_types : []}
                            value={this.state.assessment_types.find((e) => { return e.value == selectedType })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Tipe Ujian...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Pilih Kelas</label>
                        <Select
                            onChange={(e) => { this.props.handleChange(e.value, 'selectedGrade') }}
                            options={this.state.grades ? this.state.grades : []}
                            value={this.state.grades.find((e) => { return e.value == selectedGrade })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Kelas...'
                        />
                    </div>
                </form>
                <button type="submit" onClick={this.props.handleSubmit} className="btn-green">
                    Filter
                </button>
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