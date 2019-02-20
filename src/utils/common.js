import { apiClient } from './apiClient'
import React, { Component } from 'react'

export function removeField(values, idx){
    let removed = values.splice(idx, 1)
    return values
}

export function setLabelSelect(lists, values = {}){
    let label = ''
    lists.map((list, idx) => {
        let key = list.value
        let set_value = !!(values) ? values.value : ''

        if(key == set_value){
            label = list.label;
        }
    })

    if(label != ''){
        values.label = label
        return values
    } else {
        return false
    }
}

export function seeMore(value, s_count = 50){
    const count = value.length
    
    if(s_count < count){
        value = value.substring(0, s_count);
        value += '...'
    }
    value = <span className="profile" title={value}>{value}</span>
    return value
}

export function setErrorRuby(data = {}){
    let result = {}
    let errors = data.errors || []

    if(typeof errors == 'object'){
        for (var error in errors) {
            if (errors.hasOwnProperty(error)) {
                result[error] = errors[error]
            }
        }
    }
    return result
}

export function setError(data = []){
    let result = {}
    let errors = data.errors || []

    if(errors.length > 0){
        errors.map((error, idx) => {
            result[error.field_ref] = error.description
        });
    }
    return result
}

export function getUser(redirect = false){
    const url = 'v1/users'
    apiClient('get', url).then(res=>{
        localStorage.setItem("user_id", res.data.data.user.id)

        if(res.data.data.homeroom_class != null){
            localStorage.setItem("class_id", res.data.data.homeroom_class.id)
        }

        // attribute full
        localStorage.setItem("user", JSON.stringify(res.data.data.user))
        localStorage.setItem("school", JSON.stringify(res.data.data.school))
        localStorage.setItem("current_period", JSON.stringify(res.data.data.current_period))
        localStorage.setItem("homeroom_class", JSON.stringify(res.data.data.homeroom_class))

        if(redirect){
            window.location.href = "/home";
        }
    })
}

export function getDate(format = 'case-1', date = new Date){
    let result = ''

    if(!!(date)){
        let dt = date.getDate()
        let month = date.getMonth()
        let year = date.getUTCFullYear()

        switch(format){
            case 'case-1': // 25 Novermber 2018
                month = getMonthIndo(month)    
                result = dt+' '+month+' '+year
            break
            case 'case-2': // Senin, Minggu
                let day = date.getDay()
                result = getDayIndo(day)
            break
            case 'case-3':
                let hour = date.getHours()
                let minute = date.getMinutes()
                
                result = hour + ':' + minute
            break
            case 'case-4': // 2019-01-20
                result = new Intl.DateTimeFormat('sq-AL', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)
            break
            case 'case-5': // 2019-01-20 00:00
                const tempDate = getDate('case-4', date)
                const tempTime = getDate('case-3', date)

                result = `${tempDate} ${tempTime}`
            break
        }
    }
    return result
}

export function getDayIndo(day = false){
    let result = ''
    switch(day.toString()){
        case '0':
            result = 'Minggu'
        break
        case '1':
            result = 'Senin'
        break
        case '2':
            result = 'Selasa'
        break
        case '3':
            result = 'Rabu'
        break
        case '4':
            result = 'Kamis'
        break
        case '5':
            result = 'Jumat'
        break
        case '6':
            result = 'Sabtu'
        break
    }
    return result
}

export function getMonthIndo(month = false){
    let result = ''
    switch(month.toString()){
        case '0':
            result = 'Januari'
        break
        case '1':
            result = 'Februari'
        break
        case '2':
            result = 'Maret'
        break
        case '3':
            result = 'April'
        break
        case '4':
            result = 'Mei'
        break
        case '5':
            result = 'Juni'
        break
        case '6':
            result = 'Juli'
        break
        case '7':
            result = 'Agustus'
        break
        case '8':
            result = 'September'
        break
        case '9':
            result = 'Oktober'
        break
        case '10':
            result = 'November'
        break
        case '11':
            result = 'Desember'
        break
    }
    return result
}

export function changeFormatOptions(values = [], params = {key: 'key', value: 'value'}){
    let result = []
    if(values){
        if(values.length > 0){
            values.map((value, idx) => {
                result[idx] = {
                    value: value[params.key],
                    label: value[params.value],
                }
            })
        }
    }
    return result;
}

