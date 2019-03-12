import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../../assets/images/img_avatar.png'
import { getDataScoreAttitude } from './../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';
import Todo from './../../../assets/images/to-do.svg';



export class Panel extends Component {
    render() {
        let data_panel_classes = this.props.data_panel && this.props.data_panel && this.props.data_panel.attitude && this.props.data_panel.attitude.data && this.props.data_panel.attitude.data.classes
        let content = []    
        data_panel_classes && data_panel_classes.map((x) => {
            x.users.map((data) => {
                let merge = []
                if (data.score === 2) {
                    merge.push(
                        <span className="score-attitude__score-sb margin-left-1 " key={Math.random()}>SB</span>
                    )
                } else if (data.score === 1) {
                    merge.push(
                        <span className="score-attitude__score-b " key={Math.random()}>B</span>
                    )
                } else if (data.score === 0) {
                    merge.push(
                        <span className="score-attitude__score " key={Math.random()}>BP</span>
                    )
                } else {
                    merge.push(
                        <span className="score-attitude__score " key={Math.random()} >N/A</span>
                    )
                }
                
                content.push(<div className="row margin-top-4" key={Math.random()}>
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
                                            {data.attitude_recap && data.attitude_recap.sb ? <span className="score-attitude__count-predicate-good">{data.attitude_recap && data.attitude_recap.sb}</span> : <span className="score-attitude__count-predicate-need-attention"> N/A </span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            {data.attitude_recap && data.attitude_recap.sb ? <span className="score-attitude__count-predicate-enough"> {data.attitude_recap && data.attitude_recap.b} </span> : <span className="score-attitude__count-predicate-need-attention">N/A</span>}
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
                                    {merge}
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="padding-2 line-desc ">
                                        <div className="col-sm-12">
                                            <span className="score-attitude__desc-title">Deskripsi Sikap</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <span className="score-attitude__desc-body">{data.description ? data.description.substring(0,70)+'...':'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-1">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="col-sm-12">
                                        <div className="score-attitude__add-score padding-top-6" onClick={(e) => {this.props.onChange(x.id, data.id) }} >
                                            <img src={Todo} alt="" width="15" className="margin-top-1" />
                                            <span className="padding-left-1" >Beri Nilai</span>
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