import React, { Component } from 'react'

export default class SubjectEvaluasi extends Component {
    render() {
        console.log('scores', this.props.competencyScores)
        return (
            <div className="title-content-evaluasi margin-top-4 margin-bottom-2">
                <span>Matematika</span>
                <br /><br />
                {
                    this.props.competencyScores.map(function (x, i) {
                        return <div>
                            <p className="text-justify">
                                {x.basic_comp.competency_number} {x.basic_comp.content}
                            </p>
                            <br/>
                        </div>
                    })
                }
                {/* <div>
                    <p className="text-justify">
                        3.1 Memahami makna dalam percakapan transaksional dan interpersonal dalam konteks kehidupan sehari-hari
                    </p>
                    <br />
                    <p className="text-justify">
                        3.1 Memahami makna dalam percakapan transaksional dan interpersonal dalam konteks kehidupan sehari-hari
                    </p>
                    <br />
                    <p className="text-justify">
                        3.1 Memahami makna dalam percakapan transaksional dan interpersonal dalam konteks kehidupan sehari-hari
                    </p>
                    <br />
                    <p className="text-justify">
                        3.1 Memahami makna dalam percakapan transaksional dan interpersonal dalam konteks kehidupan sehari-hari
                    </p>
                </div> */}
            </div>
        )
    }
}
