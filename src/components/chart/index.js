import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'Recharts';
import { data } from './data';

export default class SingleBarChat extends Component {
  render() {
    return (
      <div>
        <BarChart width={735} height={263} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="1 1"/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#2fa8e7" />
        </BarChart>
      </div>
    )
  }
}
