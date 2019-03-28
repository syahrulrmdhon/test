import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleChange, loadData } from './../../../redux-modules/modules/onlineExam'
import { getProblemTypes } from './../helper-online'

class AddQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problemTypes: [],
    }
  }
  componentDidMount() {
    getProblemTypes.call(this)
  }
  render() {
    let data = _.get(this, 'props.data', {})
    let selectedProblemType = data ? data.selectedProblemType : null
    return (
      <div className='row'>
        <div className="col-sm-8 margin-top-2">
          <label>Tipe Soal</label>
          <div className="margin-top-1">
            <Select
              onChange={(e) => { this.props.handleChange(e.value, 'selectedProblemType') }}
              options={this.state.problemTypes ? this.state.problemTypes : []}
              value={this.state.problemTypes.find((element) => { return element.value == selectedProblemType })}
              classNamePrefix="select"
              className="fullwidth"
            />
          </div>
        </div>
        <div className="col-sm-4 margin-top-2">
          <label>Jumlah Soal </label>
          <div className="margin-top-1">
            <input type="number" className="form-control" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.onlineExam //listOnlineExam dari reducer
})
const mapDispatchToProps = dispatch => bindActionCreators({
  handleChange,
  loadData
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)
