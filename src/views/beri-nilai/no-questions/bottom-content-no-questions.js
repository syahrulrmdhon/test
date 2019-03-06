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
            border: 'border-bottom',
            hidden: true,
            element: 'hidden',
            search: '',
            valueOpt: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment)
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
    onSubmit() {
        let search = event.target.value
        this.setState({ search: search })
        this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment, search)
    }
    handleChange(valueOpt) {
        this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment, '', valueOpt)
        this.setState({ valueOpt })
    }
    render() {
        let filterList = [
            { value: 'score_asc', label: 'Nilai Terendah' },
            { value: 'score_desc', label: 'Nilai Tertinggi' },
            { value: 'name_desc', label: 'Nama Z-A' },
            { value: 'name_asc', label: 'Nama A-Z' },
        ]
        const dataArray = this.props.user && this.props.user.data && this.props.user.data.participants
        let border = 'border-left-col-green'
        dataArray && dataArray.map((x) => {
            let status = x.scores.total_average.result_status
            if (status === 'very_good') {
                border = 'border-left-col-green'
            } else if (status === 'need_attention') {
                border = 'border-left-col-red'
            } else if (status === null) {
                border = 'border-left-col-red'
            }
        })
        return (
            <div className='margin-side-5 bg-white padding-top-4 margin-bottom-2'>
                <div className='row padding-bottom-5'>
                    <div className='col-sm-12'>
                        <div className='margin-top-4 padding-side-0 margin-bottom-4'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <div className='margin-top-2'>
                                        <span>Hasil Perolehan Nilai</span>
                                    </div>
                                </div>
                                <div className='col-sm-8'>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <Select
                                                isClearable
                                                options={filterList}
                                                value={this.state.valueOpt}
                                                onChange={this.handleChange.bind(this)}
                                                placeholder='Urut Berdasarkan'
                                                classNamePrefix='select'
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className='search'>
                                                <input
                                                    autoComplete='off'
                                                    className='input-field'
                                                    type='text'
                                                    placeholder='Cari murid disini'
                                                    name='search'
                                                    onChange={this.onSubmit}
                                                    value={this.state.search}
                                                />
                                                <i className='fa fa-search icon'></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-bottom'>
                            <div className='header'>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <div className='col-sm-3 padding-1'>
                                            <span className='padding-3'>Nama Murid</span>
                                        </div>
                                        <div className='col-sm-3 padding-1 slign-left'>
                                            <span>Email</span>
                                        </div>
                                        <div className='col-sm-3 align-center padding-1'>
                                            <span>Nilai</span>
                                        </div>
                                        <div className='col-sm-2 padding-1'>
                                            <span>Beri Nilai</span>
                                        </div>
                                        <div className='col-sm-1 padding-1'>
                                            <span>Rincian</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='content-student'>
                                {
                                    dataArray && dataArray.map(function (data, index) {
                                        return <div className='box-student margin-top-3 ' key={Math.random()} >
                                            <div className={classnames('border-full border-right', this.state.border)}>
                                                <div className='row'>
                                                    <div className='col-sm-12'>
                                                        <Users
                                                            data={data}
                                                        />
                                                        <div className='col-sm-3 align-left padding-1 d-flex align-items-center word-break h-100'>
                                                            <span className='padding-left-2 label-content d-table-cell'>{data.user.email}</span>
                                                        </div>
                                                        <Averages
                                                            data={data}
                                                        />
                                                        <div className='col-sm-2 align-left padding-2 '>
                                                            <img src={Pencil} alt='pencil' width='20px' className='icon-pencil' onClick={(e) => { this.props.page(e, data.user.id, this.props.class, data.user.full_name) }} />
                                                        </div>
                                                        <div className='col-sm-1 align-left padding-2 '>
                                                            <i className='fa fa-ellipsis-h icon-table-pencil cred' onClick={(e) => { this.handleClick(e, data.user.id, index) }} ></i>
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