import React, { Component } from 'react'
import { assessmentType } from './common'

export function categoryType(value = false){
    assessmentType(value)
}

export function evaluatQuestion(value = false){
    let questions = multipleQuestion(value.exam_question_choices)
    
    return(
        <div className="fullwidth">
            <span className="large-text">{value.question || 'N/A'}</span>
            <div className="question">
                {questions}
            </div>
        </div>
    )
}

export function multipleQuestion(value = false){
    let result = []
    
    if(value.length > 0){
        value.map((question, key) => {
            result.push(
                <div className="disblock margin-bottom-1" key={key}>
                    {question.symbol}). {(question.content || 'N/A')} <span className="bold">({question.ans_count})</span>
                </div>
            )
        })
    }
    return result
}