import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from './../../../components/Title'
import Header from './../../global/header'
import Switch from "react-switch";
import Select from 'react-select'

//scss
import './../../../styles/online-test.scss'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = { checked: false };
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
    }

    handleChangeSwitch(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <Page title="Tulis Ujian Online">
                <Header />
                <div className="new-exam-online padding-content h-100">
                    <div className="margin-content full-margin">
                        <div className="content-wrapper">
                            <div className="border-bottom">
                                <div className="padding-5">
                                    <span className="title-page"> Buat Soal Ujian </span>
                                    <span className="subject-head float-right"> GEOGRAFI-X1 IPS </span>
                                </div>
                            </div>
                            <div className="form-position">
                                <div className="col-sm-12">
                                    <div className="margin-top-5">
                                        <label>Judul Ujian</label>
                                        <div className="margin-top-1">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="margin-top-5">
                                        <label>Nilai KKM</label>
                                        <div className="margin-top-1">
                                            <input type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="margin-top-5">
                                        <label>Kisi-kisi/Indikator</label>
                                        <div className="margin-top-1">
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="margin-top-5">
                                        <label>Duplikat Soal</label>
                                        <Switch
                                            onChange={this.handleChangeSwitch}
                                            checked={this.state.checked}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            onHandleColor="#ffffff"
                                            onColor="#1a9d7f"
                                            offColor="#cccccc"
                                            id="normal-switch"
                                            height={18}
                                            width={35}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="margin-top-5">
                                                <label>Tipe Soal</label>
                                                <div className="margin-top-1">
                                                    <Select
                                                        classNamePrefix="select"
                                                        className="fullwidth"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="margin-top-5">
                                                <label>Jumlah Soal </label>
                                                <div className="margin-top-1">
                                                    <input type="number" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
