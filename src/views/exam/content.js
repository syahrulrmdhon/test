import React, { Component } from 'react'
import Exams from './exams'
import { NotAvailable } from '../../views/global/notAvailable'

const content = (props) => {
  const exams = props.exams
  return (
    <div className="padding-top-6 margin-left-3 margin-right-6 h-100">
      <div className="row align-items-center">
        <div className="col-sm-6 exam__wrapper-title">
          <label className="header-title">Daftar Penilaian</label>
          <div className="exam__topic-description">{props.assessment.name}</div>
        </div>
        <div className="col-sm-6">
          <div className="float-right">
            <button onClick={() => props.addExam()} className="submit-btn default">Tambah Penilaian</button>
          </div>
        </div>
      </div>
      <div className="exam__wrapper-panel">
        {
          exams.entries.length ?
            <Exams
                exams={props.exams}
                page={props.page}
                delete={props.delete} edit={props.edit}
                seeMore={props.seeMore}
                expanded={props.expanded}
            />
          :
            <NotAvailable>Tugas belum tersedia</NotAvailable>
        }
      </div>
    </div>
  )
}

export default content