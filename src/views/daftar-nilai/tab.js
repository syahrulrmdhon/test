import React, { Component } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import { NotAvailable } from './../global/notAvailable'
import TablePengetahuan from './table-pengetahuan'
import TableKeterampilan from './table-keterampilan'
import TableSikap from './table-sikap'
import Loader from './../global/loader'

export default class Tab extends Component {
    render() {
        return (
            <TabContent className='tab-content-score margin-top-4 w-100' activeTab={this.props.activeTab}>
                <TabPane tabId='1'>
                    { 
                        this.props.loader ?
                            <Loader loader={this.props.loader}/>
                        :
                            !this.props.tableKnowledge ||
                            this.props.tableKnowledge.length === 0 ? (
                                <NotAvailable>
                                    Mohon pilih semua filter untuk menampilkan data.
                                </NotAvailable>
                        ) : (<TablePengetahuan
                                tableKnowledge={this.props.tableKnowledge}
                                idxScores={this.props.idxScores}
                                idxTugas={this.props.idxTugas}
                                nameClicked={this.props.nameClicked} />)
                    }
                </TabPane>
                <TabPane tabId='2'>
                    { 
                        this.props.loader ?
                        <Loader loader={this.props.loader}/>
                        : 
                            !this.props.tableSkill ||
                            this.props.tableSkill.length === 0 ? (
                                <NotAvailable>
                                    Mohon pilih semua filter untuk menampilkan data.
                                </NotAvailable>
                        ) : (<TableKeterampilan
                                tableSkill={this.props.tableSkill}
                                idxScoresSkill={this.props.idxScoresSkill}
                                nameClicked={this.props.nameClicked} />)
                    }
                    
                </TabPane>
                <TabPane tabId='3'>
                    {
                        this.props.loader ?
                        <Loader loader={this.props.loader}/>
                        : !this.props.tableAttitude ||
                            this.props.tableAttitude.length === 0 ? (
                                <NotAvailable>
                                    Mohon pilih semua filter untuk menampilkan data.
                                </NotAvailable>
                            ) : (<TableSikap
                                    tableAttitude={this.props.tableAttitude}
                                    nameClicked={this.props.nameClicked} />)
                    }
                </TabPane>
            </TabContent>
        )
    }
}