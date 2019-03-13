import React, { Component } from 'react'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import RightContent from './../../components/RightSide/RightSide'
import SelectData from './select';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap'
import { getDataScoreQuestion, handleScore } from './../../redux-modules/modules/score'

class Content extends Component {
    constructor(props) {
        super(props)
        this.handlSave = this.handlSave.bind(this)
    }
    handlSave(e) {
        this.props.handleSave(e)

    }
    render() {
        const question_exam = this.props && this.props.data_exam && this.props.data_exam.data && this.props.data_exam.data.collections || []
        const exam = this.props && this.props.data_exam && this.props.data_exam.data && this.props.data_exam.data.exam_question || []
        const question_skill = this.props && this.props.data_exam && this.props.data_exam.data && this.props.data_exam.data.question_skill || []
        let main_content = []
        const type = this.props.type
        let content = []

        if (type === 'skill') {
            question_exam.map((data, index) => {
                data.questions.map((x) => {
                    let merge_content = []
                    merge_content.push(
                        <td> <input
                            type="text"
                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'ans') }}
                            className="padding-1 fullwidth"
                            defaultValue={x.user_problem_answer.ans}
                        /> </td>
                    )
                    merge_content.push(
                        <td><input
                            type="text"
                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'score') }}
                            defaultValue={x.user_problem_answer.score}
                        /></td>
                    )


                    let merge_content_skill = []
                    merge_content_skill.push(
                        <td className="skill-socre-td"><input
                            type="text"
                            className="align-center box-right"
                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'score') }}
                            defaultValue={x.user_problem_answer.score}
                        /></td>
                    )
                    content.push(<tr key={index}>
                        <td className="align-left text-center">{x.qn_number}</td>
                        <td className="align-left text-left" key={x.problem_type}>{x.problem_type}</td>
                        {merge_content_skill}
                        <td>{x.weight}</td>
                    </tr>)
                }, this)
            }, this)

        } else {
            exam.map((x, index) => {
                let merge_content = []
                if (x.problem_type === 'multiple_choice') {
                    merge_content.push(<SelectData choices={x.exam_question_choices} max_score={x.max_score} index={index} exam={x.ans} />)
                    merge_content.push(<td className="align-center">{exam[index]['score']}</td>)
                } else {
                    merge_content.push(
                        <td>
                            <div className="content-input">
                                <input
                                    placeholder="Masukkan skor anda"
                                    onChange={(e) => { this.props.handleScore(e.target.value, index, x, index, 'ans', 'knowledge') }}
                                    className="fullwidth"
                                    defaultValue={exam[index]['ans']}
                                />
                            </div>
                        </td>
                    )
                    merge_content.push(
                        <td>
                            <div className="content-input form-position">
                                <input
                                    placeholder="Masukkan skor anda"
                                    onChange={(e) => { this.props.handleScore(e.target.value, index, x, index, 'score', 'knowledge') }}
                                    className=" align-center"
                                    defaultValue={exam[index]['score']}
                                />
                            </div>
                        </td>
                    )
                }


                content.push(<tr key={index}>
                    <td className="align-center valign-center">
                        <label className="body-table">{x.qn_number}</label>
                    </td>
                    <td className="align-left valign-center">
                        <label className="body-table">{x.problem_type === 'essay' ? 'Uraian' : 'Pilihan Ganda'}</label>
                    </td>
                    {merge_content}
                    <td className="align-left valign-center">
                        <label className="body-table">{x.weight}</label>
                    </td>
                </tr>)

            }, this)
        }


        if (type === 'skill') {
            question_skill.map((data, index) => {
                console.log(data, "my data will")
                main_content.push(
                    <div className="range-table">
                        <div className="title-indicator  padding-bottom-3">{data.data}</div>
                        <table className="table">
                            <thead className=" head-table ">
                                <tr className="head-table">
                                    <td className="align-center" width="10%">
                                        <label className="head-table">No</label>
                                    </td>
                                    <td className="align-left" width="30%">
                                        <label className="head-table">Indikator</label>
                                    </td>
                                    <td className="align-center" width="35%">
                                        <label className="head-table">Skor</label>
                                    </td>
                                    <td className="align-center" width="20%">
                                        <label className="head-table">Bobot</label>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.question_score.map((x, idx) => {
                                        return <tr key={idx}>
                                            <td className="align-center valign-center">
                                                <label className="body-table ">{x.qn_number}</label>
                                            </td>
                                            <td className="align-left valign-center">
                                                <label className="body-table">{x.question}</label>
                                            </td>
                                            <td>
                                                <div className="content-input form-position">
                                                    <input
                                                        className="disblock align-center body-table  "
                                                        placeholder="Masukkan skor anda"
                                                        onChange={(e) => { this.props.handleScore(e.target.value, index, data, idx, 'score', 'skill') }}
                                                        defaultValue={x.user_problem_answer.score}
                                                    />
                                                </div>
                                            </td>
                                            <td className="align-center valign-center">
                                                <label className="body-table">{x.weight}</label>
                                            </td>

                                        </tr>

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            })
        } else {
            main_content.push(
                <table className="table">
                    <thead className="right-content-score__table-head head-table ">
                        <tr>
                            <td className="align-center" width="10%">
                                <label className="head-table">No</label>
                            </td>
                            <td className="align-left" width="20%">
                                <label className="head-table">Tipe Soal</label>
                            </td>
                            <td className="align-center" width="30%">
                                <label className="head-table">Jawaban Soal</label>
                            </td>
                            <td className="align-center" width="35%">
                                <label className="head-table">Skor</label>
                            </td>
                            <td className="align-center" width="20%">
                                <label className="head-table">Bobot</label>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            )
        }
        let title = []
        if (type === 'skill') {
            title.push(
                <div className="title-page">
                    Masukan Nilai Keterampilan
               </div>
            )
        }else if(type === 'knowledge'){
            title.push(
                <div className="title-page">
                    Masukan Nilai Pengetahuan
               </div>
            )
        }

        return (
            <div className=" margin-top-8 bg-white container-fluid container-fluid-custom rounded-corners">
                <div className="row rounded-10">
                    <LeftSide>
                        <Profile dataProfile={this.props.student && this.props.student.data} />
                    </LeftSide>
                    <RightContent>
                        <div className="right-content-score">
                            {title}
                            <div>
                                <div className="table-responsive">
                                    <div className="padding-top-4">
                                        {main_content}
                                    </div>
                                    <div className="margin-top-3 align-right padding-bottom-3">
                                        <button className="submit-btn" onClick={(e) => { this.handlSave(e) }}>Simpan </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RightContent>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_exam: state.score,
    student: state.student
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getDataScoreQuestion,
    handleScore
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Content);



