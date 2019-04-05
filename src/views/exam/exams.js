import React, {Component} from 'react';
import Exam from './exam'

const exams = (props) => {
  return (props.exams.entries.map((exam, index) => {
    return (
      <Exam
        key={index}
        order={index + 1}
        seeMore={props.seeMore}
        expanded={props.expanded}
        exam={exam.id}
        name={exam.name}
        page={props.page}
        exam= {exam}
        title={exam.name}
        percentage={exam.percentage}
        question={exam.include_question}
        classes={exam.classses}
        assessmentId={props.assessmentId}
        delete={() => props.delete(exam.id)}
        edit={() => props.edit(exam.id)}
      />
    )
  }))
};
export default exams