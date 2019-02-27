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
        console.log(question_exam,"my quest")
        console.log(exam,"my quest")
        let main_content = []
        const type = this.props.type
        let content = []

        if (type === 'skill') {
            main_content.push(
                <thead className="right-content-score__table-head">
                    <th className="right-content-score__no align-left text-center">No</th>
                    <th>Indikator</th>
                    <th className="align-center">Skor</th>
                    <th>Bobot</th>
                </thead>
            )
        } else {
            main_content.push(<thead className="right-content-score__table-head">
                <th className="right-content-score__no align-left text-center">No</th>
                <th>Tipe Soal</th>
                <th className="align-center">Jawaban Soal</th>
                <th className="align-center">Skor</th>
                <th>Bobot</th>
            </thead>)
        }

        question_exam.map((x, index) => {
            let merge_content = []
            if (x.problem_type === 'multiple_choice') {
                merge_content.push(<SelectData choices={x.exam_question_choices} max_score={x.max_score} index={index} exam={exam[index]} />)
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

            let merge_content_skill = []
            merge_content_skill.push(
                <td><input
                    type="text"
                    className="align-center box-right"
                    onChange={(e) => { this.props.handleScore(e.target.value, index, 'score') }}
                    defaultValue={exam[index]['score']}
                /></td>
            )


            if (type === 'skill') {
                content.push(<tr key={index}>
                    <td className="align-left text-center">{x.qn_number}</td>
                    <td className="align-left text-left" key={x.problem_type}>{x.question}</td>
                    {merge_content_skill}
                    <td>{x.weight}</td>
                </tr>)
            } else {
                content.push(<tr key={index}>
                    <td className="align-left text-center">{x.qn_number}</td>
                    <td className="align-left text-left" key={x.problem_type}>{x.problem_type === 'essay' ? 'Essay' : 'Multiple Choice'}</td>
                    {merge_content}
                    <td>{x.weight}</td>
                </tr>)
            }
        }, this)

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
                                    <table id="table-score" className="right-content-score____table">
                                        {main_content}
                                        <tbody>
                                            {content}
                                        </tbody>
                                    </table>
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



