import Axios from 'axios'

export const apiClient = (method, url, request) => {
    const baseUrl = `${process.env.API_URL}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'School-ID': schoolId
    }

    if (method === 'get') {
        return Axios.get(baseUrl + url, {headers: headers})
    }
    else if (method === 'post') {
        return Axios.post(baseUrl + url, request, {headers: headers})
    }
}
