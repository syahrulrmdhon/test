import React, { Component } from 'react'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
var FontAwesome = require('react-fontawesome')
import { setLabelSelect } from './../../../utils/common'

export default class Classes extends Component {
    constructor(props){
        super(props)

        this.state = {
            class_id: null,
            start_date: new Date(),
            deadline_date: new Date(),
            comp_kkms: [],
        }
    }

    render(){
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1">
                <a href="javascript:void(0);" onClick={() => {this.props.removeClass(this.props.index)}}>
                    <FontAwesome name="trash" className="margin-top-6" />
                </a>
            </div>
        }

        let basic_comps = []
        if(this.props.basic_comps.length > 0){
            this.props.basic_comps.map((basic_comp, idx) => {

                let basic_kkm = this.props.data.comp_kkms ? this.props.data.comp_kkms.find((element) => { return element.basic_comp_id == basic_comp.id }) : []
                basic_kkm = (basic_kkm == undefined ) ? [] : basic_kkm

                let kkm = basic_kkm.kkm

                basic_comps.push(
                    <div className="row margin-top-2" key={idx}>
                        <div className="col-sm-6">
                            <div className="bold">
                                {basic_comp.competency_number} {basic_comp.content}
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="filter">
                                <input 
                                    className="disblock fullwidth" 
                                    placeholder="Masukkan KKM" 
                                    onChange={(event) => {this.props.handleBasicCompAttr(event, basic_comp.id, this.props.index, idx)}}
                                    value={kkm}
                               />
                            </div>
                        </div>
                    </div>
                )
            })
        }

        const start_date = this.props.data.start_date ? new Date(this.props.data.start_date) : new Date()
        const deadline_date = this.props.data.deadline_date ? new Date(this.props.data.deadline_date) : new Date()


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
                                    options={this.props.class_filters}
                                    onChange={(event) => {this.props.handleClassAttr(event, this.props.index)}}
                                    value={setLabelSelect(this.props.class_filters, this.props.data.class_id)}
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
                                    selected={start_date}
                                    placeholderText="Weeks start on Monday"
                                    dateFormat="Pp"
                                    timeCaption="Time"
                                    onChange={(event) => {this.props.handleTimeAttr(event, 'start_date', this.props.index)}}
                                    showTimeSelect
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
                                    selected={deadline_date}
                                    placeholderText="Weeks start on Monday"
                                    dateFormat="Pp"
                                    timeCaption="Time"
                                    onChange={(event) => {this.props.handleTimeAttr(event, 'deadline_date', this.props.index)}}
                                    showTimeSelect
                                />
                                <i className="fa fa-calendar calendar-icon" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-6">
                    <div className="col-sm-6">
                            <label className="content-label">K.D MEmahami Makna Denotasi dan Konotasi</label>
                    </div>
                </div>
                {basic_comps}
                <div className="border-bottom margin-top-6"></div>
            </div>
        )
    }
}