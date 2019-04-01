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
            type.numbers.map((item, index) =>{
              let status = item.status

              if (props.currentPage === item.order) {
                status = 'current-page'
              }

              return (
                <div
                  key={index} className={`online-question__number online-question__number--${status}`}
                  onClick={() => props.onClickNumber({number: item.order, questionType: type.problem_type, questionLabel: type.problem_type_abbv})}>
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