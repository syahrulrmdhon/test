import React from "react"
import { connect } from "react-redux"
import _ from "lodash"
import Select from 'react-select'

const form = props => {
  const problemTypes = props.problemTypes;

  return (
    <div className="online-question__right-wrapper main-block">
      <div className="online-question__top-content">
        <div className="">
          <div className="online-question__form-group">
            <label className="online-question__label">Kompetensi Dasar</label>
            <Select
              classNamePrefix="select"
              placeholder="Pilih Kompetensi Dasar ..." />
          </div>
          <div className="online-question__form-group">
            <label className="online-question__label">Bobot Nilai</label>
            <input className="online-question__input online-question__score" type="number" />
          </div>
        </div>
        <div className="online-question__navigation">
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  problemTypes: _.get(state, "onlineQuestion.data.problem_types", [])
});

export default connect(mapStateToProps)(form);
