import React, { Component } from 'react'
import Select from 'react-select'
import { getFullSemesterList } from './../../../utils/common'
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
        }
    }
    componentDidMount() {
        getFullSemesterList.call(this)
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
                            // onChange={(e) => { this.props.handleEventProblemtype(e.value, 'exam', 'exam_problem_types_attributes', 'problem_type', this.props.index) }}
                            // options={this.state.problemTypes ? this.state.problemTypes : []}
                            // value={this.state.problemTypes.find((e) => { return e.value == problem_type })}
                            classNamePrefix="select"
                        />
                    </div>
                    <div className='col-xs-3 col-sm-3 col-md-3 col-xl-3 margin-top-3'>
                        <div className='look padding-left-0'
                        //  onClick={(e) => (this.props.create(e, id, name))}
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