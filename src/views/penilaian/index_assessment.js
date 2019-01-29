import React, { Component } from 'react'
import Tab from './index/tab'

export default class IndexAssessment extends Component {
    render() {
        return(
            <div className="margin-top-6 margin-left-3 margin-right-6">
                <div className="row">
                    <div className="col-sm-6">
                        <label className="header-title">Daftar Topik Penilaian</label>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-right">
                            <a href="javascript:void(0);" className="submit-btn default">Tambah Topik</a>
                        </div>
                    </div>
                </div>
                <Tab />
                <div className="table-responsive">
                    <table className="table assessment">
                        <th>Judul Topik</th>
                        <th>Mata Pelajaran</th>
                        <th>Tanggal Dibuat</th>
                        <th>Tindakan</th>
                    </table>
                </div>
            </div>
        )
    }
}