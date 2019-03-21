import React, { Component } from 'react'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
var FontAwesome = require('react-fontawesome')
import { 
    handleClass,
    handleTimeAttr,
} from './../../../redux-modules/modules/exam'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicComp from './basic_comp'

class Classes extends Component {
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
        const data = this.props.exam && this.props.exam.data && this.props.exam.data.exam.exam_classes_attributes[this.props.index] || []
        const class_filters = this.props.exam && this.props.exam.data && this.props.exam.data.class_filters;
        const basic_comps = this.props.exam && this.props.exam.data && this.props.exam.data.basic_comps;
        console.log(class_filters,"class filtr")
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1">
                <a href="javascript:void(0);" onClick={() => {this.props.removeClass(this.props.index)}}>
                    <FontAwesome name="trash" className="margin-top-6" />
                </a>
            </div>
        }

        let in_basic_comps = []
        if(basic_comps){
            basic_comps.map((basic_comp, idx) => {
                in_basic_comps.push(
                    <BasicComp 
                        key={idx}
                        class_index={this.props.index}
                        index={idx}
                        data={basic_comp}
                    />
                )
            })
        }

        let { start_date, deadline_date, class_id } = data

        start_date = start_date ? new Date(start_date) : new Date()
        deadline_date = deadline_date ? new Date(deadline_date) : new Date()

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
                                    name= "class_id"
                                    options={class_filters}
                                    onChange={(event) => {this.props.handleClass(event, this.props.index)}}
                                    value={class_filters.find((element) => { return element.value == class_id  })}
                                />
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
                            <label className="content-label header-title">Kompetensi Dasar</label>
                    </div>
                </div>
                {in_basic_comps}
                <div className="border-bottom margin-top-6"></div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    exam: state.exam,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleClass,
    handleTimeAttr,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Classes);