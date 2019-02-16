import {removeField} from './../../utils/common'

const LOAD = 'modules/assessment/LOAD';
const LOAD_SUCCESS = 'modules/assessment/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/assessment/LOAD_FAIL';
const GET_NEW = 'modules/assessment/GET_NEW';
const ADD_CLASS = 'modules/assessment/ADD_CLASS';
const REMOVE_CLASS = 'modules/assessment/REMOVE_CLASS';
const HANDLE_EVENT = 'modules/assessment/HANDLE_EVENT';
const HANDLE_EVENT_CLASS = 'modules/assessment/HANDLE_EVENT_CLASS';
const ADD_SUBJECT = 'modules/assessment/ADD_SUBJECT';
const REMOVE_SUBJECT = 'modules/assessment/REMOVE_SUBJECT';
const ADD_KD = 'modules/assessment/ADD_KD';
const HANDLE_KD = 'modules/assessment/HANDLE_KD';
const HANDLE_SUBJECT = 'modules/assessment/HANDLE_SUBJECT';

const initialState = {
    assessment: null,
    assessment_classes_attributes: null,
};

const school_id = localStorage.getItem("school_id")
const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'School-ID': school_id
    }
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type){
        case HANDLE_SUBJECT:
            state.assessment_subjects_attributes[action.idx]['school_subject_id'] = action.value
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case HANDLE_KD:
            state.assessment_subjects_attributes[action.subject_index]['assessment_basic_comps_attributes'][action.idx]['basic_comp_id'] = action.value
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case ADD_KD:
            state.assessment_subjects_attributes[action.idx]['assessment_basic_comps_attributes'] = state.assessment_subjects_attributes[action.idx]['assessment_basic_comps_attributes'].concat([{ 
                basic_comp_id: null,
            }])
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case REMOVE_SUBJECT:
            state.assessment_subjects_attributes = removeField(state.assessment_subjects_attributes, action.idx)
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case ADD_SUBJECT:
            state.assessment_subjects_attributes = state.assessment_subjects_attributes.concat([{ 
                school_subject_id: null,
                assessment_basic_comps_attributes: [{}],
            }])
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        return false
        case HANDLE_EVENT_CLASS:
            state.assessment_classes_attributes[action.idx][action.fieldName] = action.value
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case HANDLE_EVENT:
            state[action.fieldName] = action.value
            return{
                ...state,
                loaded: true,
                loading: false,
            }
        case ADD_CLASS: 
            state.assessment_classes_attributes = state.assessment_classes_attributes.concat([{ class_id: null }])
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case REMOVE_CLASS:
            state.assessment_classes_attributes = removeField(state.assessment_classes_attributes, action.idx)
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case GET_NEW:
            let assessment = action.result.data.assessment ? action.result.data.assessment : {}

            if(Object.entries(assessment) == 0){
                assessment = {
                    name: "",
                    category: "",
                    assessment_type: "",
                    school_id: school_id,
                    assessment_classes_attributes: [{ class_id: null }],
                    assessment_subjects_attributes: []
                }
            }

            if(assessment.assessment_subjects_attributes.length == 0){
                assessment.assessment_subjects_attributes = [{
                    school_subject_id: null,
                    assessment_basic_comps_attributes: [{
                        basic_comp_id: null,
                    }]
                }]
            }

            return {
                loaded: true,
                loading: false,
                ...assessment,
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
        case LOAD_SUCCESS:
            delete state.error;
            if (state.result !== action.result) {
                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    assessment_types: action.result.data.assessment_types,
                    ...action.result.data.assessment,
                }
            }
        break;

        default:
            return state 
    }
}

export function handleSubject(value, index){
    return{
        type: HANDLE_SUBJECT,
        value: value,
        idx: index,
    }
}

export function handleKD(value, subject_index, index){
    return {
        type: HANDLE_KD,
        subject_index: subject_index,
        value: value,
        idx: index,
    }
}

export function addKD(idx){
    return {
        type: ADD_KD,
        idx: idx,
    }
}

export function removeSubject(idx){
    return {
        type: REMOVE_SUBJECT,
        idx: idx,
    }
}

export function addSubject(){
    return {
        type: ADD_SUBJECT,
    }
}

export function handleEventClass(value, idx, fieldName){
    return {
        type: HANDLE_EVENT_CLASS,
        value: value,
        idx: idx,
        fieldName: fieldName,
    }
}

export function handleEvent(value, fieldName){
    return {
        type: HANDLE_EVENT,
        value: value,
        fieldName: fieldName,
    }
}

export function addClass(){
    return {
        type: ADD_CLASS,
    }
}

export function removeClass(idx){
    return {
        type: REMOVE_CLASS,
        idx: idx,
    }
}

export function getNew(assessment_id = false){
    let url = 'v1/assessments/new'

    if(assessment_id){
        url = `v1/assessments/${assessment_id}/edit`
    }

    return{
        types: [LOAD, GET_NEW, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}

export function getAssessment(assessment_id){
    let params = {}
    let url = `v1/assessments/${assessment_id}/edit`

    return{
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}