import React, { Component } from 'react'
import TabContent from '../TabContent/TabContent'

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const tabs = ['Pengaturan', 'Keterampilan', 'Sikap'];

    return (
      <div className="right-content col-10 padding-left-6 padding-right-6 padding-top-6">
        <TabContent tab={tabs} className="total-score" activeTab={this.state.activeTab}/>
      </div>
    )
  }
}
