import { apiClient } from './apiClient'

export function classes(){
    apiClient('get', 'v1/filters/classes').then(response => response.data).then(data => {
        this.setState({
            classes: (data.data.classes.length > 0) ? data.data.classes : []
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