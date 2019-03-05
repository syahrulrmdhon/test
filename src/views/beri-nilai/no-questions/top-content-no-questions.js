import React, { Component } from 'react'
import ChartNoQuestions from '../../../components/chart/chart-no-questions';
import CardNoQuestions from './card-no-questions';


export default class TopContentNoQuestions extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="col-md-12 score-result">
                <div className="row">
                    <div className="col-md-9 title-content">
                        <span>Hasil Perolehan Nilai</span>
                    </div>
                </div>
                <div className="row">
                    <div className="content-chart col-md-9">
                        <ChartNoQuestions
                            chart={this.props.chart}
                        />
                    </div>
                    <div className="col-md-3" >
                        <div className="box-postition">
                            <CardNoQuestions
                                passed={this.props.passed}
                                notPassed={this.props.notPassed}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
