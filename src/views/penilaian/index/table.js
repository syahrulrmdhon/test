import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome');

export default class Table extends Component {
    render(){
        return(
            <div className="table-responsive">
                <table className="table assessment">
                    <thead>
                        <tr className="main-head">
                            <th></th>
                            <th>Judul Topik</th>
                            <th>Mata Pelajaran</th>
                            <th>Tanggal Dibuat</th>
                            <th className="align-right padding-right-6">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-center"><span className="bullet bcgreen"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-center"><span className="bullet bcgray2"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-center"><span className="bullet bcred"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-center"><span className="bullet bcyellow"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-center"><span className="bullet bclblack2"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                        <tr>
                            <td className="align-center"><span className="bullet bcgreen"></span></td>
                            <td>Persamaan linear dan persamaan tidak linear</td>
                            <td>Matematika</td>
                            <td>20/01/2019</td>
                            <td className="align-right padding-right-6">
                                <a href="javacript:void(0);" className="btn default margin-right-4">Lihat</a>
                                <FontAwesome name="trash" className="margin-left-2 margin-right-2 cgreen" />
                                <FontAwesome name="edit" className="margin-left-2 cgreen" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}