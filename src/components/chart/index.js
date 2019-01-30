import React, { Component } from 'react';
import { Chart } from "react-google-charts";


export default class SingleBarChat extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
      <Chart
        width={'770px'}
        height={'220px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['', 'Siswa'],
          ['0-10', 1],
          ['11-20', 7],
          ['21-30', 1],
          ['31-40', 8],
          ['41-50', 9],
          ['51-60', 6],
          ['61-70', 8]
        ]}
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
