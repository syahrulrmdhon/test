const SET = 'modules/attitude/SET';
const RESET = 'modules/attitude/RESET';
const LOAD = 'modules/attitude/LOAD';
const LOAD_SUCCESS = 'modules/attitude/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/attitude/LOAD_FAIL';
const LOGOUT = 'modules/attitude/LOGOUT';
const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case LOAD_SUCCESS:
            delete state.error;
            console.log(action,"my result")
            if (state.result !== action.result) {
                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result
                }
            }
            break;
        case LOAD_FAIL:
            delete state.result;
            return {
                loaded: true,
                loading: false,
                result: false,
                error: action.error
            }
        case LOGOUT:
            return { ...initialState }
        case SET:
            return { ...state, loaded: true, loading: false, result: true, data: { ...state.data, ...action.payload } }
        case RESET:
            return { ...initialState }
        default:
            return state
    }
}


export function getDataScoreAttitude(assessment_id) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/user_attitudes/participants`
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get( url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }
}


export function getDataScoreDetail(assessment_id, class_id, user_id) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/classes/${class_id}/users/${user_id}?attitudes_scores?page=2`
    console.log(url,"my url")
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get( url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }
}





export function setSavedata(payload) {
    console.log(payload, "here payload")
    return {
        type: SET,
        payload
    }
}

export function reset() {
    return {
        type: RESET
    }
}
