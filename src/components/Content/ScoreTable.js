import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TabContent, TabPane } from 'reactstrap'

import '../../styles/student/table.scss'

export default class ScoreTable extends Component {

  render() {
    const knowledgeScore = this.props.knowledgeScore
    const skillScore = this.props.skillScore
    const attitudeScore = this.props.attitudeScore

    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane className="knowledge" tabId={1}>
            {
              knowledgeScore &&
              <div>
                <div className="table-content">
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="text-left">Mata Pelajaran</th>
                      <th className="text-left">Deskripsi</th>
                      <th>Nilai Rapor</th>
                      <th>Predikat</th>
                      <th>Deskripsi Lainnya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      knowledgeScore.subject_scores.map((subject, index) => {
                        const description = subject.score.description
                        return <tr key={index}>
                          <td>{subject.name ? subject.name : '-'}</td>
                          <td className={!description ? 'text-center' : ''}>{description ? description : '-'}</td>
                          <td>{subject.score.score ? subject.score.score : '-'}</td>
                          <td>{subject.score.predicate ? subject.score.predicate : '-'}</td>
                          <td><Link to="">Lihat Deskripsi</Link></td>
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
            }
          </TabPane>
          <TabPane className="knowledge" tabId={2}>
            {
              skillScore &&
              <div>
                <div className="table-content">
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="text-left">Mata Pelajaran</th>
                      <th className="text-left">Deskripsi</th>
                      <th>Nilai Rapor</th>
                      <th>Predikat</th>
                      <th>Deskripsi Lainnya</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    skillScore.subject_scores.map((subject, index) => {
                      const description = subject.score.description
                      return <tr key={index}>
                          <td>{subject.name ? subject.name : '-'}</td>
                          <td className={!description ? 'text-center' : ''}>{description ? description : '-'}</td>
                          <td>{subject.score.score ? subject.score.score : '-'}</td>
                          <td>{subject.score.predicate ? subject.score.predicate : '-'}</td>
                          <td><Link to="">Lihat Deskripsi</Link></td>
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
            }
          </TabPane>
          <TabPane className="attitude" tabId={3}>
            {
              attitudeScore && 
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
                          <td className={!subject.note ? 'text-center' : ''}>{subject.note ? subject.note : '-'}</td>
                          <td>
                          {
                            subject.status === "sb" ? 
                            <div className="status">
                              <div className="indicator blue-indicator" />Sangat Baik
                            </div> : 
                            <div className="status">
                              <div className="indicator red-indicator" />Butuh Perhatian
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
                  <div className="pull-left">
                    Total Sikap Butuh Perhatian
                    <br />
                    Total Sikap Sangat Baik
                  </div>
                  <div>
                    {attitudeScore.recap.subjects.bp} (<span>tiga</span>)
                    <br />
                    {attitudeScore.recap.subjects.sb} (<span>lima</span>)
                  </div>
                </div>
              </div>
            }
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
