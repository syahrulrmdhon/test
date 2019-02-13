import React, {Component} from 'react';
import Exam from './exam'

const exams = (props) => {
  return (props.exams.entries.map((exam, index) => {
    return (
      <Exam
        key={index}
        order={index + 1}
        exam={exam.id}
        page={props.page}
        exam= {exam}
        title={exam.name}
        percentage={exam.percentage}
        question={exam.include_question}
        classes={exam.classses}
        assessmentId={props.assessmentId}
        delete={() => props.delete(exam.id)}
      />
    )
  }))
};
export default exams