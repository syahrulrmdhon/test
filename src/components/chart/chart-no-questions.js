import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import './../../styles/beri-nilai/main.scss'

export default class ChartNoQuestions extends Component {
    render() {
        let chart = []
        if (this.props.chart.length > 0) {
            chart.push(
                <Chart
                    width={'100%'}
                    height={'220px'}
                    chartType="Bar"
                    loader={
                        <div className='loader'></div>
                    }
                    data={this.props.chart}
                    options={
                        {
                            legend: { position: 'none' },
                            colors: '#2fa8e7',
                            animation: { duration: 1000, easing: 'out', },
                        }
                    }

                />
            )
        }

        return (
            <div className="d-flex">
                {chart}
            </div>
        )
    }
}
