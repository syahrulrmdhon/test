import React, {Component} from 'react';
import Exam from './exam'

const exams = (props) => {
  return (props.exams.entries.map((exam, index) => {
    console.log(exam)
    return (
      <Exam
        key={index}
        order={index + 1}
        title={exam.name}
        percentage={exam.percentage}
        question={exam.include_question}
        classes={exam.classses}
        delete={() => props.delete(exam.id)}
      />
    )
  }))
};
export default exams