import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

export default class ChartNoQuestions extends Component {
    render() {
        return (
            <div className="d-flex">
                <Chart
                    width={'100%'}
                    height={'220px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={this.props.chart}
                    options={
                        {
                            colors: '#2fa8e7'
                        }
                    }

                />
            </div>
        )
    }
}
