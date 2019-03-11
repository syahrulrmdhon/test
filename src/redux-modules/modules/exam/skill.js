import {removeField} from './../../../utils/common'
import headers from './../../../utils/header'
const SET = 'modules/exam/skill/SET';
const RESET = 'modules/exam/skill/RESET';
const LOAD = 'modules/exam/skill/LOAD';
const LOAD_SUCCESS = 'modules/exam/skill/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/exam/skill/LOAD_FAIL';
const ADD_WORK_STEP = 'modules/exam/skill/ADD_WORK_STEP';
const REMOVE_WORK_STEP = 'modules/exam/skill/REMOVE_WORK_STEP';
const HANDLE_EVENT = 'modules/exam/skill/HANDLE_EVENT';
const HANDLE_WORK_STEP = 'modules/exam/skill/HANDLE_WORK_STEP';
const LOAD_COMPONENT = 'modules/exam/skill/LOAD_COMPONENT';
const ADD_INDICATOR = 'modules/exam/skill/ADD_INDICATOR';
const REMOVE_INDICATOR = 'modules/exam/skill/REMOVE_INDICATOR';
const HANDLE_PROBLEM_SET = 'modules/exam/skill/HANDLE_PROBLEM_SET';

const initialState = {
    exam: {},
    problem_types: [],
    assessment_basic_comps: [{}],
};

const school_id = localStorage.getItem("school_id")


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_PROBLEM_SET:
            state.problem_type_sets[action.keyValue][action.idx][action.fieldName] = action.value
            
            if(action.fieldName == 'basic_comp_id'){
                if(state.assessment_basic_comps && state.assessment_basic_comps.length > 0){
                    let assessment_basic = state.assessment_basic_comps.find((element) => { return element.id == action.value })
                    if(assessment_basic){
                        state.problem_type_sets[action.keyValue][action.idx]['school_subject_id'] = assessment_basic.school_subject_id
                    }
                }
            }
        
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case ADD_INDICATOR:
            const count = state.problem_type_sets[action.key_value] ? state.problem_type_sets[action.key_value].length : 0 
            state.problem_type_sets[action.key_value] = state.problem_type_sets[action.key_value].concat([{
                qn_number: count + 1,
                weight: null,
                max_score: 100,
                problem_type: action.key_value,
                question: null,
                school_subject_id: null,
                basic_comp_id: null,
            }])
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case REMOVE_INDICATOR:
            state.problem_type_sets[action.key_value] = removeField(state.problem_type_sets[action.key_value], action.idx)
            console.log("here",  state.problem_type_sets)
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case LOAD_COMPONENT: 
            delete state.error;
            if (state.result !== action.result) {
                if(action.result.data.problem_types){
                    action.result.data.problem_types.map((value, key) => {
                        if(action.result.data.problem_type_sets[value] == undefined){
                            action.result.data.problem_type_sets[value] = [{
                                qn_number: 1,
                                weight: null,
                                max_score: 100,
                                problem_type: value,
                                question: null,
                                school_subject_id: null,
                                basic_comp_id: null,
                            }]
                        }
                    })
                }

                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result.data
                }
            }
            break; 
        return false
        case HANDLE_WORK_STEP:
            state.problem_types[action.idx] = action.value
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case HANDLE_EVENT:
            state.exam[action.fieldName] = action.value
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case REMOVE_WORK_STEP:
            state.problem_types = removeField(state.problem_types, action.idx)
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case ADD_WORK_STEP:
            state.problem_types = state.problem_types.concat([''])
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case LOAD_SUCCESS:
            delete state.error;
            if (state.result !== action.result) {
                if(action.result.data.problem_types.length == 0){
                    action.result.data['problem_types'] = [
                        '',
                    ]
                }

                return {
                    // ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result.data
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
        case SET:
            return { ...state, loaded: true, loading: false, result: true, data: { ...state.data, ...action.payload } }
        case RESET:
            return { ...initialState }
        default:
            return state
    }
}

export function getNew(assessment_id, exam_id = false){
    let params = {}
    let url;

    if(exam_id){
        url = `/v1/assessments/${assessment_id}/exams/${exam_id}/edit?step=BasicForm`
    } else {
        url = `/v1/assessments/${assessment_id}/exams/new?step=BasicForm&category=skill`
    }

    return{
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}

export function addWorkStep(){
    return{
        type: ADD_WORK_STEP,
    }
}

export function removeWorkStep(idx){
    return{
        type: REMOVE_WORK_STEP,
        idx: idx,
    }
}

export function handleEvent(value, fieldName){
    return {
        type: HANDLE_EVENT,
        value: value,
        fieldName: fieldName,
    }
}

export function handleWorkStep(value, idx){
    return{
        type: HANDLE_WORK_STEP,
        value: value,
        idx: idx,
    }
}

export function getComponent(assessment_id, exam_id = false){
    let params = {}
    let url;

    if(exam_id){
        url = `/v1/assessments/${assessment_id}/exams/${exam_id}/edit?step=QuestionForm`
    } else {
        url = `/v1/assessments/${assessment_id}/exams/new?step=QuestionForm&category=skill`
    }


    return{
        types: [LOAD, LOAD_COMPONENT, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}

export function addIndicator(key_value){
    return {
        type: ADD_INDICATOR,
        key_value: key_value,
    }
}

export function removeIndicator(key_value, idx){
    return {
        type: REMOVE_INDICATOR,
        key_value: key_value,
        idx: idx,
    }
}

export function handleProblemSet(value, fieldName, keyValue, idx){
    console.log(value,"value")
    return {
        type: HANDLE_PROBLEM_SET,
        value: value,
        fieldName: fieldName,
        keyValue: keyValue,
        idx: idx,
    }
}