import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import './../../styles/beri-nilai/main.scss'
import { getParticipant } from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/avatar_def.svg'
import Ava_m from './../../assets/images/m_avatar.svg'
import Ava_f from './../../assets/images/f_avatar.svg'
import Pencil from './../../assets/images/beri_nilai.svg';
import Loader from './../global/loader'
import { NotAvailable } from './../global/notAvailable'



const data_option = [
  {value:'score_asc', label:'Nilai Terendah'},
  {value:'score_desc', label:'Nilai Tertinggi'},
  {value:'name_asc', label:'Nama A-Z'},
  {value:'name_desc', label:'Nama Z-A'}
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
    this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment_id)
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
      switch(this.props.category){
        case 'knowledge':
          child = e.scores.subject_averages
        break;
        case 'skill':
          child = e.scores.problem_type_scores
          let result = []

          if(child.length > 0){
            child.map((element, idx) => {
              let details = element.details || []
              let result_details = []
              if(details.length > 0){
                details.map((detail, key) => {
                  result_details.push({
                    average_score: {
                      improvement_status: detail.improvement_status,
                      score: detail.score,
                      predicate: detail.predicate,
                      result_status: detail.result_status,
                    },
                    basic_comp: {
                      competency_number: '',
                      content: detail.question,
                    },
                  })
                })
              }
              
              result.push({
                average_score: {
                  predicate: element.predicate,
                  score: element.average_score,
                  result_status: element.result_status,
                },
                competency_averages: result_details,
                subject_name: element.problem_type
              })
            })
          }
          child = result
        break;
        default:
        result.push('')
      }
    })

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
    let scoresData = []
    let status = data.scores.total_average.result_status || null
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
                    <div className='col-sm-6'>
                      <Select
                        isClearable
                        placeholder='Urut Berdasarkan'
                        classNamePrefix='select'
                        options={data_option}
                        value={this.props.valueOpt}
                        onChange={this.props.onChangeScore}
                      />
                    </div>
                    <div className='col-sm-6'>
                      <div className='search'>
                        <input
                          autoComplete="off"
                          className="input-field"
                          type="text"
                          placeholder="Cari murid disini..."
                          name="search"
                          onChange={event => {this.props.onChange(event)}}
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
        {/* Edited By Risky S. */}
        {
          this.props.loader ?
            <Loader loader={true} />
          :
          dataArray ?     
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
              dataArray && dataArray.length ? (
              dataArray && dataArray.map(function (data, index) {
                return <div className="box-student margin-top-3 " key={Math.random()} >
                  <div className={classnames('border-full border-right', data.scores.total_average.result_status === null || data.scores.total_average.result_status === 'need_attention' ? 'border-left-col-red' : data.scores.total_average.result_status === 'good' || data.scores.total_average.result_status === 'very_good' ? 'border-left-col-green' : 'border-left-col-yellow')}>
                    <div className="row">
                      <div className="col-sm-12 ">
                        <div className="col-sm-3 padding-left-4 padding-top-2 padding-bottom-2 d-table">
                          {/* Edited by Risky S. */}
                          <Avatar src={data.user.gender == 'M'? Ava_m : Ava_f} size="30" round={true} className="d-table-cell"/>
                          
                          <span className="padding-left-2 label-content d-table-cell">{data.user.full_name}</span>
                        </div>
                        <div className="col-sm-3 align-left padding-1 d-flex align-items-center word-break h-100">
                          <span className="label-content spacing-line-1">{data.user.email}</span>
                        </div>
                        <div className="col-sm-3 align-center padding-2">
                          {this.generateNilai(data)}
                        </div>
                        <div className="col-sm-2 align-left padding-2">
                          <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => { this.props.handleNewScoreParent(e, data.user.id) }} />
                        </div>
                        <div className="col-sm-1 align-left padding-2">
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
                                <div className="second-head padding-2 " key={Math.random()}>
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
                                    return <div className="padding-2" key={Math.random()}>
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
                                              {this.generateSubNilai(datax.average_score.result_status, datax.average_score.score)}
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
              ) : (
                <div className="col-sm-12">
                  <div className="empty-search">Data tidak tersedia</div>
                </div>
              )

            }
            {/* start here */}

          </div>
        </div>
        // Edited By Risky S.
        :
        <NotAvailable>Data tidak tersedia</NotAvailable>
      }
      </div>

    )
  }
}



const mapStateToProps = state => ({
  user: state.score,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

