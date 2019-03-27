import headers from './../../utils/header'
const SET = 'modules/onlineExam/SET'
const RESET = 'modules/onlineExam/RESET'
const INITIALIZE = 'modules/onlineExam/INITIALIZE'
const HANDLE_CHANGE = 'modules/onlineExam/HANDLE_CHANGE'
const LOAD = 'modules/onlineExam/LOAD'
const LOAD_SUCCESS = 'modules/onlineExam/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/onlineExam/LOAD_FAIL'

const initialState = null

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                loaded: true,
                loading: false,
                ... {
                    selectedProblemType: null
                }
            }
            break
        case LOAD:
            return {
                ...state,
                loading: true
            }
            break
        case LOAD_SUCCESS:
            delete state.error
            return {
                ...state,
                loaded: true,
                loading: false,
                ...action.result
            }
            break
        case LOAD_FAIL:
            return {
                loaded: true,
                loading: false,
                error: action.error
            }
            break
        case HANDLE_CHANGE:
            state[action.fieldName] = action.value
            return {
                ...state,
                loaded: true,
                loading: false
            }
            break
        case SET:
            return {
                ...state,
                ...action.payload
            }
            break
        case RESET:
            return {
                ...inititalState
            }
            break
    }
}

export function loadData() {
    return {
        type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    }
}
export function handleChange(e, field_name) {

    return {
        type: HANDLE_CHANGE,
        value: e,
        fieldName: field_name
    }
}