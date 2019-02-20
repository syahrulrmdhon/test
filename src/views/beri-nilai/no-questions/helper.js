import React, { Component } from 'react'
import Avatar from 'react-avatar'
import Ava from './../../../assets/images/img_avatar.png'
import IconPencil from './../../../assets/images/beri_nilai.svg'
import classnames from 'classnames'

export class Parent extends Component {
    render() {
        let users = this.props.users
        let scores = this.props.scores
        let selectIndex = this.props.selectIndex
        let idx = this.props.idx

        return <div className="box-student margin-top-3 " key={Math.random()} >
            <div className={classnames('border-full border-right border-left-col-red')}>
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-3  padding-1">
                            <Avatar src={Ava} size="30" round={true} />
                            <span className="padding-left-2  label-content ">{users.full_name}</span>
                        </div>
                        <div className="col-sm-3 align-left padding-2 ">
                            <span className="label-content">{users.email}</span>
                        </div>
                        <div className="col-sm-3 align-center padding-2 ">
                            {
                                scores.total_averages.length > 0 ?
                                    scores.total_averages.map((x, i) => {
                                        return <span key={i} className="label-nilai ">{x.score === null ? "N/A" : x.score}</span>
                                    })
                                    :
                                    <span className="label-nilai large-text-red-bold">N/A</span>
                            }
                        </div>
                        <div className="col-sm-2 align-left padding-2 ">
                            <img src={IconPencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => { this.props.handleClickQuestion(e, users.id, users.full_name) }} />
                        </div>
                        <div className="col-sm-1 align-left padding-2 ">
                            <i className="fa fas fa-ellipsis-h icon-table-pencil cred" onClick={(e) => { this.handleClick(e, users.id, idx) }} ></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classnames("border-right border-bottom border-left-col-red", `${selectIndex === idx ? 'display-block' : 'display-none'}`)}>
                <Child
                    scores={scores}
                />
            </div>
        </div>
    }
}

export class Child extends Component {
    render() {
        let content = []
        let scores = this.props.scores
        let subject_averages = scores.subject_averages
        let competency_averages = scores.competency_averages
        if (subject_averages.length > 0) {
            content.push(
                subject_averages.map((x) => {
                    <div className="second-head padding-1 " key={Math.random()}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-4">
                                    {x.school_subject.alias_name}
                                </div>
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4 align-center">
                                    {x.score}
                                </div>
                            </div>
                        </div>
                    </div>
                }),
                competency_averages.map((a) => {
                    <div className="padding-1" key={Math.random()}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-8">
                                    {a.basic_comp.competency_number + ' ' + a.basic_comp.content}
                                </div>
                                <div className="col-sm-4 align-center">
                                    {a.score}
                                </div>
                            </div>
                        </div>
                    </div>
                })
            )
        }

        return <div className='row'>
            <div className='col-sm-12'>
                <div className="margin-side-10 padding-bottom-3 margin-top-5">
                    {content}
                </div>
            </div>

        </div>

    }
}

export class Pencil extends Component {
    render() {
        let users = this.props.users

        return <div className="text-center" onClick={(e) => { this.props.handleClickQuestion(e, users.id, users.full_name) }}>
            <i className="fa fa-pencil fa-lg"></i>
        </div>
    }
}

export class Users extends Component {
    render() {
        let data = this.props.data
        let classname = 'border-left-col-red col-sm-3 padding-1'
        let predicate = data.scores.total_average.predicate
        let fullname = data.user.full_name

        if (predicate === 'a' || predicate === 'b') {
            classname = 'border-left-col-green col-sm-3 padding-1'
        } else if (predicate === 'c') {
            classname = 'border-left-col-yellow col-sm-3 padding-1'
        } else if (predicate === 'd') {
            classname = 'border-left-col-red col-sm-3 padding-1'
        }


        return < div className={classname} >
            <Avatar src={Ava} size="30" round={true} />
            <span className="padding-left-2  label-content ">{fullname}</span>
        </div >
    }
}

export class Averages extends Component {
    render() {
        let data = this.props.data
        let score = data.scores.total_average.score
        let status = data.scores.total_average.result_status
        let classname = ''

        if (status === 'very_good' || status === 'good') {
            classname = 'large-text-green-bold'
        } else if (status === 'enough') {
            classname = 'large-text-yellow-bold '
        } else if (status === 'need_attention') {
            classname = 'large-text-red-bold'
        }

        return <div className='col-sm-3 align-center padding-2'>
            <span className={classname}>{score === null ? 'N/A' : score}</span>
        </div>
    }
}

