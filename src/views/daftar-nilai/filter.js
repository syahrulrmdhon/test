import React, { Component } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { getSemesterList, getClassList, getSubjectList, handleChange } from './../../redux-modules/modules/scoreList'
import { getSemesterList, classes, subjects } from './../../utils/common'
import {
    handleChange,
    initial,
} from './../../redux-modules/modules/scoreList'


class FilterNilai extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listSemester: [],
            subjects: [],
            classes: [],
        }
        this.changeClass = this.changeClass.bind(this)
    }
    componentDidMount() {
        this.props.initial()
        getSemesterList.call(this)
        classes.call(this)
    }

    changeClass(e){
        const value = e.value
        subjects.call(this, { class_id: value }, {listOptions: true})
        this.props.handleChange(e.value, 'selectedClass')
    }

    render() {
        let scoreList = _.get(this, 'props.scoreList', {})
        let selectedClass = scoreList ? scoreList.selectedClass : ''
        let selectedSemester = scoreList ? scoreList.selectedSemester : ''
        let selectedSubject = scoreList ? scoreList.selectedSubject : ''
        let isDisabled = false
        if (selectedClass === '' || selectedSemester === '' || selectedSubject === '') {
            isDisabled = "cursor"
        }

        return (
            <div className='filter'>
                <div className='title'>Filter</div>
                <form>
                    <div className='field-filter'>
                        <label>Semester</label>
                        <Select
                            onChange={(e) => { this.props.handleChange(e.label, 'selectedSemester') }}
                            options={this.state.listSemester ? this.state.listSemester : []}
                            className='select'
                            value={this.state.listSemester.find((element) => { return element.label == selectedSemester })}
                            classNamePrefix='select'
                            placeholder='Pilih Semester...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Kelas</label>
                        <Select
                            onChange={(e) => { this.changeClass(e) }}
                            options={this.state.classes ? this.state.classes : []}
                            value={this.state.classes.find((element) => { return element.value == selectedClass })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Kelas...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Mata Pelajaran</label>
                        <Select
                            onChange={(e) => { this.props.handleChange(e.value, 'selectedSubject') }}
                            options={this.state.subjects ? this.state.subjects: []}
                            value={this.state.subjects.find((element) => { return element.value == selectedSubject })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Pelajaran...'
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

const mapStateToProps = (state) => ({
    scoreList: state.scoreList, //noQuestion dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange,
    initial,
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(FilterNilai)