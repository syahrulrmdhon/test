import React, { Component } from 'react'
import { connect } from 'react-redux'
import Panel from './panel'
import Header from './../../global/header'
import './../../../styles/attitude.scss'

export class index extends Component {

    render() {
        return (
            <div className="score-attitude">
                <div>
                    <Header navbar={false} />
                </div>
                <div className="padding-content">
                    <div className="margin-side bg-white">
                        <div className="margin-side-5">
                            <div className="padding-top-3">
                                <div className="block">
                                    <span className="score-attitude__title">Daftar Sikap Ahkir Mata Pelajaran</span>
                                </div>
                                <div>
                                    <span className="score-attitude__subject">Matematika</span>
                                </div>
                            </div>
                            <div className="padding-top-2">
                                    <Panel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
