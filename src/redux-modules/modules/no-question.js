const SET = 'modules/no-question/SET';
const RESET = 'modules/no-question/RESET';
const LOAD_NO_QUESTIONS = 'modules/no-question/LOAD';
const LOAD_NO_QUESTIONS_SUCCESS = 'modules/no-question/LOAD_SUCCESS';
const LOAD_NO_QUESTIONS_FAIL = 'modules/no-question/LOAD_FAIL';
const HANDLE_CHANGE = 'modules/no-question/HANDLE_CHANGE';

const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_NO_QUESTIONS:
            return {
                ...state,
                loading: true,
            }
        case LOAD_NO_QUESTIONS_SUCCESS:
            delete state.error
            if (state.result !== action.result) {

                if (action.result.data.collections) {
                    action.result.data['no_questions'] = []
                    action.result.data.collections.map((res) => {
                        action.result.data['no_questions'].push({
                            aliasName: res.alias_name,
                            related_id: res.id,
                            score: res.exam_score.score
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
            break;
        case LOAD_NO_QUESTIONS_FAIL:
            return {
                loaded: true,
                loading: false,
                error: action.error
            }
            break;
        case HANDLE_CHANGE:
            state.data.no_questions[action.idx][action.fieldName] = action.value
            return {
                ...state,
                loaded: true,
                loading: false
            }
        case SET:
            return { ...state, ...action.payload }
        case RESET:
            return { ...initialState }
        default:
            return state
    }
}
const schoolId = localStorage.getItem('school_id')
const token = localStorage.getItem('token')
const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token,
        'School-ID': schoolId
    }
}
export function getNoQuestions(assessment_id, exam_id, student_id) {
    const url = `v1/assessments/${assessment_id}/exams/${exam_id}/exam_scores/${student_id}`

    return {
        types: [LOAD_NO_QUESTIONS, LOAD_NO_QUESTIONS_SUCCESS, LOAD_NO_QUESTIONS_FAIL],
        promise: client => client.get(process.env.API_URL + url, headers)
    }
}

export function handleChange(value, index, field_name) {
    return {
        type: HANDLE_CHANGE,
        idx: index,
        fieldName: field_name,
        value: value
    }
}

