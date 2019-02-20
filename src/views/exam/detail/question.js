import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExamQuestion } from './../../../redux-modules/modules/questionDetail'
import { bindActionCreators } from 'redux';

export class question extends Component {
    render() {
        const question = this.props.question && this.props.question.data && this.props.question.data.exam_questions;
        let content = []
        question && question.map((data, idx) => {
            if (data.problem_type === 'multiple_choice') {
                content.push(<div className="row" key={Math.random()}>
                    <div className="col-sm-12">
                        <div className="padding-1 padding-bottom-2">
                            <div className="col-sm-1">
                                <span className="align-center">{data.qn_number}</span>
                            </div>
                            <div className="col-sm-8">
                                <span className="question__question_label">{data.question}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">

                        {
                            data.exam_question_choices.map((data, idx) => {
                                return <div className="padding-1 padding-bottom-2 answer"  key={Math.random()}>
                                    <div className="col-sm-8" key={idx}>
                                        {data.is_correct_ans === true ? <span className="cgreen" key={idx}>{data.symbol + '. ' + data.content}</span> : <span className="question__answer_label" key={idx}>{data.symbol + '. ' + data.content}</span>}
                                    </div>
                                </div>

                            })
                        }
                    </div>
                </div>)
            } else {
                content.push(<div className="row" key={Math.random()}>
                    <div className="col-sm-12">
                        <div className="padding-1 padding-bottom-2">
                            <div className="col-sm-1">
                                <span className="align-center">{data.qn_number}</span>
                            </div>
                            <div className="col-sm-8">
                                <span className="question__question_label">{data.question}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                    {
                            data.exam_question_choices.map((data, idx) => {
                                return <div className="padding-1 padding-bottom-2 answer"  key={Math.random()}>
                                    <div className="col-sm-8" key={idx}>
                                     <span className="question__answer_label">Jawab:</span>   { <span className="question__answer_label" key={idx}>{data.content}</span>}
                                    </div>
                                </div>

                            })
                        }

                    </div>
                </div>)
            }

        })

        return (
            <div className="bg-white">
                <div className="position-bullet" >
                    <span className=" bullet bcgreen"></span>
                    <span className="padding-left-2 question____correct_ans">Warna jawaban yang benar</span>
                    <span className="question__update" onClick={() => this.props.redirect('question')}>Ubah</span>
                </div>
                {content}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    question: state.questionDetail
})


const mapDispatchToProps = dispatch => bindActionCreators({ getExamQuestion }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(question)

