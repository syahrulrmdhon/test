import headers from './../../utils/header'


const SET = 'modules/questionDetail/SET';
const RESET = 'modules/questionDetail/RESET';
const LOAD = 'modules/questionDetail/LOAD';
const LOAD_SUCCESS = 'modules/questionDetail/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/questionDetail/LOAD_FAIL';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
    if (state.result !== action.result) {
        console.log(action.result)
        return {
            ...state,
            loaded: true,
            loading: false,
            result: true,
            ...action.result
        }
    }
    case LOAD_FAIL:
      return {
        loaded: true,
        loading: false,
        error: action.error
      }
    case SET:
      return { ...state, ...action.payload }
    case RESET:
      return { ...initialState }
    default:
      return state
  }
}

export function getExamQuestion(exam, assessments) {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    const url = `${process.env.API_URL}v1/assessments/${assessments}/exams/${exam}/questions`
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url, headers)
    }
}

export function reset() {
  return {
    type: RESET
  }
}

