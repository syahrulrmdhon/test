import React, {Component} from 'react'
import Exams from './exams'

const content = (props) => {
  return (
    <div className="margin-top-6 margin-left-3 margin-right-6">
      <div className="row align-items-center">
        <div className="col-sm-6 exam__wrapper-title">
          <label className="header-title">Daftar Tugas</label>
          <div className="exam__topic-description">Topik 3 Memahami Makna Denotasi dan Konotasi dalam Percakapan</div>
        </div>
        <div className="col-sm-6">
          <div className="float-right">
            <button onClick={() => props.addExam()} className="submit-btn default">Tambah Tugas</button>
          </div>
        </div>
      </div>
      <div className="exam__wrapper-panel">
      <Exams 
        exams={props.exams}
        assessmentId={props.assessmentId}
        delete={props.delete}
      />
      </div>
    </div>
  )
}

export default content