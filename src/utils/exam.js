import React, { Component } from 'react'
import { assessmentType } from './common'
import { apiClient } from './apiClient'

export function assessmentGetData(){
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

    let url = 'v1/assessments?category=' + category
    apiClient('get', url, false, params).then(response => {
        let data = response.data.data[models]       
        this.setState({
            data: data                
        })
    })
}

export function categoryType(value = false){
    assessmentType(value)
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