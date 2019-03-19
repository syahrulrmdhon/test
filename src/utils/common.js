import { apiClient } from './apiClient'
import React, { Component } from 'react'

export function removeField(values, idx) {
    let removed = values.splice(idx, 1)
    return values
}

export function setLabelSelect(lists, values = {}) {
    let label = ''
    lists.map((list, idx) => {
        let key = list.value
        let set_value = !!(values) ? values.value : ''

        if (key == set_value) {
            label = list.label;
        }
    })

    if (label != '') {
        values.label = label
        return values
    } else {
        return false
    }
}

export function seeMore(value, s_count = 50, options = {}) {
    const count = value.length
    const { expanded, see_more, callBack } = options
    let seeMore;

    if (s_count < count) {
        if (expanded) {
            value += '...'
            seeMore = 'ciutkan'
        } else {
            value = value.substring(0, s_count);
            value += '...'

            if (see_more) {
                seeMore = 'lihat lebih lanjut'
            }
        }
    }
    value = <span className="profile" title={value}>{value}<span className="cgreen pointer" onClick={callBack}>{seeMore}</span></span>
    return value
}

export function setErrorRuby(data = {}) {
    let result = {}
    let errors = data.errors || []

    if (typeof errors == 'object') {
        for (var error in errors) {
            if (errors.hasOwnProperty(error)) {
                result[error] = errors[error]
            }
        }
    }
    return result
}

export function setError(data = []) {
    let result = {}
    let errors = data.errors || []

    if (errors.length > 0) {
        errors.map((error, idx) => {
            result[error.field_ref] = error.description
        });
    }
    return result
}

export function getUser(redirect = false) {
    const url = 'v1/users'
    apiClient('get', url).then(res => {
        localStorage.setItem("user_id", res.data.data.user.id)
        console.log(res.data.data, "data")
        if (res.data.data.homeroom_class != null) {
            localStorage.setItem("class_id", res.data.data.homeroom_class.id)
        }

        // attribute full
        localStorage.setItem("user", JSON.stringify(res.data.data.user))
        localStorage.setItem("school", JSON.stringify(res.data.data.school))
        localStorage.setItem("current_period", JSON.stringify(res.data.data.current_period))
        localStorage.setItem("homeroom_class", JSON.stringify(res.data.data.homeroom_class))

        // return false
        if (redirect) {
            window.location.href = "/home";
        }
    })
}

