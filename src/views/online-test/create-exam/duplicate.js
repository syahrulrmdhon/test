import React, { Component } from 'react'
import Select from 'react-select'
import { getFullSemesterList,} from './../../../utils/common'
import { getExamListForDuplicate } from './../helper-online'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    handleEvent,
    buildObject
} from './../../../redux-modules/modules/onlineExam'

class DuplicateQuestion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listFullSemester: [],
            listSubjectName: []
        }
    }
    componentDidMount() {
        getFullSemesterList.call(this)
        getExamListForDuplicate.call(this, {school_subject_id: this.props.subjectId})
    }
    render() {
        const { selectedFullSemester, duplicate_exam_id } = this.props.exam || {}
        return (
            <div>
                <label>Duplikat Dari Soal</label>
                <div className='row margin-top-1'>
                    <div className="col-sm-5 col-md-5 col-xs-5 col-lg-5">
                        <Select
                            onChange={(e) => { this.props.handleEvent(e.value, 'exam', 'selectedFullSemester') }}
                            options={this.state.listFullSemester ? this.state.listFullSemester : []}
                            value={this.state.listFullSemester.find((e) => { return e.value == selectedFullSemester })}
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-sm-4 col-md-4 col-xs-4 col-lg-4">
                        <Select
                            onChange={(e) => { this.props.handleEvent(e.value, 'exam', 'duplicate_exam_id') }}
                            options={this.state.listSubjectName ? this.state.listSubjectName : []}
                            value={this.state.listSubjectName.find((e) => { return e.value == duplicate_exam_id })}
                            classNamePrefix="select"
                        />
                    </div>
                    <div className='col-xs-3 col-sm-3 col-md-3 col-xl-3 margin-top-3'>
                        <div className='look padding-left-0'
                         onClick={(e) => (this.props.viewQuestions(e, this.props.assessmentId, duplicate_exam_id))}
                        >
                            Lihat Soal
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exam: _.get(state, 'onlineExam.exam', {}), //onlineExam dari reducer
    // selectedFullSemester: _.get(state, 'onlineExam.exam.selectedFullSemester', ''),
    // duplicate_exam_id: _.get(state, 'onlineExam.exam.duplicate_exam_id', ''),
})
const mapDispatchToProps = dispatch => bindActionCreators({
    handleEvent
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DuplicateQuestion)