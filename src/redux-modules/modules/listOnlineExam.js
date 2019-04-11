const SET = 'modules/listOnlineExam/SET'
const RESET = 'modules/listOnlineExam/RESET'
const LOAD = 'modules/listOnlineExam/LOAD'
const LOAD_SUCCESS = 'modules/listOnlineExam/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/listOnlineExam/LOAD_FAIL'
const HANDLE_CHANGE = 'modules/listOnlineExam/HANDLE_CHANGE'
const INITIALIZE = 'modules/listOnlineExam/INITIALIZE'

const initialState = null

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            }

        case INITIALIZE:
            return {
                ...state,
                loaded: true,
                loading: false,
                ...{
                    selectedType: null,
                    selectedGrade: null,
                    schoolYear: {},
                },
            }

        case LOAD_SUCCESS:
            delete state.error
            return {
                ...state,
                loaded: true,
                loading: false,
                ...action.state
            }

        case HANDLE_CHANGE:
            state[action.fieldName] = action.value
            return {
                ...state,
                loaded: true,
                loading: false,
            }

        case LOAD_FAIL:
            return {
                loaded: true,
                loading: false,
                error: action.error
            }

        case SET:
            return {
                ...state,
                ...action.payload
            }

        case RESET:

            return {
                ...initialState
            }

        default:
            return state
    }
}

export function initial() {
    return {
        type: INITIALIZE
    }
}

export function handleChange(e, field_name) {
    return {
        type: HANDLE_CHANGE,
        value: e,
        fieldName: field_name
    }
}