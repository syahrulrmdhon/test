import React, { Component } from 'react'
import { assessmentType } from './common'
import { Answer } from '../views/beri-nilai/evaluasi/table-conditions';

export function categoryType(value = false) {
    assessmentType(value)
}

export function evaluatQuestion(value = false) {
    let questions = multipleQuestion(value.exam_question_choices)
    return (
        <div className="fullwidth">
            <span className="large-text">{value.question || '-'}</span>
            <div className="question">
                {questions}
            </div>
        </div>
    )
}

export function multipleQuestion(value = false) {
    let result = []
    let classname = ''

    if (value.length > 0) {
        value.map((question, key) => {
            let isCorrect = question.is_correct_ans
            if (isCorrect === null || isCorrect === false) {
                classname = 'bold'
                result.push(
                    <div className={classname} key={key}>
                        <div className="disblock margin-bottom-1">
                            {question.symbol.toLowerCase()}). {(question.content || '-')} <span className={classname}>({question.ans_count} Murid)</span>
                        </div>
                    </div>
                )
            } else if (isCorrect === true) {
                classname = 'normal-text-green-bold'
                result.push(
                    <div className={classname} key={key}>
                        <div className="disblock margin-bottom-1">
                            {question.symbol.toLowerCase()}). {(question.content || '-')} <span className={classname}>({question.ans_count} Murid)</span>
                        </div>
                    </div>
                )
            }
        })
    }
    return result
}