export function getDate(format = 'case-1', date = new Date) {
    let result = ''

    console.log()

    if (!!(date)) {
        let dt = date.getDate()
        let month = date.getMonth()
        let year = date.getUTCFullYear()

        switch (format) {
            case 'case-1': // 25 Novermber 2018
                month = getMonthIndo(month)
                result = dt + ' ' + month + ' ' + year
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
                result = new Intl.DateTimeFormat('sq-AL', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
                break
            case 'case-5': // 2019-01-20 00:00
                const tempDate = getDate('case-4', date)
                const tempTime = getDate('case-3', date)

                result = `${tempDate} ${tempTime}`
                break
            case 'case-6': //31-12-2019
                result = new Intl.DateTimeFormat('id-Id', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
                break
        }
    }
    return result
}

export function getDayIndo(day = false) {
    let result = ''
    switch (day.toString()) {
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

export function getMonthIndo(month = false) {
    let result = ''
    switch (month.toString()) {
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

export function changeFormatOptions(values = [], params = { key: 'key', value: 'value' }) {
    let result = []
    if (values) {
        if (values.length > 0) {
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

export function assessmentType(params = {}, event = {}, fieldName = 'assessment_type') {
    if (params) {
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

export function classes(params = {}) {
    apiClient('get', 'v1/filters/classes', false, params).then(response => response.data).then(data => {
        let result = []

        if (data.data.classes.length > 0) {
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

export function grades() {
    apiClient('get', 'v1/filters/grades').then(response => response.data).then(data => {
        let grades = data.data.grades || []
        if(grades.length > 0) {
            const temps = grades

            grades = []

            temps.map((temp, idx)=>{
                grades.push({
                    value: temp.id,
                    label: temp.class_year
                })
            })
        }
        this.setState({
            grades: grades
        })
    })
}

export function schoolYears(params = {}, options = {}) {
    let listOptions = options.listOptions || false
    apiClient('get', 'v1/filters/school_years', false, params).then(response => response.data).then(data => {
        let school_years = data.data.school_years || []
        if ((school_years.length > 0) && listOptions) {
            const temps = school_years

            school_years = []

            temps.map((temp, idx) => {
                school_years.push({
                    value: temp.id,
                    label: temp.period_name
                })
            })
        }
        this.setState({
            school_years: school_years
        })
    })
}

export function examTypes(params = {}) {
    const path = 'v1/filters/exam_types'
    apiClient('get', path, false, params).then(response => response.data).then(data => {
        let result = []

        if (data.data.exam_types.length > 0) {
            data.data.exam_types.map((type, key) => (
                result.push({
                    label: type.value,
                    value: type.key,
                })
            ))
        }
        this.setState({ examTypes: result })
    })
}

export function checkProperties(obj) {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
            return true;
        }
    }

    return false;
}

export function questionTypes(params = {}) {
    const path = 'v1/filters/problem_types'
    apiClient('get', path, false, params).then(response => response.data).then(data => {
        let result = []

        if (data.data.problem_types.length > 0) {
            data.data.problem_types.map((type, key) => (
                result.push({
                    label: type.value,
                    value: type.key,
                })
            ))
        }
        this.setState({ questionTypes: result })
    })
}

export function basicComps(params = {}, options = {}) {
    let listOptions = options.listOptions || false
    let disabled_data = options.disabled_data || []
    let fieldName = options.fieldName || 'basic_comps'

    apiClient('get', 'v1/filters/basic_comps', false, params).then(response => response.data).then(data => {
        let basic_comps = data.data.basic_comps || []
        let obj = {}
        let disableds = {}
        if (disabled_data.length > 0) {
            disabled_data.map((disabled, idx) => {
                disableds[disabled.basic_comp_id] = disabled.basic_comp_id
            })
        }

        if ((basic_comps.length > 0) && listOptions) {
            const temps = basic_comps
            basic_comps = []

            temps.map((temp, idx) => {
                let check_disabled = false

                if (disableds[temp.id] !== undefined) {
                    check_disabled = true
                }

                basic_comps.push({
                    value: temp.id,
                    label: temp.competency_number + ' ' + temp.content,
                    isDisabled: check_disabled,
                })
            })
        }
        obj[fieldName] = basic_comps
        this.setState(obj)
    })
}
export function subjects(params = {}, options = {}) {
    let listOptions = options.listOptions || false
    apiClient('get', 'v1/filters/subjects', false, params).then(response => response.data).then(data => {
        let subjects = data.data.subjects || []
        if ((subjects.length > 0) && listOptions) {
            const temps = subjects
            subjects = []

            temps.map((temp, idx) => {
                subjects.push({
                    value: temp.id,
                    label: temp.subject_name + ' (' + temp.class_year + ')',
                })
            })
        }
        this.setState({
            subjects: subjects,
        })
    })
}

export function attitudeAspects(params = {}, options = {}) {
    let listOptions = options.listOptions || false

    apiClient('get', '/v1/filters/attitude_aspects', false, params).then(response => {
        let attitudeAspects = response.data.data.attitude_aspects || []

        if ((attitudeAspects.length > 0) && listOptions) {
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

export function attitudeScores(params = {}, options = {}) {
    let listOptions = options.listOptions || false

    apiClient('get', '/v1/filters/attitude_scores', false, params).then(response => {
        let attitudeScores = response.data.data.attitude_scores || []

        this.setState({
            attitude_scores: attitudeScores,
        })
    })
}


export function region(params = {}, options = {}) {
    let regionOptions = options.regionOptions || false

    apiClient('get', 'v1/filters/regions', false, params).then(response => {
        let regions = response.data.data.regions || []

        if ((regions.length > 0) && regionOptions) {
            const temps = regions
            regions = []

            temps.map((temp, idx) => {
                regions.push({
                    value: temp.id,
                    label: temp.name,
                })
            })
        }

        this.setState({
            regionOptions: regions,
        })
    })
}

export function cities(params = {}, options = {}) {
    let cityOpt = options.cityDefaultOpt || false

    apiClient('get', 'v1/filters/cities', false, params).then(response => {
        let city = response.data.data.cities || []

        if ((city.length > 0) && cityOpt) {
            const temps = city
            city = []

            temps.map((temp, idx) => {
                city.push({
                    value: temp.id,
                    label: temp.name,
                })
            })
        }

        console.log(city, "list")
        this.setState({
            cityDefaultOpt: city,
        })
    })
}

export function getSemesterList(params = {}, options = {}) {

    apiClient('get', 'v1/filters/semesters', false, params).then(res => {
        let data = res.data.data.semesters || []
        let result = []
        if (data.length > 0) {

            data.map((x) => {
                result.push({
                    value: x.id,
                    label: x.period_name
                })
            })
        }
        this.setState({
            listSemester: result
        })
    })
}

export function getStatusList(params = {}, options = {}) {

    apiClient('get', 'v1/filters/risk_status', false, false).then(res => {
        let status = []
        for (var i in res.data.data) {
            const datum = res.data.data[i]
            datum.map(function (data, i) {
                status.push({ value: data.key, label: data.value })
            })
        }
        this.setState({
            listStatus: status
        })
    })
}

export function getClassName() {
    const classList = localStorage.getItem('homeroom_class')
    const classes = JSON.parse(classList)
    const nameClass = classes.name
    this.setState({
        nameClass: nameClass
    })
}