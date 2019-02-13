const LOAD = 'modules/assessment/LOAD';
const LOAD_SUCCESS = 'modules/assessment/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/assessment/LOAD_FAIL';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
    switch(action.type){
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
                    ...action.result.data.assessment
                }
            }
        break;

        default:
            return state 
    }
}

export function getAssessment(assessment_id){
    let params = {}
    let url = `v1/assessments/${assessment_id}/edit`

    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")

    return{
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
                'School-ID': schoolId
            }
        })
    }
}