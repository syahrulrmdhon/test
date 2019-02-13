import React, { Component } from 'react'
import ChartNoQuestions from '../../../components/chart/chart-no-questions';
import CardNoQuestions from './card-no-questions';


export default class TopContentNoQuestions extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-10">
                    <div className="title-content-evaluasi margin-top-4 margin-bottom-2">
                        <span>Hasil Perolehan Nilai</span>
                    </div>
                    <div className="content-chart margin-top-8">
                        <ChartNoQuestions
                            chart={this.props.chart}
                        />
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="box-position">
                        <CardNoQuestions
                            passed={this.props.passed}
                            notPassed={this.props.notPassed}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
