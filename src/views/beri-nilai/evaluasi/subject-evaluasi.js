import React, { Component } from 'react'

export default class SubjectEvaluasi extends Component {
    render() {
        return (
            <div className="margin-top-4 padding-2 margin-bottom-2 right-block-evaluasi">

                {
                    this.props.competencySubjects.map(function (data, i) {
                        return <div key={i}>
                            <span className="normal-text-bold">{data.subject_name}</span>
                            <br /><br />
                            <div>
                                {
                                    data.competency_scores.map(function (x, idx) {
                                        return <p className="text-justify content-competency" key={idx}>
                                            {x.basic_comp.competency_number} {x.basic_comp.content}
                                        </p>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}