export class Subjects extends Component {
    render() {
        let data = this.props.data
        let average = data.scores.total_average
        let ix = this.props.ix
        let subjects = data.scores.subject_averages
        let status = data.scores.total_average.result_status
        let classname = 'col-sm-3 padding-1'

        if (status === 'very_good' || status === 'good') {
            classname = 'border-left-col-green col-sm-3 padding-1'
        } else if (status === 'enough') {
            classname = 'border-left-col-yellow col-sm-3 padding-1'
        } else if (status === 'need_attention') {
            classname = 'border-left-col-red col-sm-3 padding-1'
        }

        return <div className={classnames("border-right border-bottom ", data.scores.total_average.result_status === null || data.scores.total_average.result_status === 'need_attention' ? 'border-left-col-red' : data.scores.total_average.result_status === 'very_good' || data.scores.total_average.result_status === 'good' ? 'border-left-col-green' : 'border-left-col-yellow', `${this.props.indx === ix ? 'display-block' : 'display-none'}`)}>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='margin-side-10 padding-bottom-3 margin-top-5'>
                        {
                            subjects.map((data) => {
                                return <div key={Math.random()}>
                                    <div className='second-head padding-1' key={Math.random()}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="col-sm-4">
                                                    {data.subject_name}
                                                </div>
                                                <div className="col-sm-4">
                                                </div>
                                                <SubjectAverage
                                                    score={average}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        data.competency_averages.map((data) => {
                                            return <div className="padding-1" key={Math.random()}>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="col-sm-8">
                                                            {data.basic_comp.competency_number + ' ' + data.basic_comp.content}
                                                        </div>
                                                        <SubjectScore
                                                            data={data}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}
export class SubjectAverage extends Component {
    render() {
        let data = this.props.score
        let score = data.score
        let status = data.result_status
        let classname = 'col-sm-4 align-center'

        if (status === 'very_good' || status === 'good') {
            classname = 'large-text-green-bold col-sm-4 align-center'
        } else if (status === 'enough') {
            classname = 'large-text-yellow-bold col-sm-4 align-center'
        } else if (status === 'need_attention') {
            classname = 'large-text-red-bold col-sm-4 align-center'
        }
        return <div className={classname}>
            {score === null ? 'N/A' : score}
        </div>
    }
}
export class SubjectScore extends Component {
    render() {
        let data = this.props.data
        let status = data.average_score.result_status
        let score = data.average_score.score
        let classnames = ''

        if (status === 'very_good' || status === 'good') {
            classnames = 'large-text-green-bold'
        } else if (status === 'enough') {
            classnames = 'large-text-yellow-bold'
        } else if (status === 'need_attention') {
            classnames = 'large-text-red-bold'
        }

        return <div className="col-sm-4 align-center">
            <div className={classnames}>
                {score === null ? 'N/A' : score}
            </div>
        </div>
    }
}

export class UserNotPassed extends Component {
    render() {
        return (
            <div className='margin-top-4 padding-4'>
                {
                    this.props.notPassed.map((x, i) => {
                        return <div key={i}>
                            <div className='row'>
                                <div className='row'>
                                    <div className='padding-right-2 padding-left-4'>
                                        <Avatar src={Ava} size="30" round={true} />
                                    </div>
                                    <div className='padding-right-4'>
                                        <span className='disblock'>{x.user.full_name}</span>
                                        <p className='view'>{x.user.email}</p>
                                    </div>
                                </div>
                                <div className='float-right padding-left-4 large-text-red-bold'>
                                    {x.total_average.score === null ? '-' : x.total_average.score}
                                </div>
                            </div>
                            <br />
                        </div>
                    })
                }
            </div>
        )
    }
}

export class FormQuestion extends Component {
    render() {
        let data = []
        if (this.props.scores.length > 0) {
            let scores = this.props.scores
            scores.map((value, key) => {
                data.push(
                    <div className='row' key={key}>
                        <div className='col-sm-6'>
                            <label className='disblock padding-bottom-2 subject-title'>Mata Pelajaran</label>
                            <input className='input-question' type='text' placeholder={value.alias_name} readOnly></input>
                        </div>
                        <div className='col-sm-6 margin-bottom-4'>
                            <label className='disblock padding-bottom-2 subject-title'>Nilai</label>
                            <input className='input-question' value={this.props.score} type='text' placeholder='Masukkan Nilai...'></input>
                        </div>
                    </div>
                )
            })
        }
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='border-bottom margin-bottom-4'>
                    {data}
                </div>
                <button type='submit' className='btn-green btn-save-question margin-bottom-6'>Simpan</button>
            </form>
        )
    }
}
