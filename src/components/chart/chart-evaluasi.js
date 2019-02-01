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
                    data={[
                        ['', 'Benar', 'Salah'],
                        ["1", 18, 12],
                        ["2", 28, 2],
                        ["3", 22, 8],
                        ["4", 10, 10],
                        ["5", 12, 18],
                        ["6", 30, 1],
                        ["7", 2, 28],
                        ["8", 24, 6],
                        ["9", 12, 18],
                        ["10", 2, 28],
                        ["11", 18, 12],
                        ["12", 28, 2],
                        ["13", 22, 8],
                        ["14", 10, 10],
                        ["15", 12, 18],
                        ["16", 30, 1],
                        ["17", 2, 28],
                        ["18", 24, 6],
                        ["19", 12, 18],
                        ["20", 2, 28],
                        ["21", 18, 12],
                        ["22", 28, 2],
                        ["23", 22, 8],
                        ["24", 10, 10],
                        ["25", 12, 18],
                        ["26", 30, 1],
                        ["27", 2, 28],
                        ["28", 24, 6],
                        ["29", 12, 18],
                        ["30", 2, 28]
                    ]}
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
