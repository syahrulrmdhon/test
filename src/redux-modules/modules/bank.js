import headers from './../../utils/header'
const SET = 'modules/bank/SET'
const RESET = 'modules/bank/RESET'
const INITIALIZE = 'modules/bank/INITIALIZE'
const LOAD_BANK = 'modules/bank/LOAD_NO_QUESTIONS'
const LOAD_BANK_SUCCESS = 'modules/bank/LOAD_NO_QUESTIONS_SUCCESS'
const LOAD_BANK_FAIL = 'modules/bank/LOAD_NO_QUESTIONS_FAIL'
const HANDLE_CHANGE = 'modules/bank/HANDLE_CHANGE'

const inititalState = null

export default function reducer(state = inititalState, action) {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                loaded: true,
                loading: false,
                ... {
                    selectedBasicComp: null,
                    selectedType: null
                }
            }
            break
        case LOAD_BANK:
            return {
                ...state,
                loading: true
            }
            break
        case LOAD_BANK_SUCCESS:
            delete state.error
            if (state.result !== action.result) {
                if (action.result.data.questions) {
                    action.result.data.questions['data_entries'] = []
                    action.result.data.questions.entries.map((x) => {
                        action.result.data.questions['data_entries'].push({
                            idx: x.id ? x.id : null,
                            no: x.qn_number ? x.qn_number : null,
                            question: x.question ? x.question : '',
                            kdNumber: x.comp_number ? x.comp_number : null,
                            kdContent: x.content ? x.content : '',
                            kdChoices: x.exam_question_choices ? x.exam_question_choices : []
                        })
                    })
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
        default:
            return state
    }
}

const schoolId = localStorage.getItem('school_id')
const token = localStorage.getItem('token')
const category = 'knowledge'

export function getBank() {
    const url = `v1/question_banks`

    return {
        types: [LOAD_BANK, LOAD_BANK_SUCCESS, LOAD_BANK_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}

export function handleChange(e, field_name) {
    return {
        type: HANDLE_CHANGE,
        value: e,
        fieldName: field_name
    }
}