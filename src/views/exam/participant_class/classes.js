import React, { Component } from 'react'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
var FontAwesome = require('react-fontawesome')

export default class Classes extends Component {
    render(){
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1">
                <a href="javascript:void(0);">
                    <FontAwesome name="trash" className="margin-top-6" />
                </a>
            </div>
        }

        return(
            <div>
                <div className="margin-top-10">
                    <div className="row margin-top-4">
                        <div className="col-sm-6">
                            <div className="content-input">
                                <label className="content-label">Kelas</label>
                                <Select
                                    className= "select-list"
                                    classNamePrefix= "select"
                                    placeholder= "Pilih Kelas"
                                    name= "category"
                                    // options= {category_types}
                                    // onChange={this.categoryType}
                                    // value={this.state.category}
                                />
                                {/* <Error data={this.state.errors} fieldname= 'category' /> */}
                            </div>
                        </div>
                        <div className="col-sm-1">
                            {remove}
                        </div>
                    </div>
                </div>
                <div className="row margin-top-6">
                    <div className="col-sm-6">
                        <div className="content-input filter">
                            <label className="content-label">Tanggal Pengerjaan</label>
                            <div className="position-relative">
                                <DatePicker className="fullwidth disblock"
                                    // selected={this.props.selectedDate}
                                    // onChange={this.props.handleDateChange}
                                    placeholderText="Weeks start on Monday"
                                    // value={getDate('case-1', this.props.selectedDate)} 
                                />
                                <i className="fa fa-calendar calendar-icon" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="content-input filter">
                            <label className="content-label">Tanggal Penyelesaian</label>
                            <div className="position-relative">
                                <DatePicker className="fullwidth disblock"
                                    // selected={this.props.selectedDate}
                                    // onChange={this.props.handleDateChange}
                                    placeholderText="Weeks start on Monday"
                                    // value={getDate('case-1', this.props.selectedDate)} 
                                />
                                <i className="fa fa-calendar calendar-icon" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-6">
                    <div className="col-sm-6">
                        <div className="content-input filter">
                            <label className="content-label">K.D MEmahami Makna Denotasi dan Konotasi</label>
                            <input className="fullwidth disblock" placeholder="Masukkan KKM" />
                        </div>
                    </div>
                </div>
                <div className="border-bottom margin-top-6"></div>
            </div>
        )
    }
}