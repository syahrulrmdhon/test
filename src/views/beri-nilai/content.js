import React, { Component } from 'react'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import RightContent from './../../components/RightSide/RightSide'
import SelectData from './select';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
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
        let main_content = []
        const type = this.props.type
        let content = []

        if (type === 'skill') {
            console.log("question", question_exam)
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
                    console.log("here hit event lala", x.ans)
                    merge_content.push(<SelectData choices={x.exam_question_choices} max_score={x.max_score} index={index} exam={x.ans} />)
                    merge_content.push(<td className="align-center">{exam[index]['score']}</td>)
                } else {
                    merge_content.push(
                        <td> <input
                            type="text"
                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'ans') }}
                            className="padding-1 fullwidth"
                            defaultValue={exam[index]['ans']}
                        /> </td>
                    )
                    merge_content.push(
                        <td><input
                            type="text"
                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'score') }}
                            defaultValue={exam[index]['score']}
                        /></td>
                    )
                }


                content.push(<tr key={index}>
                    <td className="align-left text-center">{x.qn_number}</td>
                    <td className="align-left text-left" key={x.problem_type}>{x.problem_type === 'essay' ? 'Essay' : 'Multiple Choice'}</td>
                    {merge_content}
                    <td>{x.weight}</td>
                </tr>)

            }, this)
        }


        if (type === 'skill') {
            question_exam.map((data, index) => {
                data.questions.map((x) => {
                    main_content.push(
                        <div className="range-table">
                            <div className="title-indicator padding-bottom-3">{x.problem_type}</div>
                            <table id="table-score" className="right-content-score____table">
                                <thead className="right-content-score__table-head">
                                    <th className="right-content-score__no align-left text-center">No</th>
                                    <th>Indikator</th>
                                    <th className="align-center">Skor</th>
                                    <th>Bobot</th>
                                </thead>
                                <tbody>
                                    <tr key={index}>
                                        <td className="align-left text-center">{x.qn_number}</td>
                                        <td className="align-left text-left" key={x.problem_type}>{x.question}</td>
                                        <td className="skill-socre-td"><input
                                            type="text"
                                            className="align-center box-right"
                                            onChange={(e) => { this.props.handleScore(e.target.value, index, 'score') }}
                                            defaultValue={x.user_problem_answer.score}
                                        /></td>
                                        <td>{x.weight}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })
            })
        } else {
            main_content.push(
                <table id="table-score" className="right-content-score____table">
                    <thead className="right-content-score__table-head">
                        <th className="right-content-score__no align-left text-center">No</th>
                        <th>Tipe Soal</th>
                        <th className="align-center">Jawaban Soal</th>
                        <th className="align-center">Skor</th>
                        <th>Bobot</th>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
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
                            <div className="right-content-score__title">
                                Masukan Nilai
                        </div>
                            <div>
                                <div className="table-responsive">
                                    <div className="padding-top-4">
                                        {main_content}
                                    </div>
                                    <div className="margin-top-3 align-right">
                                        <button className="submit-btn" onClick={(e) => { this.handlSave(e) }}>Submit </button>
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



