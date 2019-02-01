import React, {Component} from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const leason = (props) => {
  const styles ={
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
          <div className="exam__task-of">{props.task}</div>
          <div className="exam__title">{props.title}</div>
          <div className="exam__action-wrapper">
            <div className="exam__action">Pilih Kelas</div>
            {
              props.question &&
              <div className="exam__action">Pilih Soal</div>
            }
            <div className="exam__action">Ubah</div>
            <div className="exam__action">Hapus</div>
          </div>
        </div>
        <div className="col-sm-2 d-flex">
          <div className="exam__score-wrapper">
            <div className="exam__circular-wrapper">
              <CircularProgressbar
              percentage={props.score}
              styles={styles} />
            </div>
            <div className="exam__percentage-wrapper">
              <div className="exam__percentage">{props.score}%</div>
              <div className="exam__percentage-label">Nilai Terisi</div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 exam__assigned-class-wrapper">
          <div className="exam__assigned-class align-items-start">KELAS YANG DITUGASKAN</div>
          <div className="exam__class-wrapper">
            {
              props.classes.map((item, index) => {
                return <div key={index} className="exam__class">{item}</div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
};
export default leason