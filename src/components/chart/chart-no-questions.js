import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import './../../styles/beri-nilai/main.scss'

export default class ChartNoQuestions extends Component {
    render() {
        return (
            <div className="d-flex">
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
                            legend: {position: 'none'},
                            colors: '#2fa8e7',
                            animation: { duration: 1000, easing: 'out', },
                        }
                    }

                />
            </div>
        )
    }
}
