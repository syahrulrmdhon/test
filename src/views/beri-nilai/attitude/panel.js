import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../../assets/images/img_avatar.png'

export class panel extends Component {
    render() {
        return (
            <div className="padding-bottom-5">
                <div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        <div className="col-sm-12">
                            <div className="col-sm-1 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div>
                            <div className="col-sm-5 padding-2">
                                <div className="col-sm-12">
                                    <span className="score-attitude__name">T Ritika Singh</span>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Sangat Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-good">5 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-enough">5 </span>
                                        </div>  
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Butuh Perhatian</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-need-attention">5 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 padding-3">
                                <div className="score-box border-full padding-top-2 padding-left-4 ">
                                    <span className="score-attitude__score ">N/A</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="padding-2 line-desc ">
                                        <div className="col-sm-12">
                                                <span className="score-attitude__desc-title">Diskripsi Sikap</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <span n className="score-attitude__desc-body">Deskripsi belum di masukan</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        <div className="col-sm-12">
                            <div className="col-sm-1 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div>
                            <div className="col-sm-5 padding-2">
                                <div className="col-sm-12">
                                    <span className="score-attitude__name">T Ritika Singh</span>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Sangat Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-good">5 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-enough">5 </span>
                                        </div>  
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Butuh Perhatian</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-need-attention">5 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 padding-3">
                                <div className="score-box border-full padding-top-2 padding-left-4 ">
                                    <span className="score-attitude__score ">N/A</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="padding-2 line-desc ">
                                        <div className="col-sm-12">
                                                <span className="score-attitude__desc-title">Diskripsi Sikap</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <span n className="score-attitude__desc-body">Deskripsi belum di masukan</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        <div className="col-sm-12">
                            <div className="col-sm-1 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div>
                            <div className="col-sm-5 padding-2">
                                <div className="col-sm-12">
                                    <span className="score-attitude__name">T Ritika Singh</span>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Sangat Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-good">5 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Baik</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-enough">5 </span>
                                        </div>  
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <span className="score-attitude__predicate">Sikap Butuh Perhatian</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <span className="score-attitude__count-predicate-need-attention">5 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 padding-3">
                                <div className="score-box border-full padding-top-2 padding-left-4 ">
                                    <span className="score-attitude__score ">N/A</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row padding-top-3 padding-bottom-3">
                                    <div className="padding-2 line-desc ">
                                        <div className="col-sm-12">
                                                <span className="score-attitude__desc-title">Diskripsi Sikap</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <span n className="score-attitude__desc-body">Deskripsi belum di masukan</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(panel)
