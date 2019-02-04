import Axios from 'axios'

export const apiClient = (method, url, request, params = {}) => {
    const baseUrl = `${process.env.API_URL}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'School-ID': schoolId
    }

    switch(method){
        case 'get':
            return Axios.get(baseUrl + url, {headers: headers, params: params})
        case 'post':
            return Axios.post(baseUrl + url, request, {headers: headers, params: params})
        case 'put':
            return Axios({ url: baseUrl + url, headers: headers, method: 'PUT', data: request })
        case 'delete': 
            return Axios({ url: baseUrl + url, headers: headers, method: 'DELETE' })
    }
}
