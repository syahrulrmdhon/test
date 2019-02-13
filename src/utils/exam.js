import React, { Component } from 'react'
import { assessmentType } from './common'
import { apiClient } from './apiClient'
import { Answer } from '../views/beri-nilai/evaluasi/table-conditions';

export function assessmentGetData(p_category = false){
    let params = {}
    let models = 'assessments'
    let category = this.state.activeTab

    if(this.state.assessment_type != null){
        params['assessment_type'] = this.state.assessment_type.value
    }

    if(this.state.class_id != null){
        params['class_id'] = this.state.class_id.value
    }

    if(this.state.school_subject_id != null){
        params['school_subject_id'] = this.state.school_subject_id.value
    }

    let url = 'v1/assessments?category=' + (p_category ? p_category : category)
    apiClient('get', url, false, params).then(response => {
        let assessments = response.data.data.assessments
        let data = assessments.entries
        console.log(response)

        let paginate = {
            size: assessments.size,
            total_entries: assessments.total_entries,
            total_pages: assessments.total_pages,
        }      
        this.setState({
            data: data,
            paginate: paginate,         
        })
    })
}

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

export function combineNameSubject(values = []){
    let result = 'N/A'
    if(values.length > 0){
        result = []
        values.map((value, idx) => {
            result[idx] = value.alias_name
        })
        result = result.join(', ')
    }
    return result
}

export function assessmentShow(id) {
    let url = `v1/assessments/${id}`

    apiClient('get', url).then(response => {
        let data = response.data.data.assessment
        this.setState({
            data: data                
        })
    })
}

export function assessmentLabel(value, color = false){
    let result = ''
    switch(value){
        case 'task':
            result = (color) ? 'bcgreen' : 'Tugas'
        break
        case 'daily_exam':
            result = (color) ? 'bcblue' : 'UH'
        break
        case 'midterm_exam':
            result = (color) ? 'bcblack2' : 'UTS'
        break
        case 'final_exam':
            result = (color) ? 'bcred' : 'UAS'
        break
        default:
            return 'N/A'
    }
    return result
}

export function getQuestion(id, number) {
    let params = {}

    if(this.state.step !== null){
        params['step'] = this.state.step
    }

    if(this.state.activeNumber !== null) {
        params['number'] = this.state.activeNumber
    }
    let url = `v1/assessments/${id}/exams/new?`

    apiClient('get', url, false, params).then(response => {
        let data = response.data.data
        this.setState({
            data: data,
        })
    })

}