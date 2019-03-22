import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TabContent, TabPane } from 'reactstrap'
import { NotAvailable } from '../../views/global/notAvailable'
import Pencil from './../../assets/images/edit.svg';
import '../../styles/student/table.scss'
import Loader from './../../views/global/loader'

export default class ScoreTable extends Component {

  render() {
    const knowledgeScore = this.props.knowledgeScore
    const skillScore = this.props.skillScore
    const attitudeScore = this.props.attitudeScore

    return (
      <div className="h-100">
        <TabContent activeTab={this.props.activeTab} className="h-100">
          <TabPane className="knowledge" tabId={1}>
            {
              this.props.loader ?
                <div className="is-empty">
                  <Loader loader={this.props.loader}/>
                </div>
              :
              knowledgeScore ?
              <div>
                <div className="table-content">
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="text-left">Mata Pelajaran</th>
                      <th>Nilai Rapor</th>
                      <th>Predikat</th>
                      <th className="text-left">Deskripsi</th>
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      knowledgeScore.subject_scores.map((subject, index) => {
                        const description = subject.score.description
                        return <tr key={index}>
                          <td>{subject.name ? subject.name : '-'}</td>
                          <td style={{width: '100px'}} className="text-center">{subject.score.score ? subject.score.score : '-'}</td>
                          <td style={{width: '100px'}} className="text-center">{subject.score.predicate ? subject.score.predicate : '-'}</td>
                          <td className="text-left">{description ? description : '-'}</td>
                          <td style={{color: "#009D81", fontFamily: "NunitoBold", width: '75px'}}>
                            <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => {this.props.redirect(subject.id, this.props.activeTab)}}/>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </Table>
                </div>
                <div className="border-hidden"></div>
                <Table className="table-amount">
                  <tbody>
                  <tr className="total-score">
                        <td colSpan="2" className="border-right-0 text-center">Jumlah Nilai Pengetahuan</td>
                        <td className="border-left-0 border-right-0 text-center">{knowledgeScore.total.score ? knowledgeScore.total.score : '-'}</td>
                        <td className="border-left-0 border-right-0"></td>
                        <td className="border-left-0"></td>
                      </tr>
                      <tr className="average-score">
                        <td colSpan="2" className="border-right-0 text-center">Nilai Pengetahuan Rata-Rata</td>
                        <td className="border-left-0 border-right-0 text-center">{knowledgeScore.total_average.score ? knowledgeScore.total_average.score : '-'}</td>
                        <td className="border-left-0 border-right-0"></td>
                        <td className="border-left-0"></td>
                      </tr>
                  </tbody>
                </Table>
              </div>
              :
              <div className="is-empty">
                <NotAvailable>Data tidak tersedia</NotAvailable>
              </div>
            }
          </TabPane>
          <TabPane className="knowledge" tabId={2}>
            {
              this.props.loader ?
                <div className="is-empty">
                  <Loader loader={this.props.loader} />
                </div>
              :
              skillScore ?
              <div>
                <div className="table-content">
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="text-left">Mata Pelajaran</th>
                      <th>Nilai Rapor</th>
                      <th>Predikat</th>
                      <th className="text-left">Deskripsi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    skillScore.subject_scores.map((subject, index) => {
                      const description = subject.score.description
                      return <tr key={index}>
                          <td>{subject.name ? subject.name : '-'}</td>
                          <td style={{width: '100px'}} className="text-center">{subject.score.score ? subject.score.score : '-'}</td>
                          <td style={{width: '100px'}} className="text-center">{subject.score.predicate ? subject.score.predicate : '-'}</td>
                          <td className="text-left">{description ? description : '-'}</td>
                          <td style={{color: "#009D81", fontFamily: "NunitoBold", width: '75px'}}>
                            <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => {this.props.redirect(subject.id, this.props.activeTab)}}/>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </Table>
              </div>
              <div className="border-hidden"></div>
              <Table className="table-amount">
                <tbody>
                <tr className="total-score">
                      <td colSpan="2" className="border-right-0 text-center">Jumlah Nilai Keterampilan</td>
                      <td className="border-left-0 border-right-0 text-center">{skillScore.total.score ? skillScore.total.score : '-'}</td>
                      <td className="border-left-0 border-right-0"></td>
                      <td className="border-left-0"></td>
                    </tr>
                    <tr className="average-score">
                      <td colSpan="2" className="border-right-0 text-center">Nilai Keterampilan Rata-Rata</td>
                      <td className="border-left-0 border-right-0 text-center">{skillScore.total_average.score ? skillScore.total_average.score : '-'}</td>
                      <td className="border-left-0 border-right-0"></td>
                      <td className="border-left-0"></td>
                    </tr>
                </tbody>
              </Table>
              </div>
              :
              <div className="is-empty">
                <NotAvailable>Data tidak tersedia</NotAvailable>
              </div>
            }
          </TabPane>
          <TabPane className="attitude" tabId={3}>
            {
              this.props.loader ?
                <div className="is-empty">
                  <Loader loader={this.props.loader} />
                </div>
              :
              attitudeScore ?
              <div>
                <div className="table-content">
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="text-left">Mata Pelajaran</th>
                      <th className="text-left">Keterangan</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    attitudeScore.subject_scores.map((subject, index) => {
                      return <tr key={index}>
                          <td>{subject.name}</td>
                          <td className={!subject.description ? 'text-center' : ''}>{subject.description ? subject.description : '-'}</td>
                          <td>
                          {
                            subject.score === 2 ?
                            (<div className="status">
                              <div className="indicator green-indicator" />{subject.status_text}
                            </div> )
                            :
                            subject.score === 1 ?
                            (<div className="status">
                              <div className="indicator yellow-indicator" />{subject.status_text}
                            </div>)
                            :
                            <div className="status">
                              <div className="indicator red-indicator" />{subject.status_text}
                            </div>
                          }
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </Table>
              </div>
              <div className="border-hidden"></div>
              <div className="total-status">
              <div style={{width: '240px'}}>
                  <div className="pull-left" style={{width: '180px'}}>
                    Total Sikap Butuh Perhatian
                    <br />
                    Total Sikap Sangat Baik
                  </div>
                  <div>
                    {attitudeScore.recap.subjects.bp} <div className="pull-right">Sikap</div>
                    <br />
                    {attitudeScore.recap.subjects.sb} <div className="pull-right">Sikap</div>
                  </div>
                  </div>
                </div>
              </div>
              :
              <div className="is-empty">
                <NotAvailable>Data tidak tersedia</NotAvailable>
              </div>
            }
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
