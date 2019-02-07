import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import { apiClient } from '../../utils/apiClient'
import RightContent from './../../components/RightSide/RightSide'
import Select from 'react-select'

export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 1,
        }

  
    }

    componentDidMount() {
        // if (this.state.activeTab === 1) {
        //     this.getKnowledgeScore()
        // }
    }



    render() {
        console.log(this.props.student,"my stdent")
        return (
            <div className="bg-white margin-top-8 container-fluid container-fluid-custom rounded-corners">
                <div className="row rounded-10">
                    <LeftSide>
                        <Profile dataProfile={this.props.student} />
                    </LeftSide>
                    <RightContent>
                    <div className="right-content-score">
                        <div className="right-content-score__title">
                            Masukan Nilai
                    </div>
                        <div>
                            <div className="table-responsive">
                                <table className="right-content-score____table">
                                    <thead className="right-content-score__table-head">
                                        <th className="right-content-score__no align-left text-center">No</th>
                                        <th>Tipe Soal</th>
                                        <th className="align-center">Jawaban Soal</th>
                                        <th className="align-center">Skor</th>
                                        <th>Bobot</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-left text-center ">1</td>
                                            <td className="align-left text-left">Pilihan ganda</td>
                                            <td className="align-center">
                                            <Select 
                                                classNamePrefix='select'
                                                placeholder='- Pilih jawaban -' />
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>
                                        </tr>
                                        {/* <tr>
                                            <td className="align-left text-center ">2</td>
                                            <td className="align-left text-left">Pilihan ganda</td>
                                            <td className="align-center">
                                            <Select 
                                                classNamePrefix='select'
                                                placeholder='- Pilih jawaban -' />
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">3</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr> */}
                                        
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </RightContent>
                </div>
            </div>
        )
    }
}
