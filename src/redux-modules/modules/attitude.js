import headers from './../../utils/header'


const SET = 'modules/attitude/SET';
const RESET = 'modules/attitude/RESET';
const LOAD = 'modules/attitude/LOAD';
const LOAD_SUCCESS = 'modules/attitude/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/attitude/LOAD_FAIL';
const LOGOUT = 'modules/attitude/LOGOUT';
const HANDLE_FORM_TEXT = 'modules/attitude/HANDLE_FORM_TEXT'
const LOAD_FORM_DATA = 'modules/attitude/LOAD_FORM_DATA'
const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOAD_FORM_DATA:
            delete state.error
            if (state.result !== action.result) {
                if (action.result.data.user_attitude) {
                    action.result.data['data_form'] = {}
                    action.result.data['data_form'] = {
                        score: action.result.data.user_attitude.score,
                        description: action.result.data.user_attitude.description
                    }
                }
                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result
                }
            }
            break;
        case HANDLE_FORM_TEXT:
            console.log(action, "actin")
            state.data.data_form[action.field] = action.value
            console.log(state.data.data_form, "actin")
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case LOAD:
            return {
                ...state,
                loaded: false,
                loading: true,
            }

        case LOAD_SUCCESS:
            delete state.error;
            console.log(action, "my result")
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
            return { ...state, loaded: true, loading: false, result: true, data: { ...state, ...action } }
        case RESET:
            return { ...initialState }
        default: {
            return { ...state }
        }
    }
}

export function handlingInputText(e, field_name) {
    console.log(e.target.value, "value")
    return {
        type: HANDLE_FORM_TEXT,
        value: e.target.value,
        field: field_name
    }
}

export function handlingInputSelect(e, field_name) {
    return {
        type: HANDLE_FORM_TEXT,
        value: e.value,
        field: field_name
    }
}


export function getDataScoreAttitude(assessment_id) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/user_attitudes/participants`
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url,headers)
    }
}


export function getDataScoreDetail(assessment_id, class_id, user_id,tipe) {
    console.log(tipe,"hehe")
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/classes/${class_id}/users/${user_id}?page=1&score=${tipe}`
    console.log(url, "my url")
    return {
        types: [LOAD, LOAD_FORM_DATA, LOAD_FAIL],
        promise: client => client.get(url,headers)
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
