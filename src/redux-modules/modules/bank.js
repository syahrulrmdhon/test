import headers from './../../utils/header'
const SET = 'modules/bank/SET'
const RESET = 'modules/bank/RESET'
const INITIALIZE = 'modules/bank/INITIALIZE'
const LOAD_BANK = 'modules/bank/LOAD_BANK'
const LOAD_BANK_SUCCESS = 'modules/bank/LOAD_BANK_SUCCESS'
const LOAD_BANK_FAIL = 'modules/bank/LOAD_BANK_FAIL'
const HANDLE_CHANGE = 'modules/bank/HANDLE_CHANGE'
const HANDLE_EVENT = 'modules/bank/HANDLE_EVENT'

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
                    selectedProblemType: null
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
                            kdChoices: x.exam_question_choices ? x.exam_question_choices : [],
                            basic_comp_id: x.basic_comp_id ? x.basic_comp_id: null
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
        case HANDLE_EVENT:
            if (action.field == 'is_selected') {
                const data = state.data.questions.entries.find(result => {
                    result.is_selected = false
                    return result.id === action.value
                })
                data.is_selected = true
                state.selectedQuestion = data
            }
            return {
                ...state,
                loaded: false,
                loading: true,
            }

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

export function getBank(problem_type, basic_comp_id) {

    let url = `v1/question_banks?problem_type=${problem_type}&basic_comp_id=${basic_comp_id}`
    if (problem_type != undefined && basic_comp_id == undefined) {
        url = `v1/question_banks?problem_type=${problem_type}`
    } else if (basic_comp_id != undefined && problem_type == undefined) {
        url = `v1/question_banks?basic_comp_id=${basic_comp_id}`
    } else if (basic_comp_id == undefined && problem_type == undefined) {
        url = `v1/question_banks`
    } else if (basic_comp_id != undefined && problem_type != undefined) {
        url = `v1/question_banks?problem_type=${problem_type}&basic_comp_id=${basic_comp_id}`
    }

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

export function handleEvent(value, field) {
    return {
        type: HANDLE_EVENT,
        value: value,
        field: field
    }
}