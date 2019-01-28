import { apiClient } from './apiClient'
import React, { Component } from 'react'

export function seeMore(value, s_count = 50){
    const count = value.length
    
    if(s_count < count){
        value = value.substring(0, s_count);
        value += '...'
    }
    value = <span className="profile" title={value}>{value}</span>
    return value
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

export function classes(){
    apiClient('get', 'v1/filters/classes').then(response => response.data).then(data => {
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