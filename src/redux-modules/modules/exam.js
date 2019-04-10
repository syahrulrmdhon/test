import {apiClient} from './../../utils/apiClient'
import headers from './../../utils/header'

const SET = 'modules/exam/SET';
const RESET = 'modules/exam/RESET';
const LOAD = 'modules/exam/LOAD';
const LOAD_SUCCESS = 'modules/exam/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/exam/LOAD_FAIL';
const LOGOUT = 'modules/exam/LOGOUT';
const CHECKED_CLASS = 'modules/exam/CHECKED_CLASS';
const CHECKED_ITEM = 'modules/exam/CHECKED_ITEM';
const ADD_CLASS = 'modules/exam/ADD_CLASS';
const REMOVE_CLASS = 'modules/exam/REMOVE_CLASS';
const HANDLE_CLASS = 'modules/exam/HANDLE_CLASS';
const HANDLE_TIME = 'modules/exam/HANDLE_TIME';
const HANDLE_BC = 'modules/exam/HANDLE_BC';

const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_BC:
            state.data.exam.exam_classes_attributes[action.class_index]['comp_kkms'][action.index]['kkm'] = action.event.target.value
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case HANDLE_TIME:
            state.data.exam.exam_classes_attributes[action.index][action.field_name] = action.event
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case HANDLE_CLASS:
            state.data.exam.exam_classes_attributes[action.index]['class_id'] = action.event.value   

            if(state.data.exam.exam_classes_attributes[action.index]['comp_kkms']){
                state.data.exam.exam_classes_attributes[action.index]['comp_kkms'].map((comp_kkm, idx) => {
                    state.data.exam.exam_classes_attributes[action.index]['comp_kkms'][idx]['class_id'] = action.event.value
                })
            }
            
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case REMOVE_CLASS:
            state.data.exam.exam_classes_attributes.splice(action.index, 1)
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case ADD_CLASS:
            state.data.exam.exam_classes_attributes = buildClass(state.data.exam.exam_classes_attributes, state.data.basic_comps)
            return {
                ...state,
                loaded: true,
                loading: false,
            }

        case CHECKED_ITEM:
            state.data.classes[action.class_index]['users'][action.index]['is_selected'] = action.bool

            return {
                ...state,
                loaded: true,
                loading: false,
                ...action.result
            }
        case CHECKED_CLASS:
            let classs = state.data.classes[action.index]
            classs = changeAttributeChecked(classs, action.bool)
            state.data.classes[action.index] = classs

            return {
                ...state,
                loaded: true,
                loading: false,
                ...action.result
            }
        case LOAD:
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case LOAD_SUCCESS:
            delete state.error;
            if (state.result !== action.result) {

                if(action.result.data.exam.exam_classes_attributes.length == 0){
                    action.result.data.exam.exam_classes_attributes = buildClass(action.result.data.exam.exam_classes_attributes, action.result.data.basic_comps)
                }

                return {
                    ...state,
                    loaded: true,
                    loading: false,
                    result: true,
                    ...action.result
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
        case LOGOUT:
            return { ...initialState }
        case SET:
            return { ...state, loaded: true, loading: false, result: true, data: { ...state.data, ...action.payload } }
        case RESET:
            return { ...initialState }
        default:
            return state
    }
}

// participant class
export function buildClass(attributes, data_basic_comps){
    let basic_comps = []
    if(data_basic_comps){
        data_basic_comps.map((basic_comp) => {
            basic_comps.push({
                basic_comp_id: basic_comp.id,
                class_id: 0,
                kkm: null,
            })
        })

        attributes.push({
            class_id: 0,
            start_date: null,
            deadline_date: null,
            comp_kkms: basic_comps,
        })
    }
    return attributes
}
export function handleBC(event, class_index, index){
    return dispatch => {
        dispatch({
            type: HANDLE_BC,
            class_index: class_index,
            event: event,
            index: index,
        })
    }
}
export function handleClass(event, index){
    return dispatch => {
        dispatch({
            type: HANDLE_CLASS,
            index: index,
            event: event,
        })
    }
}

export function handleTimeAttr(event, field_name, index){
    return dispatch => {
        dispatch({
            type: HANDLE_TIME,
            index: index,
            event: event,
            field_name: field_name,
        })
    }
}

export function addClass(){
    return dispatch => {
        dispatch({
            type: ADD_CLASS,
        })
    }
}

export function removeClass(index){
    return dispatch => {
        dispatch({
            type: REMOVE_CLASS,
            index: index,
        })
    }
}
// 

export function changeAttributeChecked(classs, bool){
    let users = classs.users
    let result = []
    if(users){
        users.map((user, idx) => {
            user.is_selected = bool
            result.push(user)
        })
    }

    if(result.length > 0){
        classs.users = result
    }

    return classs
}

export function itemCheckbox(class_index, index, bool){
    return dispatch => {
        dispatch({
            type: CHECKED_ITEM,
            class_index: class_index,
            index: index,
            bool: bool,
        })
    }
}

export function allChecked(index, bool){
    return dispatch => {
        dispatch({
            type: CHECKED_CLASS,
            index: index,
            bool: bool,
        })
    }
}

export function getParticipant(step, assessment_id, exam_id){
    let params = {}
    let url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/new?step=${step}`

    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")

    return{
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url,headers)
    }
}