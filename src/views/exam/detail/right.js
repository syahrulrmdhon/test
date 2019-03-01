import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExamQuestion } from './../../../redux-modules/modules/questionDetail'
import { bindActionCreators } from 'redux';
export class Right extends Component {
    render() {
        const data = this.props.bascomp && this.props.bascomp.data && this.props.bascomp.data.subject_competencies
        console.log(data, "here")
        let content = []
        let content_value = []
        data && data.map((data, idx) => {
            data.competency_scores.map((x, i) => {
                content_value.push(<div className="padding-top-3" key={Math.random()}>
                    <span>{x.basic_comp.competency_number+' '+x.basic_comp.content } </span>
                </div>)
            })
            content.push(<div key={Math.random()}>
                <div className="padding-5">
                    <span className="question__bascop">Kompetensi Dasar - {data.subject_name} </span>
                    <div className="padding-left-4">
                        {content_value}
                    </div>
                </div>
            </div>)
        })
        return (
            <div className="bg-white question__basic-competences box-top">
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bascomp: state.questionDetail
})


const mapDispatchToProps = dispatch => bindActionCreators({ getExamQuestion }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Right)
