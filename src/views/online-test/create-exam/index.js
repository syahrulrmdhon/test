import React, { Component } from 'react'
import Page from './../../../components/Title'
import Header from './../../global/header'
import Switch from 'react-switch'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleChange, loadData } from './../../../redux-modules/modules/onlineExam'
import { getProblemTypes } from './../helper-online'

//scss
import './../../../styles/online-test.scss'
import AddQuestion from './add-question';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            name: props.location.state.name,
            assessment_id: props.match.params.assessment_id,
            problemTypes: [],
            length: null,
            questions: [
                { problem_type: '', question_count: null }
            ]
        };
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
    }

    componentDidMount() {
        getProblemTypes.call(this)
    }

    backToList() {
        this.props.history.goBack()
    }

    handleChangeSwitch(checked) {
        this.setState({ checked });
    }

    addQuestion() {
        let questions = this.state.questions
        
        questions.push(
            { problem_type: '', question_count: null}
            // <AddQuestion key={Math.random()} />
        )
        this.setState({questions: questions})
    }
    render() {
        let data = _.get(this, 'props.data', {})
        let selectedProblemType = data ? data.selectedProblemType : null
        const questions = this.state.questions.map(question => {
            return <AddQuestion key={Math.random()} />
        })
        return (
            <Page title="Tulis Ujian Online">
                <Header />
                <div className='new-exam-online padding-content h-100'>
                    <div className='margin-content full-margin'>
                        <div className='content-wrapper'>
                            <div className='border-bottom'>
                                <div className="padding-3">
                                    <span className="title-page"> Buat Soal Ujian </span>
                                    <span className="subject-head float-right"> {this.state.name} </span>
                                </div>
                            </div>
                            <div className='form-position margin-bottom-3'>
                                <div className="margin-top-3">
                                    <label>Judul Ujian</label>
                                    <div className="margin-top-1">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Nilai KKM</label>
                                    <div className="margin-top-1">
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Kisi-kisi/Indikator</label>
                                    <div className="margin-top-1">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="margin-top-3">
                                    <label>Duplikat Soal</label>
                                    <Switch
                                        onChange={this.handleChangeSwitch}
                                        checked={this.state.checked}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onHandleColor="#ffffff"
                                        onColor="#1a9d7f"
                                        offColor="#cccccc"
                                        id="normal-switch"
                                        height={18}
                                        width={35}
                                    />
                                </div>
                                <div className='margin-top-3'>
                                    {questions}
                                    {/* <div className="row">
                                        
                                        <div className="col-sm-8">
                                            <label>Tipe Soal</label>
                                            <div className="margin-top-1">
                                                <Select
                                                    onChange={(e) => { this.props.handleChange(e.value, 'selectedProblemType') }}
                                                    options={this.state.problemTypes ? this.state.problemTypes : []}
                                                    value={this.state.problemTypes.find((element) => { return element.value == selectedProblemType })}
                                                    classNamePrefix="select"
                                                    className="fullwidth"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Jumlah Soal </label>
                                            <div className="margin-top-1">
                                                <input type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="margin-top-3" onClick={this.addQuestion.bind(this)}>
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className='normal-green-text'> Tambah Tipe Soal</span>
                                </div>
                                <div className='margin-top-3'>
                                    <div className='button'>
                                        <button className='btn-white margin-right-3'
                                            onClick={this.backToList.bind(this)}
                                        >
                                            Kembali
                                        </button>
                                        <button className='btn-green'>Lanjut</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.onlineExam //listOnlineExam dari reducer
})
const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange,
    loadData
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(index)