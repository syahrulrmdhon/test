import React, { Component } from 'react'
import { NotAvailable } from '../../views/global/notAvailable'
import TablePengetahuan from './table-pengetahuan'
import TableKeterampilan from './table-keterampilan'
import TableSikap from './table-sikap'
import { TabContent, TabPane } from 'reactstrap'

export default class NavTab extends Component {
    render() {
        return (
            <TabContent activeTab={this.props.activeTab} className='tab-content-score margin-left-1 margin-right-1'>
                <TabPane tabId='1'>
                    {!this.props.tableKnowledge || this.props.tableKnowledge.length === 0 ? (
                        <NotAvailable>Data belum tersedia.</NotAvailable>
                    ) : (
                            <TablePengetahuan
                                tableKnowledge={this.props.tableKnowledge}
                                dTableKnowledge={this.props.dTableKnowledge}
                                nameClicked={this.props.nameClicked}
                            />
                        )
                    }
                </TabPane>
                <TabPane tabId='2'>
                    {
                        !this.props.tableSkill || this.props.tableSkill.length === 0 ? (
                            <NotAvailable>Data belum tersedia.</NotAvailable>
                        ) : (
                                <TableKeterampilan
                                    tableSkill={this.props.tableSkill}
                                    dTableSkill={this.props.dTableSkill}
                                    nameClicked={this.props.nameClicked}
                                />
                            )
                    }
                </TabPane>
                <TabPane tabId='3'>
                    {
                        !this.props.tableAttitude || this.props.tableAttitude.length === 0 ? (
                            <NotAvailable>Data belum tersedia.</NotAvailable>
                        ) : (
                                <TableSikap
                                    tableAttitude={this.props.tableAttitude}
                                    dTableAttitude={this.props.dTableAttitude}
                                    nameClicked={this.props.nameClicked}
                                />
                            )
                    }
                </TabPane>
            </TabContent>
        )
    }
}
