import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { handlingSelect } from './../../redux-modules/modules/score'


class SelectData extends Component {
  render() {
    let choices =[]
    let pick = null
    this.props.choices.map((data) => {
        if(data.is_correct_ans){
          pick = data.symbol
        }
        choices.push({value:data.symbol, label:data.symbol})
    })
    console.log(this.props.max_score,"answer")
    return (
      <td>
          <Select
            classNamePrefix="select"
            options={choices}
            value={choices.find((element) => {return element.value === this.props.exam.ans} )}
            onChange={(e) =>{this.props.handlingSelect(e, this.props.index, pick, this.props.max_score)}}
           />
      </td>
    )
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({ handlingSelect }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SelectData);
