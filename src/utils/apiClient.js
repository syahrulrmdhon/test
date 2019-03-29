import Axios from 'axios'
import history from './../views/global/browser-history';

export const apiClient = (method, url, request, params = {}) => {
    const baseUrl = `${process.env.API_URL}`
    const token = localStorage.getItem('token')
    const regist_token = localStorage.getItem('regist_token')
    const schoolId = localStorage.getItem("school_id")
    let headers = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] =  token
        headers['App-ID'] = 'wt'
        headers['Device-ID'] = localStorage.getItem('Device-ID')
        headers['Device-Type'] = 'browser'
    } else if (regist_token) {
        headers['Authorization'] = 'Bearer ' + regist_token
        headers['App-ID'] = 'wt'
        headers['Device-ID'] = localStorage.getItem('Device-ID')
        headers['Device-Type'] = 'browser'

    }else{
        headers['App-ID'] = 'wt'
        headers['Device-ID'] = localStorage.getItem('Device-ID')
        headers['Device-Type'] = 'browser'
    }

    if (schoolId) {
        headers['School-ID'] = schoolId
    }

    function errorHandling(error) {
        if (process.env.NODE_ENV == 'development') {
            if (!error.response) {
                history.push('/no-connection');
            } else if (error.response.status === 500 ) {
                history.push('/internal-server-error');
                if (!console) {
                    console = {};
                }
                let logger = document.getElementById('log');
                console.log = function (message) {
                    if (typeof message == 'object') {
                        logger.innerHTML += JSON.stringify(message, undefined, 2) + '<br />';
                    } else {
                        logger.innerHTML += message + '<br />';
                    }
                }
                console.log(error.response.config)
            }
        } else {
            if (!error.response) {
                history.push('/no-connection');
            }
        }
    }

    switch (method) {
        case 'get':
            return Axios.get(baseUrl + url, { headers: headers, params: params }).catch(
                function (error) {
                    errorHandling(error)
                });
        case 'post':
            return Axios.post(baseUrl + url, request, { headers: headers, params: params }).catch(
                function (error) {
                    errorHandling(error)
                });
        case 'put':
            return Axios({ url: baseUrl + url, headers: headers, method: 'PUT', data: request }).catch(
                function (error) {
                    errorHandling(error)
                });
        case 'delete':
            return Axios({ url: baseUrl + url, headers: headers, method: 'DELETE', data: request}).catch(
                function (error) {
                    errorHandling(error)
                });
    }
}
