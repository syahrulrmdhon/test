import React, { Component } from 'react';
import { Chart } from "react-google-charts";


export default class SingleBarChat extends Component {
  render() {
    console.log(this.props.chart, "data chart")
    return (
      <div style={{ display: 'flex' }}>
      <Chart
        width={'770px'}
        height={'220px'}
        chartType="Bar"
        color="red"
        loader={<div>Loading Chart</div>}
        data={this.props.chart}
        options={{
          legend: {position: 'none'},
          hAxis: {
          viewWindow: {
            min: [7, 100, 0],
            max: [17, 30, 0]
          }
        }
        }}

      />
     </div>
    )
  }
}
