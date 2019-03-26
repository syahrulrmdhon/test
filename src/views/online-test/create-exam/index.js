import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from './../../../components/Title'
import Header from './../../global/header'
import Switch from 'react-switch'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'

//scss
import './../../../styles/online-test.scss'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            name: props.location.state.name,
            assessment_id: props.match.params.assessment_id,
        };
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
    }

    backToList() {
        this.props.history.goBack()
    }

    handleChangeSwitch(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <Page title="Tulis Ujian Online">
                <Header />
                <div className='new-exam-online padding-content h-100'>
                    <div className='margin-content full-margin'>
                        <div className='content-wrapper'>
                            <div className='border-bottom'>
                                <div className="padding-3">
                                    <span className="title-page"> Buat Soal Ujian </span>
                                    <span className="title-page float-right"> {this.state.name} </span>
                                </div>
                            </div>
                            <div className='form-position margin-bottom-3'>
                                <div className="margin-top-3">
                                    <label>Judul Ujian</label>
                                    <div className="margin-top-1">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Nilai KKM</label>
                                    <div className="margin-top-1">
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Kisi-kisi/Indikator</label>
                                    <div className="margin-top-1">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="margin-top-3">
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
                                <div className='margin-top-3'>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <label>Tipe Soal</label>
                                            <div className="margin-top-1">
                                                <Select
                                                    classNamePrefix="select"
                                                    className="fullwidth"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Jumlah Soal </label>
                                            <div className="margin-top-1">
                                                <input type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className='normal-green-text'> Tambah Tipe Soal</span>
                                </div>
                                <div className='margin-top-3'>
                                    <div className='button'>
                                        <button className='btn-white margin-right-3'
                                            onClick={this.backToList.bind(this)}
                                        >
                                            Kembali
                                        </button>
                                        <button className='btn-green'>Lanjut</button>
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
