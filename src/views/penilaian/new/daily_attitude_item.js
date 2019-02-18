import React, { Component } from 'react'
import Select from 'react-select';
import Autocomplete from 'react-autocomplete';

import {apiClient} from './../../../utils/apiClient'

import {
    removeAttitudeItem,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class DailyAttitudeItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
        }
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.onSelect = this.onSelect.bind(this)
    }

    getItemValue(item){
        return `${item.value} - ${item.label}`;
    }

    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    onChange(event){
        // this.setState({
        //     value: e.target.value
        // });
        this.retrieveUsers(e.target.value);
    }

    retrieveUsers(searchText){
        let url = `/v1/filters/users?full_name=${searchText}`;

        apiClient('get', url).then(response => {
            console.log(response)
        }).catch(err => {
            alert('Kesalahan API User')
        })
    }

    onSelect(val){
        // this.setState({
        //     value: val
        // });

        console.log("Option from 'database' selected : ", val);
    }

    render(){
        let remove;
        const user_id = this.props.user_attitude ? this.props.user_attitude.user_id : null
        const class_id = this.props.user_attitude ? this.props.user_attitude.class_id : null
        const description = this.props.user_attitude ? this.props.user_attitude.description : null

        if(this.props.index > 0){
            remove = <div className="col-sm-1 margin-top-9">
                <a href="javascript:void(0);" onClick={() => {this.props.removeAttitudeItem(this.props.index)}}>
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }

        return(
            <div>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="content-input margin-top-5">
                                    <label className="content-label">Nama Peserta Didik</label>
                                    {/* <input 
                                        placeholder="Masukkan nama peserta didik"
                                        className= "disblock fullwidth"
                                    /> */}
                                    <Autocomplete
                                        getItemValue={this.getItemValue}
                                        items={this.state.users}
                                        renderItem={this.renderItem}
                                        // value={this.state.value}
                                        onChange={this.onChange}
                                        onSelect={this.onSelect}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="content-input margin-top-5">
                                    <label className="content-label">Nilai Sikap</label>
                                    <Select
                                        isClearable
                                        className= "select-list"
                                        classNamePrefix= "select"
                                        placeholder= "Pilih nilai sikap"
                                        name= "score"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="content-input margin-top-4">
                                    <label className="content-label">Deskripsi Sikap</label>
                                    <textarea 
                                        placeholder="Masukkan keterangan"
                                        className= "disblock fullwidth textarea-box"
                                    >
                                    {description}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    {remove}
                </div>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="margin-vert-4 border-bottom"></div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    assessment: state.assessment,
    user_attitude: state.assessment.user_attitudes_attributes ? (state.assessment.user_attitudes_attributes.length > 0 ? state.assessment.user_attitudes_attributes[props.index] : {}) : {}
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    removeAttitudeItem,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DailyAttitudeItem)