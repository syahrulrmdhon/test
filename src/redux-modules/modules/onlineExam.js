import headers from './../../utils/header'
// import {removeField} from './../../utils/common'
const LOAD = 'modules/onlineExam/LOAD'
const LOAD_FAIL = 'modules/onlineExam/LOAD_FAIL'
const BUILD_DATA = 'modules/onlineExam/BUILD_DATA'
const HANDLE_EVENT = 'modules/onlineExam/HANDLE_EVENT'
const HANDLE_SWITCH = 'modules/onlineExam/HANDLE_SWITCH'
const ADD_QUESTION = 'modules/onlineExam/ADD_QUESTION'
const REMOVE_QUESTION = 'modules/onlineExam/REMOVE_QUESTION'
const HANDLE_EVENT_PROBLEM_TYPE = 'modules/onlineExam/HANDLE_EVENT_PROBLEM_TYPE'

const initialState = {
    exam: null,
    switch: false,
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
                    kkm: '',
                    is_assigned_exam: true,
                    is_duplication: false,
                    exam_problem_types_attributes: [{ problem_type: '', question_count: null }],
                }
            }
            return {
                loaded: true,
                loading: false,
                ...state
            }
        case HANDLE_SWITCH:
            state.switch = action.value
            state.exam.is_duplication = action.value
            if (state.exam.is_duplication) {
                delete state.exam.exam_problem_types_attributes
                state.exam.selectedFullSemester = null
                state.exam.duplicate_exam_id = null
            } else {
                delete state.exam.selectedFullSemester
                delete state.exam.duplicate_exam_id
                state.exam.exam_problem_types_attributes = [
                    {
                        problem_type: '',
                        question_count: null
                    }
                ]
            }
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case HANDLE_EVENT:
            state[action.modelName][action.fieldName] = action.value || ''

            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case HANDLE_EVENT_PROBLEM_TYPE:
            state[action.modelName][action.modelSubName][action.idx][action.fieldName] = action.value || ''

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

export function handleEventProblemtype(value, modelName, modelSubName, fieldName, idx) {
    return {
        type: HANDLE_EVENT_PROBLEM_TYPE,
        value: value,
        modelName: modelName,
        modelSubName: modelSubName,
        fieldName: fieldName,
        idx: idx,
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

export function removeField(values, idx) {
    let removed = values.splice(idx, 1)
    return removed
}

export function handleSwitch(value) {
    return {
        type: HANDLE_SWITCH,
        value: value,
    }
}