import { apiClient } from './apiClient'
import React, { Component } from 'react'
import _ from 'lodash'

export function schoolYears(params = {}, options = {}) {
    apiClient('get', 'v1/filters/school_years', false, params).then(response => {
        const datas = _.get(response, 'data.data.school_years', [])
        let result = []
        let arr = null
        let value = null

        
        if(datas.length > 0){
            datas.map((data, idx) => {
                if(data.status == 'active'){
                    value = data.id
                    arr = data
                }

                result.push({
                    value: data.id,
                    label: data.period_name,
                })
            })

            this.props.handleChange(value, 'selectedYear');
            this.props.handleChange(arr, 'schoolYear');

            this.setState({
                school_years: result,
            })
        }
    })
}

export function semesterList(params={}, options={}){
    apiClient('get', 'v1/filters/semesters', false, params).then(res=>{
        const list = _.get(res, 'data.data.semesters', [])
        let result = []
        let value = null

        if(list.length > 0) {
            list.map((data)=>{
                if(data.status == 'active') {
                    value = data.id
                }

                result.push({
                    value: data.id,
                    label: data.period_name,
                })

                this.props.handleChange(value, 'selectedSemester')
            })

            this.setState({
                listSemester: result
            })
        }
    })
}