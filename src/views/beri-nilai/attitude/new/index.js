import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from './../../../../components/Title'
import Header from './../../../global/header'
import Report from './report-list'
import Select from 'react-select'

//css
import './../../../../styles/attitude.scss'

export class componentName extends Component {
    render() {
        return (
            <Title title="Nilai Sikap">
                <div className="padding-content">
                    <div className="score-attitude-new">
                        <Header navbar={false} location="/score/attitude/" />
                        <div className="margin-side-4 margin-top-7">
                            <div className="col-sm-12">
                                <div className="col-sm-4" >
                                    <div className="content-block  content-score  ">
                                        <Report />
                                    </div>
                                </div>
                                <div className="col-sm-8" >
                                    <div className="content-block  content-score  ">
                                        <div className="padding-3">
                                            <div className="score-attitude-new__predicate-title">
                                                <span className="score-attitude-new__right-title-name ">Nilai Ahkir(Disiplin)</span>
                                                <span className="score-attitude-new__predicate-title"> - Hengky Reza Permana</span>
                                            </div>
                                            <div className="form margin-top-5">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Nilai Ahkir</label>
                                                        <div className="padding-top-1">
                                                            <Select
                                                                className="select-box"
                                                                classNamePrefix="select"
                                                                placeholder="Pilih Nilai Ahkir"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row padding-top-5">
                                                    <div className="col-sm-12">
                                                        <label className="score-attitude-new__label-form">Deskripsi Sikap</label>
                                                        <div className="padding-top-1">
                                                            <textarea className="textarea-description form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row margin-top-10">
                                                    <div className="col-sm-4">
                                                        <div className="range-button ">
                                                            <button className="btn-green">Submit</button>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Title>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
