import headers from './../../utils/header'
const LOAD = 'modules/onlineExam/LOAD'
const LOAD_FAIL = 'modules/onlineExam/LOAD_FAIL'
const BUILD_DATA = 'modules/onlineExam/BUILD_DATA'
const HANDLE_EVENT = 'modules/onlineExam/HANDLE_EVENT'
const ADD_QUESTION = 'modules/onlineExam/ADD_QUESTION'
const REMOVE_QUESTION = 'modules/onlineExam/REMOVE_QUESTION'

const initialState = {
    exam: null,
}

export function removeField(values, idx) {
    let removed = values.splice(idx, 1)
    return removed
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case LOAD_FAIL:
            delete state.result;
            return {
                loaded: true,
                loading: false,
                result: false,
                error: action.error
            }
        case BUILD_DATA:
            if (state.exam == undefined) {
                state.exam = {
                    name: '',
                    description: '',
                    exam_type: '',
                    kkm: null,
                    is_assigned_exam: true,
                    exam_problem_types_attributes: [{ problem_type: '', question_count: null }]
                }
            }
            return {
                loaded: true,
                loading: false,
                ...state
            }
        case HANDLE_EVENT:
            state[action.modelName][action.fieldName] = action.value || []
            if (action.relates.length > 0) {
                action.relates.map((key, idx) => {
                    state[key] = ''
                })
            }

            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case ADD_QUESTION:
            state.exam.exam_problem_types_attributes = state.exam.exam_problem_types_attributes.concat([{ problem_type: '', question_count: null }])
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case REMOVE_QUESTION:
            state.exam.exam_problem_types_attributes = removeField(state.exam.exam_problem_types_attributes, action.idx)
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        default:
            return state
    }
}

export function buildObject() {
    return {
        type: BUILD_DATA,
    }
}

export function handleEvent(value, modelName, fieldName, relates = []) {
    return {
        type: HANDLE_EVENT,
        value: value,
        modelName: modelName,
        fieldName: fieldName,
        relates: relates
    }
}

export function addQuestion() {
    return {
        type: ADD_QUESTION
    }
}

export function removeQuestion(idx) {
    return {
        type: REMOVE_QUESTION,
        idx: idx,
    }
}