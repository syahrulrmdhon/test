const SET = 'modules/rapor/SET'
const RESET = 'modules/rapor/RESET'
const LOAD = 'modules/rapor/LOAD'
const LOAD_SUCCESS = 'modules/rapor/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/rapor/LOAD_FAIL'
const HANDLE_CHANGE = 'modules/rapor/HANDLE_CHANGE'
const INITIALIZE = 'modules/rapor/INITIALIZE'

const initialState = null

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case LOAD:
        return {
            ...state,
            loading:true
        }

        case INITIALIZE:
        return {
            ...state,
            loaded: true,
            loading: false,
            ...{
                selectedStatus: null,
                selectedSemester: null
            }
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
            loading: false
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