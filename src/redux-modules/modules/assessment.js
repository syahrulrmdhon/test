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
const HANDLE_ATTITUDE = 'modules/assessment/HANDLE_ATTITUDE';
const ADD_ATTITUDE_ITEM = 'modules/assessment/ADD_ATTITUDE_ITEM';
const REMOVE_ATTITUDE_ITEM = 'modules/assessment/REMOVE_ATTITUDE_ITEM';
const HANDLE_ATTITUDE_ITEM = 'modules/assessment/HANDLE_ATTITUDE_ITEM';
const LOAD_SHOW = 'modules/assessment/LOAD_SHOW';
const REMOVE_KD = 'modules/assessment/REMOVE_KD';

const initialState = {
    assessment: null,
    assessment_classes_attributes: null,
    user_attitudes: null,
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
        case HANDLE_ATTITUDE_ITEM:
            state.user_attitudes_attributes[action.idx][action.fieldName] = action.value
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case REMOVE_ATTITUDE_ITEM:
            state.user_attitudes_attributes = removeField(state.user_attitudes_attributes, action.idx)
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case ADD_ATTITUDE_ITEM:
            state.user_attitudes_attributes = state.user_attitudes_attributes.concat({
                class_id: null,
                user_id: null,
                score: null,
                description: null,
                full_name: '',
                data: [],
                options: [],
            })
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case HANDLE_ATTITUDE:
            state.assessment_attitudes_attributes[action.idx]['school_attitude_id'] = action.value
            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case HANDLE_SUBJECT:
            state.assessment_subjects_attributes[action.idx]['school_subject_id'] = action.value
            
            if(action.flag == 'attitude'){
                delete state.assessment_subjects_attributes[action.idx]['assessment_basic_comps_attributes']
            }

            return{
                ...state,
                loaded: false,
                loading: true,
            }
        case REMOVE_KD:
            state.assessment_subjects_attributes[action.subject_index]['assessment_basic_comps_attributes'] = removeField(state.assessment_subjects_attributes[action.subject_index]['assessment_basic_comps_attributes'], action.index)
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
                    assessment_attitudes_attributes:[{ school_attitude_id: null }],
                    assessment_subjects_attributes: []
                }
            }

            if(assessment.assessment_subjects_attributes && assessment.assessment_subjects_attributes.length == 0){
                assessment.assessment_subjects_attributes = [{
                    school_subject_id: null,
                    assessment_basic_comps_attributes: [{
                        basic_comp_id: null,
                    }]
                }]
            }

            if(!assessment.assessment_attitudes_attributes || assessment.assessment_attitudes_attributes.length == 0){
                assessment.assessment_attitudes_attributes = [{
                    school_attitude_id: null,
                }]
            }

            if(assessment.category == 'attitude'){
                if(assessment.assessment_subjects_attributes && assessment.assessment_subjects_attributes.length > 0){
                    assessment.assessment_subjects_attributes.map((value, idx) => {
                        delete assessment.assessment_subjects_attributes[idx]['assessment_basic_comps_attributes']
                    })
                }

                if(assessment.user_attitudes_attributes && assessment.user_attitudes_attributes.length == 0){
                    assessment.user_attitudes_attributes.push({
                        class_id: null,
                        user_id: null,
                        score: null,
                        description: null,
                        full_name: null,
                        data: [],
                    })
                }
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
        case LOAD_SHOW:
            delete state.error;
            if (state.result !== action.result) {
                console.log(action.result.data.user_attitudes)
                return {
                    // ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result.data.assessment,
                    ...action.result.data.user_attitudes,
                }
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

export function handleAttitudeItem(value, idx, fieldName){
    return {
        type: HANDLE_ATTITUDE_ITEM,
        value: value,
        idx: idx,
        fieldName: fieldName,
    }
}

export function removeAttitudeItem(idx){
    return {
        type: REMOVE_ATTITUDE_ITEM,
        idx: idx,
    }
}

export function addAttitudeItem(){
    return {
        type: ADD_ATTITUDE_ITEM,
    }
}

export function handleAttitude(value, idx){
    return {
        type: HANDLE_ATTITUDE,
        value: value,
        idx: idx,
    }
}

export function handleSubject(value, index, flag = false){
    return{
        type: HANDLE_SUBJECT,
        value: value,
        idx: index,
        flag: flag,
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

export function removeKD(subject_index, index){
    return {
        type: REMOVE_KD,
        subject_index: subject_index,
        index: index,
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

    // if(category == 'attitude'){
    //     url = `${url}?category=${category}`
    // }

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

export function showAssessment(assessment_id, category = 'knowledge'){
    let params = {}
    let url = `v1/assessments/${assessment_id}?category=${category}`

    return{
        types: [LOAD, LOAD_SHOW, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}