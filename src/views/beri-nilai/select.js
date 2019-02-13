import React, { Component } from 'react'
import Select from 'react-select'

export default class SelectData extends Component {
  
  render() {

    return (
      <td>
          <Select
            classNamePrefix="select"
            options={this.props.choice}
            value={this.props.choice.find((element) => {return element.value === this.props.is_correct})}
           />
      </td>
    )
  }
}
