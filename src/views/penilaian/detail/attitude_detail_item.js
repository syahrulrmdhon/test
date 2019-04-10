import React, { Component } from 'react'
import classnames from 'classnames'
import Select from 'react-select';

import {
    getScore,
} from './../../../utils/attitude'

import {
    attitudeScores,
} from './../../../utils/common'

import {
    handleUpdateAttitude,
} from './../../../redux-modules/modules/assessment'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AttitudeDetailItem extends Component {
    constructor(props){
        super(props)

        this.state = {
            attitude_scores: [],
        }
        this.handleAttitude = this.handleAttitude.bind(this)
    }

    componentDidMount(){
        attitudeScores.call(this)
    }

    handleAttitude(e) {
        this.props.handleUpdateAttitude(e.value,this.props.index,'score')
        let scoress = this.state.attitude_scores.value
        this.setState({
            attitudeScores: scoress
        })
    }

    render(){
        let {full_name, score, description} = this.props.users
        const { text, color } = getScore(score, true)

        return(
            <div className="row margin-top-2">
                <div className="col-sm-12">
                    <div className={classnames("border-full padding-4", color)}>
                        <div className="row align-items">
                            <div className="col-sm-3">
                                <label className="header-title f12">
                                    {full_name}
                                </label>
                            </div>
                            <div className="col-sm-3">
                                <div className="content-input">
                                    <Select 
                                        className= "select-list"
                                        classNamePrefix= "select"
                                        placeholder= "Pilih nilai sikap"
                                        name= "score"
                                        onChange={(event) => {this.handleAttitude(event)}}
                                        options={this.state.attitude_scores}
                                        value={this.state.attitude_scores.find((element) => { return element.value == score })}
                                    />
                                </div>
                                {/* <label className="header-title f12">
                                    {text}
                                </label> */}
                            </div>
                            <div className="col-sm-6">
                                <div className="content-input">
                                    <input 
                                        className="fullwidth"
                                        defaultValue={description}
                                        placeholder="Masukkan deskripsi"
                                        name="description"
                                        onChange={(event) => {this.props.handleUpdateAttitude(event.target.value, this.props.index, 'description')}}
                                    />
                                </div>
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
    handleUpdateAttitude,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AttitudeDetailItem)