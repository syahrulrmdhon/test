const school_id = localStorage.getItem("school_id")
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'School-ID': school_id,
    'App-ID': localStorage.getItem('App-ID'),
    'Device-ID': localStorage.getItem('Device-ID'),
    'Device-Type': localStorage.getItem('Device-Type')
}

export default {
    headers
}