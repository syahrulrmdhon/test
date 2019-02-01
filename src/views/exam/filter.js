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
              options={props.classes} />
          </div>
          <div className="content-input margin-top-6">
            <button className="filter-btn">Filter</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default filter
