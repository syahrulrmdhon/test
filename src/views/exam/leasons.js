import React, {Component} from 'react';
import Leason from './leason'

const leasons = (props) => {
  return (props.leasons.map((leason, index) => {
    return (
      <Leason
        key={leason.id}
        task={leason.task}
        title={leason.title}
        score={leason.scoreFilled}
        question={leason.haveQuestion}
        classes={leason.classAssigned} />
    )
  }))
};
export default leasons