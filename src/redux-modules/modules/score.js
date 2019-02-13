import { classes } from "../../utils/common";

const SET = 'modules/score/SET';
const RESET = 'modules/score/RESET';
const LOAD = 'modules/score/LOAD';
const LOAD_SUCCESS = 'modules/score/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/score/LOAD_FAIL';
const LOGOUT = 'modules/score/LOGOUT';
const LOAD_SCORE = 'modules/score/LOAD_SCORE';
const HANDLE_QUESTION = 'modules/score/HANDLE_QUESTION';

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
                if(action.result.data.collections){
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

export function setScoreNoQuestion(event, index, related_id){
    return{
        type: HANDLE_QUESTION,
        value: event.target.value,
        index: index,
        related_id: related_id,
    }
}

export function getDataScores(assessment_id, exam_id,exam_scores_id){
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
    apiClient('get', url).then(res => {
        res.data.data.collections.map((value) => {
            this.setState({
                dataScores: res.data.data.collections,
                idSubject: value.id
            })
        })

    })

}

export function getParticipant(exam, classess, assess) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `/v1/assessments/${assess}/exams/${exam}/exam_classes/${classess}/participants`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
           }
        })
    }
}



export function setSavedata(payload) {
    console.log(payload,"here payload")
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
