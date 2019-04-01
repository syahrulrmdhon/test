import React, { Component } from 'react'

const numberList = props => {
  const problemTypes = props.problemTypes
  const numbers = problemTypes.map((type, index) => {
    return (
      <div key={index} className="online-question__number-wrapper clearfix">
        <div className="online-question__type">
          Nomor Soal {type.problem_type_abbv}
        </div>
        <div className="online-question__number-content">
          {
            type.numbers.map((item, idx) =>{
              let status = item.status

              if (props.currentPage === item.number && props.currentObj == index) {
                status = 'current-page'
              }

              return (
                <div
                  key={idx} className={`online-question__number online-question__number--${status}`}
                  onClick={() => props.onClickNumber({number: item.number, index: index, questionType: type.problem_type, questionLabel: type.problem_type_abbv})}>
                  {item.number}
                </div>
              )
            })
          }
        </div>
      </div>
    )

  })
  return numbers
}

export default numberList