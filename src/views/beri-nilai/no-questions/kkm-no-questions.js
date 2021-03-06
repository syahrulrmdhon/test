import React, { Component } from 'react'
import { UserNotPassed } from './helper'

export default class KkmNoQuestions extends Component {
    render() {
        return (
            <div className='right-content-kkm'>
                <div className='margin-top-3'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='title-kkm'>Nilai di Bawah KKM</div>
                        </div>
                        <div className='col-md-5'>
                            <div className='kkm'>KKM: {this.props.kkm === null ? 'N/A' : this.props.kkm}</div>
                        </div>
                    </div>
                    <UserNotPassed
                        notPassed={this.props.notPassed}
                    />
                </div>
            </div>
            // <div className='margin-top-4 padding-4 margin-bottom-2'>
            //     <div className='row'>
            //         <div className='col-sm-8'>
            //             <p className='float-left normal-text-bold margin-top-2'>Nilai dibawah KKM</p>
            //         </div>
            //         <div className='col-sm-4'>
            //             <span className='float-right view margin-top-2'>
            //                 KKM: &nbsp;
            //             {this.props.kkm===null ? 'N/A': this.props.kkm}
            //             </span>
            //         </div>
            //     </div>
            //     <div className='row box-not-passed h-100'>
            //         <UserNotPassed
            //             notPassed={this.props.notPassed}
            //         />
            //     </div>
            //     <div className='remedial padding-top-6'>
            //         <button className='btn-white'>Remedial</button>
            //     </div>
            // </div>
        )
    }
}
