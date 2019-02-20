import React, { Component } from 'react'
import { UserNotPassed } from './helper'

export default class KkmNoQuestions extends Component {
    render() {
        return (
            <div className='margin-top-4 padding-4 margin-bottom-2'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <p className='float-left normal-text-bold margin-top-2'>Nilai dibawah KKM</p>
                    </div>
                    <div className='col-sm-4'>
                        {/* <span className='float-right view margin-top-2'>Lihat Semua</span> */}
                    </div>
                </div>
                <div className='row box-not-passed h-100'>
                        <UserNotPassed
                            notPassed={this.props.notPassed}
                        />
                </div>
                <div className='remedial padding-top-6'>
                    {/* <button className='btn-white'>Remedial</button> */}
                </div>
            </div>
        )
    }
}
