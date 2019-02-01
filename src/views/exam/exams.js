import React, {Component} from 'react';
import Exam from './exam'

const exams = (props) => {
  return (props.exams.map((exam, index) => {
    console.log(exam.id, exam.name, exam.classses, exam.is_score_populated)
    return (
      <Exam
        key={exam.id}
        order={index + 1}
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