import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { getDataScoreAttitude } from './../../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';
import Avatar from 'react-avatar';
import Ava from './../../../../assets/images/img_avatar.png'

export class Report extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 'semua'
        };
    }

    toggle(tab) {
        console.log(tab)
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        console.log(this.props.data_user,"here to")
        return (
            <div>
                <div className="padding-4">
                    <div className="col-sm-12">
                        <span className="score-attitude-new__left-title">Daftar Laporan Sikap (Matematika) </span>
                    </div>
                    <div className="col-sm-12">
                        <span className="score-attitude-new__predicate-title">Semua sikap </span>
                    </div>
                    <div className="box-report">
                        <div className="col-sm-12">
                            <div className="margin-top-5">
                                <div className="col-sm-1">
                                    <Avatar src={Ava} size={20} round={true} />
                                </div>
                                <div className="col-sm-10">
                                    <div className="score-attitude-new__report-title">
                                        <span>Ritika Singh (Guru Matematika)</span>
                                    </div>
                                    <div className="margin-top-1 attitude-score-new__report-value">
                                        <span >Mengajari teman-teman sekelasnya agar paham materi persamaan linear dalam kompleksitas aljabar.</span>
                                    </div>
                                    <div className="margin-top-1">
                                    <i class=" fa fas fa-heart cgreen"></i> <span className="cgreen">SB</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="margin-top-5">
                                <div className="col-sm-1">
                                    <Avatar src={Ava} size={20} round={true} />
                                </div>
                                <div className="col-sm-10">
                                    <div className="score-attitude-new__report-title">
                                        <span>Ritika Singh (Guru Matematika)</span>
                                    </div>
                                    <div className="margin-top-1 attitude-score-new__report-value">
                                        <span >Mengajari teman-teman sekelasnya agar paham materi persamaan linear dalam kompleksitas aljabar.</span>
                                    </div>
                                    <div className="margin-top-1">
                                    <i class=" fa fas fa-heart cgreen"></i> <span className="cgreen">SB</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="margin-top-5">
                                <div className="col-sm-1">
                                    <Avatar src={Ava} size={20} round={true} />
                                </div>
                                <div className="col-sm-10">
                                    <div className="score-attitude-new__report-title">
                                        <span>Ritika Singh (Guru Matematika)</span>
                                    </div>
                                    <div className="margin-top-1 attitude-score-new__report-value">
                                        <span >Mengajari teman-teman sekelasnya agar paham materi persamaan linear dalam kompleksitas aljabar.</span>
                                    </div>
                                    <div className="margin-top-1">
                                    <i class=" fa fas fa-heart cred"></i> <span className="cred">BP</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="row border-top ">
                    <div className="border-top-score">
                        <div className="margin-top-0 margin-left-3 ">
                            <Nav tabs className="toggle-score">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 'semua' })}
                                        onClick={() => { this.toggle('semua'); }}
                                    >
                                        Semua
                                     </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 'sb' })}
                                        onClick={() => { this.toggle('sb'); }}
                                    >
                                        Sangat Baik
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 'b' })}
                                        onClick={() => { this.toggle('b'); }}
                                    >
                                        Baik
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 'bp' })}
                                        onClick={() => { this.toggle('bp'); }}
                                    >
                                        Butuh perhatian
                                    </NavLink>
                                </NavItem>
                            </Nav>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_user: state.attitude
  })
  
const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreAttitude }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Report);