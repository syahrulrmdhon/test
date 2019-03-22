import headers from './../../utils/header'
const SET = 'modules/bank/SET'
const RESET = 'modules/bank/RESET'
const LOAD_BANK = 'modules/bank/LOAD_NO_QUESTIONS'
const LOAD_BANK_SUCCESS = 'modules/bank/LOAD_NO_QUESTIONS_SUCCESS'
const LOAD_BANK_FAIL = 'modules/bank/LOAD_NO_QUESTIONS_FAIL'
const HANDLE_CHANGE = 'modules/bank/HANDLE_CHANGE'

const inititalState = null

export default function reducer(state = inititalState, action) {
    switch (action.type) {
        case LOAD_BANK:
            return {
                ...state,
                loading: true
            }
            break
        case LOAD_BANK_SUCCESS:
            delete state.error
            if(state.result !== action.result) {
                console.log('load bank', action.result.data)
                if(action.result.data.questions) {
                    action.result.data.questions['bank_data'] = {}
                    action.result.data.questions['total_entries'] = ''
                    
                    action.result.data.questions
                }
            }
            return {
                ...state,
                loaded: true,
                loading: false,
                ...action.result
            }
            break
        case LOAD_BANK_FAIL:
            return {
                loaded: true,
                loading: false,
                error: action.error        
            }
            break
        case HANDLE_CHANGE:
            console.log('handle change bank', action)
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
        default:
            return state
    }
}

const schoolId = localStorage.getItem('school_id')
const token = localStorage.getItem('token')

export function getBank() {
    const url = 'v1/question_banks'

    return {
        types: [LOAD_BANK, LOAD_BANK_SUCCESS, LOAD_BANK_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}