export function assessmentType(params = {}, event = {}, fieldName = 'assessment_type'){
    if(params){
        apiClient('get', 'v1/filters/assessment_types', false, params).then(response => {
            var obj = {}
            let result = response.data.data.assessment_types  
            let assessment_types = changeFormatOptions(result)
            event = setLabelSelect(assessment_types, event)

            obj['assessment_types'] = assessment_types
            obj[fieldName] = event
            this.setState(obj)
        })
    }
}

export function classes(params = {}){
    apiClient('get', 'v1/filters/classes', false, params).then(response => response.data).then(data => {
        let result = []

        if(data.data.classes.length > 0){
            data.data.classes.map((classs, key) => (
                result.push({
                    label: classs.name,
                    value: classs.id,
                })
            ))
        }

        this.setState({
            classes: result
        })
    })
}

export function grades(){
    apiClient('get', 'v1/filters/grades').then(response => response.data).then(data => {
        this.setState({
            grades: (data.data.grades.length > 0) ? data.data.grades : []
        })
    })
}

export function schoolYears(){
    apiClient('get', 'v1/filters/school_years').then(response => response.data).then(data => {
        console.log(data);

        this.setState({
            school_years: (data.data.school_years.length > 0) ? data.data.school_years : []
        })
    })
}

export function examTypes(params={}){
    const path = 'v1/filters/exam_types'
    apiClient('get', path, false, params).then(response => response.data).then(data => {
        let result = []

        if(data.data.exam_types.length > 0){
            data.data.exam_types.map((type, key) => (
                result.push({
                    label: type.value,
                    value: type.key,
                })
            ))
        }
        this.setState({examTypes: result})
    })
}

export function checkProperties(obj) {
    for (let key in obj) {
        console.log(obj[key],"here ch uti")
        if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
            return true;
        }
    }
    
    return false;
}

export function questionTypes(params={}){
    const path = 'v1/filters/problem_types'
    apiClient('get', path, false, params).then(response => response.data).then(data => {
        let result = []

        if(data.data.problem_types.length > 0){
            data.data.problem_types.map((type, key) => (
                result.push({
                    label: type.value,
                    value: type.key,
                })
            ))
        }
        this.setState({questionTypes: result})
    })
}

export function basicComps(params = {}, options = {}){
    let listOptions = options.listOptions || false
    let fieldName = options.fieldName || 'basic_comps'

    apiClient('get', 'v1/filters/basic_comps', false, params).then(response => response.data).then(data => {
        let basic_comps = data.data.basic_comps || []
        let obj = {}
        
        if((basic_comps.length > 0) && listOptions){
            const temps = basic_comps
            basic_comps = []
            
            temps.map((temp, idx) => {
                basic_comps.push({
                    value: temp.id,
                    label: temp.competency_number + ' ' + temp.content,
                })
            })
        }
        obj[fieldName] = basic_comps
        this.setState(obj)
    })
}

export function subjects(params = {}, options = {}){
    let listOptions = options.listOptions || false

    apiClient('get', 'v1/filters/subjects', false, params).then(response => response.data).then(data => {
        let subjects = data.data.subjects || []
        
        if((subjects.length > 0) && listOptions){
            const temps = subjects
            subjects = []
            
            temps.map((temp, idx) => {
                subjects.push({
                    value: temp.id,
                    label: temp.subject_name,
                })
            })
        }    
        this.setState({
            subjects: subjects,
        })
    })
}

export function attitudeAspects(params = {}, options = {}){
    let listOptions = options.listOptions || false

    apiClient('get', '/v1/filters/attitude_aspects', false, params).then(response => {
        let attitudeAspects = response.data.data.attitude_aspects || []

        if((attitudeAspects.length > 0) && listOptions){
            const temps = attitudeAspects
            attitudeAspects = []
            
            temps.map((temp, idx) => {
                attitudeAspects.push({
                    value: temp.id,
                    label: temp.alias_name,
                })
            })
        }

        this.setState({
            attitude_aspects: attitudeAspects,
        })
    })
}

export function attitudeScores(params = {}, options = {}){
    let listOptions = options.listOptions || false

    apiClient('get', '/v1/filters/attitude_scores', false, params).then(response => {
        let attitudeScores = response.data.data.attitude_scores || []

        this.setState({
            attitude_scores: attitudeScores,
        })
    })
}