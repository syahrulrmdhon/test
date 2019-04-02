import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import { NotAvailable } from '../../global/notAvailable';
import { DetailOnlineExam, ActionList, DetailAction } from '../helper-online'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from './../../global/loader'
import moment from 'moment/moment.js'

class ContentOnlineExam extends Component {
    render() {
        const period_name = _.get(this.props.listOnlineExam, 'schoolYear.period_name', null)

        const data = this.props.data
        const assessments = data.assessments
        const entries = data && assessments && assessments.entries
        let content = []

        if (entries) {
            if (entries.length) {
                entries.map((x) => {
                    x.assessment_subjects.map((assessment_subjects) => {
                        let school_subject_id = assessment_subjects.school_subject_id
                        const date = moment(x.created_at).locale('id').format('LL')
                        content.push(
                            <div className='disblock' key={Math.random()}>
                                <div className='right-block__panel'>
                                    <div className='row h-100'>
                                        <div className='col-sm-4 right-block__panel-part'>
                                            <label className='header-title disblock padding-bottom-1'>{x.name}</label>
                                            <div className='right-block__basic-info-wrapper'>
                                                <div className='right-block__basic-info'>
                                                    <i className='fa fa-calendar-o padding-right-1'></i>
                                                    <label className='info'>{date === null ? '' : date}</label>
                                                </div>
                                                <label className='right-block__basic-info'>
                                                    {x.assessment_type_text === null ? '' : x.assessment_type_text}
                                                </label>
                                                <label className='right-block__basic-info'>
                                                    {x.duration !== null ? '0' : x.duration} Menit
                                             </label>
                                            </div>
                                            <label className='p'>{x.grade_name === null ? '' : x.grade_name}  {x.major_name === null ? '' : x.major_name}</label>
                                            <ActionList
                                                flag={x.is_editable}
                                                id={x.id}
                                                subjectId={school_subject_id}
                                                name={x.name}
                                                create={this.props.create}
                                            />
                                        </div>
                                        <div className='col-sm-4 right-block__panel-part padding-top-4'>
                                            <div className='padding-bottom-1'>
                                                <label className='p'>Progress</label>
                                                <span className='pull-right p-green'>{x.assigned_exam.percentage === null ? '0' : x.assigned_exam.percentage}%</span>
                                            </div>
                                            <Progress value={x.assigned_exam.progress} />
                                            <label className='info padding-top-1'>{x.assigned_exam.created_question_count === null ? '0' : x.assigned_exam.created_question_count}/{x.assigned_exam.question_count === null ? '0' : x.assigned_exam.question_count} Terbuat</label>
                                        </div>
                                        <div className='col-sm-4'>
                                            <DetailAction
                                                id={x.id}
                                                examId={x.assigned_exam.id}
                                                detailClicked={this.props.detailClicked}
                                                detail={x.assigned_exam.created_question_count}
                                            />
                                            <div className='padding-bottom-2'>
                                                <DetailOnlineExam
                                                    detail={x.assigned_exam}
                                                />
                                                <label className='info text-justify'>{x.assigned_exam.description === null ? ' ' : x.assigned_exam.description}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                })
            }
            else {
                content.push(<NotAvailable key={Math.random()}>Data Tidak Tersedia</NotAvailable>)
            }
        }

        return (
            <div className='col-sm-9 right-block'>

                <div className='w-100'>
                    <div className='header-content margin-bottom-4'>
                        <label className='header-title disblock padding-top-6'>Daftar Ujian</label>
                        <label className='padding-top-2 info margin-bottom-3'>Periode {period_name}</label>
                    </div>
                    <div className='right-block__panel-wrapper margin-bottom-4'>
                        {
                            this.props.loader ?
                                <Loader loader={true} />
                                :
                                content

                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listOnlineExam: state.listOnlineExam, //listOnlineExam dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(ContentOnlineExam)