import { apiClient } from './apiClient'
import React from 'react'

export function getDataExamClass(step = 'ClassForm', assessment_id, exam_id){
    let params = {}

    let url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/new?step=${step}`
    apiClient('get', url, false, params).then(response => {
        const exam = response.data.data.exam
        const basic_comps = response.data.data.basic_comps
        const class_filters = response.data.data.class_filters

        if(exam.exam_classes_attributes.length == 0){
            exam.exam_classes_attributes = [{
                class_id: null,
                start_date: new Date(),
                deadline_date: new Date(),
                comp_kkms: [],
            }]
        }

        this.setState({
            exam: exam,
            basic_comps: basic_comps,
            class_filters: class_filters,
        })
    })
}

export function getDataExamUser(step = 'ClassForm', assessment_id, exam_id){
    let params = {}

    let url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/new?step=${step}`
    apiClient('get', url, false, params).then(response => {
        const classes = response.data.data.classes || []

        this.setState({
            exam: response.data.data.exam || [],
            classes: classes
        })
    })
}