import React, {Component} from 'react';
import Exam from './exam'

const exams = (props) => {
  return (props.exams.entries.map((exam, index) => {
    return (
      <Exam
        key={exam.id}
        order={index + 1}
        exam={exam.id}
        page={props.page}
        // task={leason.task}
        title={exam.name}
        percentage={exam.percentage}
        question={exam.include_question}
        classes={exam.classses}
      />
    )
  }))
};
export default exams