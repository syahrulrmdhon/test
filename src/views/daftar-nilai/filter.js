import React, { Component } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getSemesterList,
    classes,
    subjects,
} from './../../utils/common'
import { handleChange, initial } from './../../redux-modules/modules/scoreList'


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
        const current_period = !!(localStorage.getItem("current_period")) ? JSON.parse(localStorage.getItem("current_period")) : {}
        getSemesterList.call(this)
<<<<<<< HEAD
        classes.call(this)
        this.props.initial()
        this.props.handleChange(_.get(current_period, 'id', null), 'selectedSemester')
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.classes !== prevState.classes){
            if(this.state.classes.length > 0){
                let classs = this.state.classes[0] ? this.state.classes[0] : {}
                this.changeClass(classs)
            }
            
        }

        if(this.state.subjects !== prevState.subjects){
            if(this.state.subjects.length > 0){
               let subject =  this.state.subjects[0] ? this.state.subjects[0] : {}
               this.props.handleChange(subject.value, 'selectedSubject')
            }
        }
=======
    }

    changePeriod(e) {
        const value = e.value
        classes.call(this, {school_period_id: value})
        this.props.handleChange(e.value, 'selectedSemester')
>>>>>>> 4537368863b9bd6d15afd81005127879dd6995f2
    }

    changeClass(e) {
        const value = e.value
        subjects.call(this, { class_id: value }, { listOptions: true })
        this.props.handleChange(e.value, 'selectedClass')
    }

    render() {
        let scoreList = _.get(this, 'props.scoreList', {})
        let selectedSemester = scoreList ? scoreList.selectedSemester : ''
        let selectedClass = scoreList ? scoreList.selectedClass : ''
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
                            onChange={(e) => { this.changePeriod(e) }}
                            options={this.state.listSemester ? this.state.listSemester : []}
                            value={this.state.listSemester.find((element) => { return element.value == selectedSemester })}
                            className='select'
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
                            options={this.state.subjects ? this.state.subjects : []}
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

    newMethod(selectedSemester) {
        console.log(selectedSemester);
    }
}

const mapStateToProps = (state) => ({
    scoreList: state.scoreList, //scoreList dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange,
    initial,
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(FilterNilai)