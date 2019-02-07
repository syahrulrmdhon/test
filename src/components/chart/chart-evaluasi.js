import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

export default class ChartEvaluasi extends Component {
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <Chart
                    width={'100%'}
                    height={'220px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={this.props.examChart}
                    options={
                        {
                            colors: ['#bfbfbf', '#eb363e'],
                        }
                    }

                />
            </div>
        )
    }
}
