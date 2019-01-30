import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
export default class componentName extends Component {
    render() {
        return (
            <div>
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
                    
                </div>
            </div>
        )
    }
}
