import React, { Component } from 'react'
import classnames from 'classnames'

import {
    getScore
} from './../../../utils/attitude'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AttitudeDetailItem extends Component {
    render(){
        let {full_name, score, description} = this.props.users
        console.log(this.props.users)

        const { text, color } = getScore(score, true)

        return(
            <div className="row margin-top-2">
                <div className="col-sm-12">
                    <div className={classnames("border-full padding-4", color)}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="header-title f12">
                                    {full_name}
                                </label>
                            </div>
                            <div className="col-sm-3">
                                <label className="header-title f12">
                                    {text}
                                </label>
                            </div>
                            <div className="col-sm-6">
                                <label className="header-title f12">
                                    {description}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    users: state.assessment.entries[props.index],
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    // showAssessment,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AttitudeDetailItem)