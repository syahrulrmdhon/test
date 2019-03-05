const school_id = localStorage.getItem("school_id")
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'School-ID': school_id,
    'App-ID': 'wt',
    'Device-ID': Math.random(),
    'Device-Type': 'browser'
}

export default {
    headers
}