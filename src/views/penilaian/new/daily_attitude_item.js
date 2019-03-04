import React, { Component } from 'react'
import Select from 'react-select';
import Autocomplete from 'react-autocomplete';

import {apiClient} from './../../../utils/apiClient'
import { 
    changeFormatOptions,
    attitudeScores,
} from './../../../utils/common'

import {
    removeAttitudeItem,
    handleAttitudeItem,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class DailyAttitudeItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            attitude_scores: [],
        }
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount(){
        attitudeScores.call(this)
    }

    getItemValue(item){
        return `${item.value} - ${item.label}`;
    }

    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'bcyellow' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    onChange(event, idx, fieldName){
        this.props.handleAttitudeItem(event.target.value, idx, fieldName)
        this.retrieveUsers(event.target.value, idx);
    }

    retrieveUsers(searchText, idx){
        let url = `/v1/filters/users?full_name=${searchText}`;

        apiClient('get', url).then(response => {
            const users = response.data.data.users.entries || []
            const options = changeFormatOptions(users, {
                key: 'id',
                value: 'full_name',
            })
            this.props.handleAttitudeItem(users, idx, 'data')
            this.props.handleAttitudeItem(options, idx, 'options')
        }).catch(err => {
            // alert('Kesalahan API User')
        })
    }

    onSelect(val, idx){
        if(val){
            const data_arr = val.split(' - ')
            const user_id = data_arr[0]
            const full_name = data_arr[1]

            if(this.props.user_attitude.data.length > 0){
                let user = this.props.user_attitude.data.find((element) => { return element.id == user_id })

                this.props.handleAttitudeItem(full_name, idx, 'name')
                this.props.handleAttitudeItem(user_id, idx, 'user_id')
                this.props.handleAttitudeItem(user.class_id, idx, 'class_id')
            }

            // user = this.props.user_attitude.data.find((element) => { return element.id == user_id })
        }
    }

    render(){
        let remove;
        const user_id = this.props.user_attitude ? this.props.user_attitude.user_id : null
        const class_id = this.props.user_attitude ? this.props.user_attitude.class_id : null
        const description = this.props.user_attitude ? this.props.user_attitude.description : null
        const full_name = this.props.user_attitude == null ? '' : (this.props.user_attitude.full_name == null ? '' : this.props.user_attitude.full_name)
        const options = this.props.user_attitude == null ? [] : (this.props.user_attitude.options == null ? [] : this.props.user_attitude.options)
        const score = this.props.user_attitude == null ? null : (this.props.user_attitude.score == null ? null : this.props.user_attitude.score)

        if(this.props.index > 0){
            remove = <div className="col-sm-1 margin-top-9">
                <a href="javascript:void(0);" onClick={() => {this.props.removeAttitudeItem(this.props.index)}}>
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }
        console.log(score,"here data")

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
                                        items={options}
                                        renderItem={this.renderItem}
                                        value={full_name}
                                        onChange={(event) => {this.onChange(event, this.props.index, 'full_name')}}
                                        onSelect={(event) => {this.onSelect(event, this.props.index)}}
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
                                        options={this.state.attitude_scores}
                                        onChange={(event) => {this.props.handleAttitudeItem(event.value, this.props.index, 'score')}}
                                        value={this.state.attitude_scores.find((element) => { return element.value == score })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top-4">
                            <div className="col-sm-12">
                                <div className="content-input margin-top-4">
                                    <label className="content-label">Deskripsi Sikap</label>
                                    <textarea 
                                        placeholder="Masukkan keterangan"
                                        className= "disblock fullwidth textarea-box"
                                        onChange={(event) => { this.props.handleAttitudeItem(event.target.value, this.props.index, 'description') }}
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
    handleAttitudeItem,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DailyAttitudeItem)