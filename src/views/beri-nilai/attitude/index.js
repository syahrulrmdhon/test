import React, { Component } from 'react'
import { connect } from 'react-redux'
import Panel from './panel'
import Header from './../../global/header'
import './../../../styles/attitude.scss'
import { getDataScoreAttitude } from './../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';
import Page from './../../../components/Title'

export class index extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.props.getDataScoreAttitude(this.props.match.params.id)
    }

    onChange(class_id, user_id) {
        console.log("hit here", class_id, user_id)
        this.props.history.push({
            pathname: `/score/attitude/new/assessment/${this.props.match.params.id}/class/${class_id}/user/${user_id}`
        })
    }

    render() {
        let path = '/penilaian'
        let data_title = this.props.data_panel && this.props.data_panel && this.props.data_panel.attitude && this.props.data_panel.attitude.data && this.props.data_panel.attitude.data
        console.log(data_title, "here ")
        let title = []
        if (data_title && data_title.assessment_type === 'final_aspect') {
            title.push(
                <div className="block">
                    Daftar Sikap Akhir Mata Pelajaran
                </div>
            )
        } else {
            title.push(
                <div className="block">
                    Daftar Penilaian Akhir Aspek Sikap
                </div>
            )
        }
        return (
            <Page title="Nilai Sikap">
                <div className="score-attitude">
                    <div>
                        <Header navbar={false} location={path} />
                    </div>
                    <div className="padding-content">
                        <div className="margin-side bg-white margin-top-7">
                            <div className="margin-side-5">
                                <div className="padding-top-3">
                                    {title}
                                    <div>
                                        <span className="score-attitude__subject">{data_title ? data_title.subject_name : 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="padding-top-2">
                                    <Panel
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    data_panel: state

})

const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreAttitude }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(index);