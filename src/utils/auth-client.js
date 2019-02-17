import axios from 'axios'

export const AuthClient = (method, url, request, params = {}) => {
    const baseUrl = `${process.env.API_URL}`
    const token_auth = localStorage.getItem('token_auth')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token_auth
    }

    console.log(headers,"my header")

    switch (method) {
        case 'get':
            return axios.get(baseUrl + url, { headers: headers, params: params })
        case 'post':
            return axios.post(baseUrl + url, request, { headers: headers, params: params })
        case 'put':
            return axios({ url: baseUrl + url, headers: headers, method: 'PUT', data: request })
        case 'delete':
            return axios({ url: baseUrl + url, headers: headers, method: 'DELETE' })
    }
}
