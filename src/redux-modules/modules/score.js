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
const LOAD_SCORE_QUESTION_SKILL = 'module/score/LOAD_SCORE_QUESTION_SKILL'
const HANDLE_QUESTION_ONCHANGE = 'module/score/HANDLE_QUESTION_ONCHANGE'
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
        

        case HANDLE_QUESTION_ONCHANGE:
            console.log(state.data.exam_question, "my state")
            state.data.exam_question[action.idx]['ans'] = action.e.value
            state.data.exam_question[action.idx]['score'] = (action.e.value === action.pick) ? action.max_score : 0
            console.log(state.data.exam_question[action.idx], "here now e")
            return {
                ...state,
                loaded: true,
                loading: false,
                result: true,
            }
        case LOAD_SCORE_QUESTION:
            delete state.error
            if (state.result !== action.result) {
                if (action.result.data.collections) {
                    action.result.data['exam_question'] = []
                    action.result.data.collections.map((collection) => {
                        console.log(collection, "my col col col")
                        action.result.data['exam_question'].push({
                            ans: collection.user_problem_answer ? collection.user_problem_answer.ans : null,
                            score: collection.user_problem_answer ? collection.user_problem_answer.score : null,
                            exam_question_id: collection.id,
                            user_id: action.data.student,
                            exam_id: action.data.exam,
                            class_id: action.data.classess,
                            problem_type: collection.problem_type,
                            user_problem_answer: collection.user_problem_answer,
                            exam_question_choices: collection.exam_question_choices,
                            qn_number: collection.qn_number,
                            weight: collection.weight,
                            max_score: collection.max_score
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

        case LOAD_SCORE_QUESTION_SKILL:
            delete state.error
            if (state.result !== action.result) {
                if (action.result.data.collections) {
                    action.result.data['exam_question'] = []
                    action.result.data.collections.map((collection) => {
                        console.log(collection,"my col")
                        collection.questions.map((collections) => {
                            console.log(collections ,"my col 2")
                            action.result.data['exam_question'].push({
                                ans: collections.problem_type ? collections.problem_type : null,
                                score: collections.user_problem_answer ? collections.user_problem_answer.score : null,
                                exam_question_id: collections.id,
                                user_id: action.data.student,
                                exam_id: action.data.exam,
                                class_id: action.data.classess,
                                problem_type: collections.problem_type,
                                user_problem_answer: collections.user_problem_answer,
                                exam_question_choices: collections.exam_question_choices,
                                qn_number: collections.qn_number,
                                weight: collections.weight,
                                max_score: collections.max_score
                            })
                        })
                        console.log( action.result.data['exam_question'],"my col 3")
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
            if (state.result !== action.result) {
                if (action.result.data.collections) {
                    action.result.data['exam_question'] = []
                    action.result.data.collections.map((collection) => {
                        action.result.data['exam_question'].push({
                            ans: collection.user_problem_answer.ans,
                            score: collection.user_problem_answer.score,
                            exam_question_id: collection.id,
                            user_id: action.data.student,
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
            console.log(action, "action")
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
        default: {
            return {
                ...state
            }
        }
            
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

export function handlingSelect(e, idx, pick, max_score) {
    console.log("hit", e, idx, pick, max_score)
    return {
        type: HANDLE_QUESTION_ONCHANGE,
        e: e,
        idx: idx,
        pick: pick,
        max_score: max_score,
    }
}

export function handleScore(value, index, field_name) {
    console.log(value, index, field_name,"value")
    return {
        type: HANDLING_SCORE,
        idx: index,
        field_name: field_name,
        value: value
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

export function getDataScoreQuestion(assessment, exam, student, classess, category_id) {
    const url = `v1/assessments/${assessment}/exams/${exam}/exam_scores/${student}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    console.log("category", category_id)
    let case_load = ''
    switch (category_id) {
        case 'skill':
            case_load = [LOAD, LOAD_SCORE_QUESTION_SKILL, LOAD_FAIL]
            break;
        case 'knowledge':
            case_load = [LOAD, LOAD_SCORE_QUESTION, LOAD_FAIL]
            break
        default:
            case_load = ''
    }

    return {
        types: case_load,
        data: { assessment, exam, student, classess },
        promise: client => client.get(process.env.API_URL + url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }


}


export function getParticipant(exam, classess, assess, name, sort) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    let full_name = name === undefined ? '' : name
    // return false
    let sort_by_exam_score = ''
    if (sort === undefined) {
        sort_by_exam_score = ''
    } else if (sort === null) {
        sort_by_exam_score = ''
    } else {
        sort_by_exam_score = sort.value
    }

    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `/v1/assessments/${assess}/exams/${exam}/exam_classes/${classess}/participants?full_name=${full_name}&sort_by_exam_score=${sort_by_exam_score}`, {
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
