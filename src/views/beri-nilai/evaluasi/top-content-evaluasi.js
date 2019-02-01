import React, { Component } from 'react'
import ChartEvaluasi from '../../../components/chart/chart-evaluasi'
import CardEvaluasi from './card-evaluasi'
import './../../../styles/beri-nilai/card.scss'
import './../../../styles/global/component.css'

export default class TopContentEvaluasi extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <div className='row'>
        <div className='col-10'>
          <div className='title-content-evaluasi margin-top-4 margin-bottom-2'>
            <span>Evaluasi soal</span>
          </div>
          <div className='content-chart margin-bottom-4'>
            <ChartEvaluasi />
          </div>
        </div>
        <div className='col-2'>
          <div className='box-card-evaluasi margin-top-6'>
            <CardEvaluasi />
          </div>
        </div>
      </div>
    )
  }
}
