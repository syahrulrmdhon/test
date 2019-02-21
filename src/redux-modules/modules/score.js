import { classes } from "../../utils/common";

const SET = 'modules/score/SET';
const RESET = 'modules/score/RESET';
const LOAD = 'modules/score/LOAD';
const LOAD_SUCCESS = 'modules/score/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/score/LOAD_FAIL';
const LOGOUT = 'modules/score/LOGOUT';
const LOAD_SCORE = 'modules/score/LOAD_SCORE';
const HANDLE_QUESTION = 'modules/score/HANDLE_QUESTION';
const LOAD_SCORE_QUESTION = 'module/score/LOAD_SCORE_QUESTION'
const HANDLE_QUESTION_ONCHANGE  = 'module/score/HANDLE_QUESTION_ONCHANGE'
const LOAD_SCORE_QUESTION_INPUT = 'module/score/LOAD_SCORE_QUESTION_INPUT'
const HANDLING_SCORE = 'module/score/HANDLING_SCORE'
const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_QUESTION:
            state.data['exam_scores'][action.index] = {
                score_type: 'subject_average',
                related_id: action.related_id,
                score: action.value,
            }
            console.log(state)
            return {
                ...state,
                loaded: true,
                loading: false,
                result: true,
            }
        case LOAD_SCORE:
            delete state.error;
            if (state.result !== action.result) {
                if (action.result.data.collections) {
                    action.result.data['exam_scores'] = []
                    action.result.data.collections.map((collection) => {
                        action.result.data['exam_scores'].push({})
                    })
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
        case HANDLING_SCORE:
            state.data.exam_question[action.idx][action.field_name] = action.value
            return {
                ...state,
                loaded: true,
                loading: false,
            } 
        // break;
           
        case HANDLE_QUESTION_ONCHANGE:
            console.log(state, "my state")
            state.data.exam_question[action.idx]['ans'] = action.e.value
            state.data.exam_question[action.idx]['score'] = (action.e.value === action.pick) ? action.max_score : 0
            console.log(state.data.exam_question[action.idx]['score'] = (action.e.value === action.pick) ? action.max_score : 0,"here now e")
            return {
                ...state,
                loaded: true,
                loading: false,
                result: true,
            }

        case LOAD_SCORE_QUESTION:
            delete state.error
            console.log(action.result,"my result")
            if (state.result !== action.result) {
                if (action.result.data.collections) {
                    action.result.data['exam_question'] = []
                    action.result.data.collections.map((collection) => {
                        console.log(collection,"collection")
                            action.result.data['exam_question'].push({
                                ans: collection.user_problem_answer ? collection.user_problem_answer.ans:null ,
                                score: collection.user_problem_answer ? collection.user_problem_answer.score:null,
                                exam_question_id: collection.id,
                                user_id: action.data.student ,
                                exam_id: action.data.exam,
                                class_id: action.data.classess

                            })
                        
                    })
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
        case LOAD_SCORE_QUESTION_INPUT:
        delete state.error
        if(state.result !== action.result){
            if (action.result.data.collections) {
                action.result.data['exam_question'] = []
                action.result.data.collections.map((collection) => {
                        action.result.data['exam_question'].push({
                            ans: collection.user_problem_answer.ans,
                            score: collection.user_problem_answer.score,
                            exam_question_id: collection.id,
                            user_id: action.data.student ,
                            exam_id: action.data.exam,
                            class_id: action.data.classess

                        })
                    
                })
            }
        }   
        break;
        case LOAD:
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case LOAD_SUCCESS:
            delete state.error;
            if (state.result !== action.result) {
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




export function setScoreNoQuestion(event, index, related_id) {
    return {
        type: HANDLE_QUESTION,
        value: event.target.value,
        index: index,
        related_id: related_id,
    }
}

export function handlingSelect(e, idx, pick, max_score){
    console.log(max_score,"here max")
    return {
        type:HANDLE_QUESTION_ONCHANGE,
        e:e,
        idx: idx,
        pick: pick,
        max_score: max_score,
    }   
}

export function handleScore(value,index, field_name){
    // console.log(e, index, field_name)
    return {
        type:HANDLING_SCORE,
        idx:index,
        field_name: field_name,        
        value:value
    }
}

export function getDataScores(assessment_id, exam_id, exam_scores_id) {
    const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_scores/${exam_scores_id}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")

    return {
        types: [LOAD, LOAD_SCORE, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId

            }
        })
    }


}

export function getDataScoreQuestion(assessment, exam, student, classess) {
    console.log("hit me")
    const url = `v1/assessments/${assessment}/exams/${exam}/exam_scores/${student}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")

    return {
        types: [LOAD, LOAD_SCORE_QUESTION, LOAD_FAIL],
        data:{assessment, exam, student,classess},
        promise: client => client.get(process.env.API_URL + url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }


}


export function getParticipant(exam, classess, assess, name) {
    console.log(name, "first render")
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    let full_name = name === undefined?'':name
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `/v1/assessments/${assess}/exams/${exam}/exam_classes/${classess}/participants?full_name=${full_name}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }
}



export function setSavedata(payload) {
    console.log(payload, "here payload")
    return {
        type: SET,
        payload
    }
}

export function reset() {
    return {
        type: RESET
    }
}
