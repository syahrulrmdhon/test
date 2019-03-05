import Axios from 'axios'

export const apiClient = (method, url, request, params = {}) => {
    const baseUrl = `${process.env.API_URL}`
    const token = localStorage.getItem('token')
    const regist_token = localStorage.getItem('regist_token')
    const schoolId = localStorage.getItem("school_id")

    let headers = {
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
        headers['App-ID'] = 'wt'
        headers['Device-ID'] = Math.random()
        headers['Device-Type'] = 'browser'
    } else if (regist_token) {
        headers['Authorization'] = 'Bearer ' + regist_token
        headers['App-ID'] = 'wt'
        headers['Device-ID'] = Math.random()
        headers['Device-Type'] = 'browse'

    }

    if (schoolId) {
        headers['School-ID'] = schoolId
    }
    console.log(headers,"my header")
    switch (method) {
        case 'get':
            return Axios.get(baseUrl + url, { headers: headers, params: params })
        case 'post':
            return Axios.post(baseUrl + url, request, { headers: headers, params: params })
        case 'put':
            return Axios({ url: baseUrl + url, headers: headers, method: 'PUT', data: request })
        case 'delete':
            return Axios({ url: baseUrl + url, headers: headers, method: 'DELETE' })
    }
}
