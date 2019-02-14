import React, {Component} from 'react'
import Select from 'react-select';

const filter = (props) => {
  return (
    <div className="margin-top-6 margin-left-3">
      <label className="header-title">Filter</label>
      <div className="margin-top-4">
        <form>
          <div className="content-input">
            <label className="content-label">Kelas</label>
            <Select
              className="select-list"
              classNamePrefix="select"
              placeholder="Pilih Kelas"
              name="class_id"
              value={props.selectedClass}
              options={props.classes} 
              onChange={(event) => props.filter(event)}/>
          </div>
          <div className="content-input margin-top-6">
          </div>
        </form>
        <button className="filter-btn" onClick={() => props.getExams()}>Filter</button>
      </div>
    </div>
  )
}

export default filter
