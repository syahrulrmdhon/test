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
              let status = item.is_created ? 'online-question__number--created' : ''
            return  <div key={index} className={`online-question__number ${status}`}>{item.number}</div>
            })
          }
        </div>
      </div>
    )

  })
  return numbers
}

export default numberList