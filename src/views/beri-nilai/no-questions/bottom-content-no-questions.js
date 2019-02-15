import React, { Component } from 'react'
import './../../../styles/global/component.css'
import Select from 'react-select'
import './../../../styles/beri-nilai/main.scss'
import { getParticipant } from './../../../redux-modules/modules/score'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import { Users, Subjects, Averages } from './helper'
import Pencil from './../../../assets/images/beri_nilai.svg'
var FontAwesome = require('react-fontawesome')

class BottomContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            dataChildSubject: [],
            dataChildCompentency: [],
            key: '',
            selectIndex: -1,
            height: '',
            collapce: '',
            border: 'border-bottom',
            hidden: true,
            element: 'hidden',
            token: localStorage.getItem('token'),
            search: ''
        }
        this.onClickToogle = this.onClickToogle.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleNewScore = this.handleNewScore.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSubmmit = this.onSubmmit.bind(this)
    }
    componentDidMount() {
        this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment)
    }
    onClickToogle() {
        this.setState({
            height: 'col-height'
        })
    }
    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    handleClick(e, id, idx) {
        let subject = []
        let competency = []
        let hidden = true;
        let dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
        let filtering = dataArray.filter(item => item.user.id === id)
        filtering.map((x) => {
            subject = x.scores.subject_averages
            competency = x.scores.competency_averages
        })
        if (this.state.hidden === true) {
            hidden = false;
        } else {
            hidden = true;
        }

        this.setState({
            hidden: hidden[1],
            key: 1,
            dataChildSubject: subject,
            selectIndex: (this.state.selectIndex === idx ? -1 : idx),
            dataChildCompentency: competency
        })
    }
    handleNewScore(e, student, ) {
        e.preventDefault()
        this.props.handleNewScoreParent(e, student)
    }
    onSubmmit() {
        console.log(this.state.search, "search")
        this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment, this.state.search)
    }

    render() {
        const dataArray = this.props.user && this.props.user.data && this.props.user.data.participants
        let border = 'border-left-col-green'
        dataArray && dataArray.map((x) => {
            let status = x.scores.total_average.result_status
            if (status === 'very_good') {
                console.log("here very good")
                border = 'border-left-col-green'
            } else if (status === 'need_attention') {
                border = 'border-left-col-red'
                console.log("or here")
            } else if (status === null) {
                border = 'border-left-col-red'
            }
        })
        return (
            <div className="margin-left-5 margin-right-5 bg-white padding-top-4 margin-top-4 margin-bottom-2">
                <div className="content-bottom">
                    <div className='margin-bottom-4'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='margin-top-2'>
                                    <span>Hasil Perolehan Nilai</span>
                                </div>
                            </div>
                            <div className='col-sm-8'>
                                <div className='row'>
                                    <div className='col-sm-4'>
                                        <Select
                                            placeholder='Urut Berdasarkan'
                                            classNamePrefix='select'
                                        />
                                    </div>
                                    <div className='col-sm-8'>
                                        <div className='search'>
                                            <input
                                                autoComplete="off"
                                                className="input-field"
                                                type="text"
                                                placeholder="Cari murid disini..."
                                                name="search"
                                                onChange={this.handleSearch}
                                                value={this.state.search}
                                            />
                                            <i className="fa fa-search icon" onClick={this.onSubmmit}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-3 padding-1">
                                    <span className="padding-3">Nama Murid</span>
                                </div>
                                <div className="col-sm-3 padding-1 align-left">
                                    <span>Email</span>
                                </div>
                                <div className="col-sm-3 align-center padding-1">
                                    <span>Nilai</span>
                                </div>
                                <div className="col-sm-2 padding-1">
                                    <span>Beri Nilai</span>
                                </div>
                                <div className="col-sm-1 padding-1">
                                    <span>Rincian</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="content-student">
                        {
                            dataArray && dataArray.map(function (data, index) {
                                return <div className="box-student margin-top-3 " key={Math.random()} >
                                    <div className={classnames('border-full border-right', this.state.border)}>
                                        <div className="row">
                                            <div className="col-sm-12 ">
                                                <Users
                                                    data={data}
                                                />
                                                <div className="col-sm-3 align-left padding-2 ">
                                                    <span className="label-content">{data.user.email}</span>
                                                </div>
                                                <Averages
                                                    data={data}
                                                />
                                                <div className="col-sm-2 align-left padding-2 ">
                                                    <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => { this.props.page(e, data.user.id, this.props.class) }} />
                                                </div>
                                                <div className="col-sm-1 align-left padding-2 ">
                                                    <i className="fa fas fa-ellipsis-h icon-table-pencil cred" onClick={(e) => { this.handleClick(e, data.user.id, index) }} ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Subjects
                                        indx={this.state.selectIndex}
                                        ix={index}
                                        data={data}
                                        index={this.state.selectIndex}
                                        competencies={this.state.dataChildCompentency}
                                        subjects={this.state.dataChildSubject}
                                    />
                                </div>
                            }, this)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.score
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);