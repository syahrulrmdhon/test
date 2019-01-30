import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
export default class componentName extends Component {
    render() {
        return (
            <div className="bottom-contents">
                <div className="row  title-content">
                    <div className="col-sm-6 ">
                        <span>Hasil Perolehan Nilai</span>
                    </div>
                    <div className="col-sm-3">
                        <Select
                            classNamePrefix='select'
                            placeholder='Urutkan Berdasarkan' />
                    </div>
                    <div className="col-sm-3">
                        <div className="search-in-table">
                            <input className="input-field" type="text" placeholder="Cari murid disini..." name="search" />
                            <i className="fa fa-search icon"></i>
                        </div>
                    </div>


                </div>
                <div className="row">
                <div className="table-responsive">
                        <table className="table-nilai ">
                            <tr>
                                 <th>Nama Murid</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
