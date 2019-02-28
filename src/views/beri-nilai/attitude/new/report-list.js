import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
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
        const data = this.props.data_header
        const subjects = this.props.data_header && this.props.data_header.school_subjects
        const subjects_length = this.props.data_header && this.props.data_header.school_subjects.length
        const school_attitudes_length = this.props.data_header && this.props.data_header.school_attitudes.length
        const school_attitudes = this.props.data_header && this.props.data_header.school_attitudes
        const data_user_attitudes = this.props.data_user_attitudes
        const data_report_list = this.props.data_user_attitudes && this.props.data_user_attitudes.entries


        let title = []
        let subtitle = []
        let report = []
        if (school_attitudes_length === 0) {
            subjects && subjects.map((data, index) => {
                title.push(<span className="score-attitude-new__left-title">Daftar Laporan Sikap ({data.alias_name}) </span>)
                switch (this.state.activeTab) {
                    case 'semua':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Semua sikap ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'sb':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Sangat Baik ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'b':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Baik ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'bp':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Butuh Perhatian ({data_user_attitudes.entries.length}) </span>)
                        break;
                    default:
                        subtitle.push(<span className="score-attitude-new__predicate-title">Semua sikap ({data_user_attitudes.entries.length}) </span>)

                }
            })
        } else {
            school_attitudes && school_attitudes.map((data, index) => {
                title.push(<span className="score-attitude-new__left-title">Daftar Laporan Sikap ({data.alias_name}) </span>)
                switch (this.state.activeTab) {
                    case 'semua':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Semua sikap ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'sb':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Sangat Baik ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'b':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Baik ({data_user_attitudes.entries.length}) </span>)
                        break;
                    case 'bp':
                        subtitle.push(<span className="score-attitude-new__predicate-title">Butuh Perhatian ({data_user_attitudes.entries.length}) </span>)
                        break;
                    default:
                        subtitle.push(<span className="score-attitude-new__predicate-title">Semua sikap ({data_user_attitudes.entries.length}) </span>)

                }
            })
        }

        // data_report_list && data_report_list.map((data) => {
            report.push(<div className="box-scroll" key={Math.random()}>
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
            </div>)
        // })
        return (
            <div>
                <div className="padding-4">
                    <div className="col-sm-12">
                        {title}
                    </div>
                    <div className="col-sm-12">
                        {subtitle}
                    </div>
                    <div className="box-report margin-top-7">

                        <TabContent activeTab={this.props.activeTab}>
                            <TabPane tabId="semua">
                                {report}
                            </TabPane>
                            <TabPane tabId="sb">
                                sangat baik
                        </TabPane>
                            <TabPane tabId="b">
                                baik
                        </TabPane>
                            <TabPane tabId="bp">
                                butuh perhatian
                        </TabPane>
                        </TabContent>
                    </div>
                </div>
                <div className="row border-top ">
                    <div className="border-top-score">
                        <div className="margin-top-0 margin-left-3 ">
                            <Nav tabs className="toggle-score">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.props.activeTab === 'semua' })}
                                        onClick={() => { this.props.toggle('semua'); }}
                                    >
                                        Semua
                                     </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.props.activeTab === 'sb' })}
                                        onClick={() => { this.props.toggle('sb'); }}
                                    >
                                        Sangat Baik
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.props.activeTab === 'b' })}
                                        onClick={() => { this.props.toggle('b'); }}
                                    >
                                        Baik
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink
                                        className={classnames({ active: this.props.activeTab === 'bp' })}
                                        onClick={() => { this.props.toggle('bp'); }}
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
    data_header: state.attitude && state.attitude.data && state.attitude.data.assessment,
    data_user: state.attitude && state.attitude.data,
    data_user_attitudes: state.attitude && state.attitude.data && state.attitude.data.user_attitudes,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreAttitude }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Report);