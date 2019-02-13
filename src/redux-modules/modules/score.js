import { classes } from "../../utils/common";

const SET = 'modules/score/SET';
const RESET = 'modules/score/RESET';
const LOAD = 'modules/score/LOAD';
const LOAD_SUCCESS = 'modules/score/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/score/LOAD_FAIL';
const LOGOUT = 'modules/score/LOGOUT';

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

export function getParticipant(exam, classess, assess) {
    console.log(exam, classess, assess,"here set data")
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `/v1/assessments/${assess}/exams/${exam}/exam_classes/${classess}/participants`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId

            }
        })
    }
}

export function getParticipantsResult(){
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `/v1/assessments/6ae41268-d737-4a87-bb54-1a9cfd1d69f8/exams/b4aa7bda-f96d-4665-8dc3-fe263ed670ed/exam_classes/1a5e496b-ffc4-445f-93b4-ef324e80e31c/participant_results`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId

            }
        })
    }
}

export function set(payload) {
    console.log(payload,"here payload")
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