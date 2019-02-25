import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import './../../styles/beri-nilai/main.scss'
import { getParticipant } from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'
import Pencil from './../../assets/images/beri_nilai.svg';


const data_option = [
  {value:'highest', label:'Nilai Tertinggi'},
  {value:'lowest', label:'Nilai Terendah'},
]

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
      dataChild: []
    }
    this.onClickToogle = this.onClickToogle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleNewScore = this.handleNewScore.bind(this)
    this.generateBorder = this.generateBorder.bind(this)
    this.generateNilai = this.generateNilai.bind(this)
  }
  componentDidMount() {
    this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment)
  }
  onClickToogle() {
    this.setState({
      height: 'col-height'
    })
  }

  handleClick(e, id, idx) {
    let subject = []
    let dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
    let child = []
    let filtering = dataArray.filter(item => item.user.id === id)
    filtering.map((e) => {
      child = e.scores.subject_averages
    })
    console.log(child, "data")



    this.setState({
      dataChild: child,
      selectIndex: (this.state.selectIndex === idx ? -1 : idx),
    })

  }

  handleNewScore(e, student, ) {
    e.preventDefault()
    this.props.handleNewScoreParent(e, student)
  }

  generateNilai(data) {
    console.log(data.scores.total_average, "data atas")
    let scoresData = []
    let status = data.scores.total_average.result_status
    if (status === 'very_good') {
      scoresData.push(<span className="label-green">{data.scores.total_average.score}</span>)
    } else if (status === 'good') {
      scoresData.push(<span className="label-green">{data.scores.total_average.score}</span>)
    } else if (status === 'enough') {
      scoresData.push(<span className="label-yellow-score">{data.scores.total_average.score}</span>)
    } else if (status === 'need_attention') {
      scoresData.push(<span className="label-nilai">{data.scores.total_average.score}</span>)
    }
    else {
      scoresData.push(<span className="label-nilai">N/A</span>)
    }
    const scores = (
      <div>   {scoresData}</div>

    )
    return scores
  }

  generateBorder(data) {
    let scoresData = []
    let status = data.scores.total_average.result_status
    if (status === 'very_good') {
      scoresData.push(<span className="label-green">{data.scores.total_average.score}</span>)
    } else if (status === 'good') {
      scoresData.push(<span className="label-green">{data.scores.total_average.score}</span>)
    } else if (status === 'enough') {
      scoresData.push(<span className="label-yellow">{data.scores.total_average.score}</span>)
    } else if (status === 'need_attention') {
      scoresData.push(<span className="beri-nilai">{data.scores.total_average.score}</span>)
    }
    else {
      scoresData.push(<span className="label-nilai">N/A</span>)
    }
    const scores = (
      <div>   {scoresData}</div>
    )
    return scores
  }

  generatePredicate(data) {
    if (data === 'very_good') {
      const render = (
        <span>Sangat Memuaskan</span>
      )
      return render;
    } else if (data === 'good') {
      const render = (
        <span>Memuaskan</span>
      )
      return render;
    } else if (data === 'enough') {
      const render = (
        <span>Butuh Perhatian</span>
      )
      return render;
    } else if (data === 'need_attention') {
      const render = (
        <span>Evaluasi Ulang</span>
      )
      return render;

    } else {
      const render = (
        <span>N/a</span>
      )
      return render;
    }
  }




  generateSubNilai(data, score) {
    if (data === 'very_good') {
      const render = (
        <span className="label-green">{score}</span>)
      return render;
    } else if (data === 'good') {
      const render = (
        <span className="label-green">{score}</span>)
      return render;
    } else if (data === 'enough') {
      const render = (
        <span className="label-yellow-score">{score}</span>
      )
      return render;
    } else if (data === 'need_attention') {
      const render = (
        <span className="label-nilai">{score}</span>
      )
      return render;

    } else {
      const render = (
        <span className="label-nilai">N/A</span>)
      return render;
    }
  }

  render() {
    const dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
    return (
      <div className="margin-left-5 margin-right-5 bg-white padding-top-4 margin-bottom-2">
        <div className='row padding-bottom-5'>
          <div className='col-sm-12'>
            <div className='margin-top-4 padding-side-0'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='margin-top-2'>
                    <span className="tit">Hasil Perolehan Nilai</span>
                  </div>
                </div>
                <div className='col-sm-8'>
                  <div className='row'>
                    <div className='col-sm-4'>
                      <Select
                        isClearable
                        placeholder='Urut Berdasarkan'
                        classNamePrefix='select'
                        options={data_option}
                        value={this.props.valueOpt}
                        onChange={this.props.onChangeScore}
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
                          onChange={this.props.onChange}
                          value={this.props.search}
                        />
                        <i className="fa fa-search icon" onClick={this.props.submit}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-bottom">
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
                  <div className={classnames('border-full border-right', data.scores.total_average.result_status === null || data.scores.total_average.result_status === 'need_attention' ? 'border-left-col-red' : data.scores.total_average.result_status === 'good' || data.scores.total_average.result_status === 'very_good' ? 'border-left-col-green' : 'border-left-col-yellow')}>
                    <div className="row">
                      <div className="col-sm-12 ">
                        <div className="col-sm-3  padding-1">
                          <Avatar src={Ava} size="30" round={true} />
                          <span className="padding-left-2  label-content ">{data.user.full_name}</span>
                        </div>
                        <div className="col-sm-3 align-left padding-2 ">
                          <span className="label-content">{data.user.email}</span>
                        </div>
                        <div className="col-sm-3 align-center padding-2 ">
                          {this.generateNilai(data)}
                        </div>
                        <div className="col-sm-2 align-left padding-2 ">
                          <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => { this.props.handleNewScoreParent(e, data.user.id) }} />
                        </div>
                        <div className="col-sm-1 align-left padding-2 ">
                          <i className={classnames("fa fas fa-ellipsis-h icon-table-pencil", data.scores.total_average.result_status === null || data.scores.total_average.result_status === 'need_attention' ? 'cred' : data.scores.total_average.result_status === 'very_good' ? 'cgreen' : 'cyellow')} onClick={(e) => { this.handleClick(e, data.user.id, index) }} ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classnames("border-right border-bottom ", data.scores.total_average.result_status === null || data.scores.total_average.result_status === 'need_attention' ? 'border-left-col-red' : data.scores.total_average.result_status === 'very_good' || data.scores.total_average.result_status === 'good' ? 'border-left-col-green' : 'border-left-col-yellow', `${this.state.selectIndex === index ? 'display-block' : 'display-none'}`)} key={this.state.key}    >
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="margin-side-10 padding-bottom-3 margin-top-5">
                          {
                            this.state.dataChild.map((data) => {
                              return <div>
                                <div className="second-head padding-1 " key={Math.random()}>
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <div className="col-sm-4">
                                        {data.subject_name}
                                      </div>
                                      <div className="col-sm-4">
                                      </div>
                                      <div className="col-sm-4 align-center">
                                        {data.average_score.result_status === 'very_good' || data.average_score.result_status === 'good' ? <span className="label-green">{data.average_score.score}</span> : data.average_score.result_status === 'need_attention' || data.average_score.result_status === null ? <span className="label-nilai">{data.average_score.score}</span> : <span className="label-yellow-score">{data.average_score.score}</span>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {
                                  data.competency_averages.map((datax) => {
                                    return <div className="padding-1" key={Math.random()}>
                                      <div className="row">
                                        <div className="col-sm-12">
                                          <div className="col-sm-6">
                                            {datax.basic_comp.competency_number + ' ' + datax.basic_comp.content}
                                          </div>
                                          <div className="col-sm-2">
                                            <div className="align-center">
                                              {this.generatePredicate(datax.average_score.result_status)}
                                              {/* {datax.average_score.result_status === 'very_good' ? <span className="label-green align-center">Sangat Memuaskan</span> : datax.average_score.result_status === 'need_attention' ? <span className="label-nilai">Evaluasi Ulang</span> : <span className="label-yellow-score">Butuh Perhatian</span>} */}
                                            </div>
                                          </div>
                                          <div className="col-sm-4 align-center">
                                            <div className="align-center">
                                              {this.generateSubNilai(datax.average_score.result_status, data.average_score.score)}
                                            </div>
                                          </div>
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
                </div>
              }, this)
            }
            {/* start here */}

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

