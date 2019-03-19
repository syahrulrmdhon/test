const SET = 'modules/listOnlineExam/SET'
const RESET = 'modules/listOnlineExam/RESET'
const LOAD = 'modules/listOnlineExam/LOAD'
const LOAD_SUCCESS = 'modules/listOnlineExam/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/listOnlineExam/LOAD_FAIL'
const HANDLE_CHANGE = 'modules/listOnlineExam/HANDLE_CHANGE'
const INITIALIZE = 'modules/listOnlineExam/INITIALIZE'

const initialState = null

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case LOAD:
        return {
            ...state,
            loading:true
        }
        break

        case INITIALIZE:
        return {
            ...state,
            loaded: true,
            loading: false,
            ...{
                selectedYear: null,
                selectedSemester: null,
                selectedType: null,
                selectedGrade: null
            }
        }
        break

        case LOAD_SUCCESS:
        delete state.error

        return {
            ...state,
            loaded: true,
            loading: false,
            ...action.state
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

        case LOAD_FAIL:
        
        return {
            loaded: true,
            loading: false,
            error: action.error
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
            ...initialState
        }

        default:
        return state
    }
}

const schoolID = localStorage.getItem('school_id')
const token = localStorage.getItem('token')

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