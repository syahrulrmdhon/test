import React, { Component } from 'react'
import DailyAttitudeItem from './daily_attitude_item'

import {
    handleAttitudeItem,
} from './../../../redux-modules/modules/assessment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class AddDailyAttitude extends Component {
    render(){
        let user_attitude_item = []
        if(this.props.user_attitudes){
            this.props.user_attitudes.map((user_attitude, idx) => {
                user_attitude_item.push(
                    <DailyAttitudeItem 
                        key={idx}
                        index={idx} 
                    />
                )
            })
        }

        return(
            <div>
                <label className="header-title margin-top-10 margin-bottom-6">Sikap - Penilaian Harian</label>
                {user_attitude_item}
                <div className="row">
                    <div className="col-sm-11">
                        <a href="javascript:void(0);" className="float-right" onClick={this.props.handleAttitudeItem} >
                            <FontAwesome name="plus-circle" /> Tambah Peserta Didik
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user_attitudes: state.assessment.user_attitudes_attributes ? (state.assessment.user_attitudes_attributes.length > 0 ? state.assessment.user_attitudes_attributes : [{}]) : [{}]
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    handleAttitudeItem,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddDailyAttitude)