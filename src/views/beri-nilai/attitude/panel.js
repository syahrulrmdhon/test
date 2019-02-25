import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../../assets/images/img_avatar.png'
import { getDataScoreAttitude } from './../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';

export class Panel extends Component {
    render() {
        let data_panel_classes = this.props.data_panel && this.props.data_panel && this.props.data_panel.attitude && this.props.data_panel.attitude.data && this.props.data_panel.attitude.data.classes
        let content = []
        data_panel_classes && data_panel_classes.map((x, index) => {
            x.users.map((data, idx) => {
                console.log(data, "data")
                content.push(<div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        <div className="col-sm-12">
                            <div className="col-sm-1 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div>
                            <div className="col-sm-5 padding-2">
                                <div className="col-sm-12">
                                    <span className="score-attitude__name">{data.full_name}</span>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Sangat Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-good">{data.attitude_recap && data.attitude_recap.sb ? data.attitude_recap && data.attitude_recap.sb : 'N/A'} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            {data.attitude_recap && data.attitude_recap.sb ?  <span className="score-attitude__count-predicate-enough"> {data.attitude_recap && data.attitude_recap.b} </span>:   <span className="score-attitude__count-predicate-need-attention">N/A</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Butuh Perhatian</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-need-attention">{data.attitude_recap && data.attitude_recap.sb ? data.attitude_recap && data.attitude_recap.bp : 'N/A'} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 padding-3">
                                <div className="score-box border-full padding-top-2 padding-left-4 ">
                                    <span className="score-attitude__score ">{data.score}</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="padding-2 line-desc ">
                                        <div className="col-sm-12">
                                            <span className="score-attitude__desc-title">Diskripsi Sikap</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <span n className="score-attitude__desc-body">{data.description}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>)
            })
        })

        return (
            <div className="padding-bottom-5">
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_panel: state
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreAttitude }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Panel);