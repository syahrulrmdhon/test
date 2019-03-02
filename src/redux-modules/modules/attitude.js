const SET = 'modules/attitude/SET';
const RESET = 'modules/attitude/RESET';
const LOAD = 'modules/attitude/LOAD';
const LOAD_SUCCESS = 'modules/attitude/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/attitude/LOAD_FAIL';
const LOGOUT = 'modules/attitude/LOGOUT';
const LOAD_FORM_DATA =  'modules/attitude/LOAD_FORM_DATA' 
const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LOAD_FORM_DATA:
        delete state.error
        if (state.result !== action.result) {
            console.log(action)
            // if (action.result.data.collections) {
            //     action.result.data['exam_question'] = []
            //     action.result.data.collections.map((collection) => {
            //             action.result.data['exam_question'].push({
            //                 ans: collection.user_problem_answer ? collection.user_problem_answer.ans:null ,
            //                 score: collection.user_problem_answer ? collection.user_problem_answer.score:null,
            //                 exam_question_id: collection.id,
            //                 user_id: action.data.student ,
            //                 exam_id: action.data.exam,
            //                 class_id: action.data.classess,
            //                 problem_type:collection.problem_type,
            //                 user_problem_answer:collection.user_problem_answer,
            //                 exam_question_choices: collection.exam_question_choices,
            //                 qn_number: collection.qn_number,
            //                 weight:collection.weight,
            //                 max_score: collection.max_score
            //             })
                    
            //     })
            // }

            return {
                ...state,
                loaded: true,
                loading: false,
                result: true,
                ...action.result
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
            console.log(action, "my result")
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


export function getDataScoreAttitude(assessment_id) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/user_attitudes/participants`
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }
}


export function getDataScoreDetail(assessment_id, class_id, user_id) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessment_id}/classes/${class_id}/users/${user_id}?attitudes_scores=0?page=2`
    console.log(url,"my url")
    return {
        types: [LOAD, LOAD_SUCCESS,LOAD_FORM_DATA, LOAD_FAIL],
        promise: client => client.get(url, {
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
