import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import { NotAvailable } from '../../global/notAvailable';
import { DetailOnlineExam, Classes } from './helper-online'
import { getDate } from './../../../utils/common'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from './../../global/loader'

class ContentOnlineExam extends Component {
    render() {
        const period_name = _.get(this.props.listOnlineExam, 'schoolYear.period_name', null)

        const data = this.props.data
        const assessments = data.assessments
        const entries = data && assessments && assessments.entries
        let content = []

        console.log('ent', entries)

        if (entries) {
            entries.map((x) => {
                // let date = getDate('case-1', x.created_date)
                content.push(
                    <div className='disblock' key={Math.random()}>
                        <div className='right-block__panel'>
                            <div className='row h-100'>
                                <div className='col-sm-4 right-block__panel-part'>
                                    <label className='header-title disblock padding-bottom-1'>{x.name}</label>
                                    <div className='right-block__basic-info-wrapper'>
                                        <div className='right-block__basic-info'>
                                            <i className='fa fa-calendar-o padding-right-1'></i>
                                            <label className='info'>{x.created_date}</label>
                                        </div>
                                        <div className='right-block__basic-info'>
                                            {x.assessment_type_text === null ? '' : x.assessment_type_text}
                                        </div>
                                        <div className='right-block__basic-info'>
                                            {x.duration !== null ? '0' : x.duration} Menit
                                         </div>
                                    </div>
                                    <label className='p'>{x.grade_name === null ? 'Kelas Belum Dipilih' : x.grade_name}</label>
                                    <div className='padding-top-2 right-block__action-wrapper'>
                                        <div className='right-block__action'>Lihat</div>
                                        <div className='right-block__action'>Ubah Soal</div>
                                        <div className='right-block__action'>Hapus Soal</div>
                                    </div>
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
                                    <div className='padding-bottom-2'>
                                        <label className='p-bold padding-right-2'>Detil Soal</label>
                                        <i className='fa fa-pencil icon-green'></i>
                                    </div>
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
        } else {
            <NotAvailable>Data Tidak Tersedia</NotAvailable>
        }

        console.log(this.props.q)

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