import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { NavLink } from 'react-router-dom';

import 'react-circular-progressbar/dist/styles.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const exam = (props) => {
  const styles = {
    path: {
      stroke: '1a9d7f',
      strokeLinecap: 'square'
    },
    text: { fill: '#f88', fontSize: '16px' },
    trail: {
      stroke: 'ededed',
    }
  }

  return (
    <div className="exam__panel">
      <div className="row h-100">
        <div className="col-sm-5 position-relative">
          <div className="exam__task-of">Tugas {props.order}</div>
          <div className="exam__title">{props.title}</div>
          <div className="exam__action-wrapper">
            <NavLink to= {`/pariticipant-class/${props.exam.assessment_id}/assessment/${props.exam.id}/exam`} className="exam__action" >
              Pilih Kelas
            </NavLink>
              {
              props.question &&
              <div className="exam__action">
                <NavLink to={`/all-question/${props.exam.assessment_id}/assessment/${props.exam.id}/exam/`} className="exam__action" >
                  Lihat soal
                </NavLink>
              </div>
            }
            <div className="exam__action" onClick={props.edit}>Ubah</div>
            <div className="exam__action" onClick={props.delete}>Hapus</div>
          </div>
        </div>
        <div className="col-sm-2 d-flex">
          <div className="exam__score-wrapper">
            <div className="exam__circular-wrapper">
              <CircularProgressbar
                percentage={props.percentage}
                styles={styles} />
            </div>
            <div className="exam__percentage-wrapper">
              <div className="exam__percentage">{props.percentage}%</div>
              <div className="exam__percentage-label">Nilai Terisi</div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 exam__assigned-class-wrapper">
          <div className="exam__assigned-class align-items-start">KELAS YANG DITUGASKAN</div>
          {
            props.classes.length ?
              <div className="exam__class-wrapper">
                {
                  props.classes.map((item, index) => {
                    return <div key={item.id} className="exam__class" onClick={(e) => { props.page(e, item.id, item.assessment_id, item.exam_id, item.flag, props.assessment.category) }} >{item.name}</div>
                  })
                }
              </div>
              :
              <div className="exam__not-class">Belum ada kelas yang ditugaskan</div>
          }
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state, props) => ({
  assessment: state.assessment
})

export default connect(mapStateToProps)(exam)