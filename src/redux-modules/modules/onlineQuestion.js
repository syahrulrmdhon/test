import headers from './../../utils/header'

const SET = 'modules/onlineQuestion/SET';
const RESET = 'modules/onlineQuestion/RESET';
const LOAD = 'modules/onlineQuestion/LOAD';
const LOAD_SUCCESS = 'modules/onlineQuestion/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/onlineQuestion/LOAD_FAIL';
const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      delete state.error;
      if (state.result !== action.result) {
        return {
          ...state,
          loaded: true,
          loading: false,
          ...action.result
        }
      }
    break;
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

export function getData({assessmentId, examId, params}) {
    const url = `${process.env.API_URL}v1/assessments/${assessmentId}/exams/${examId}/questions/new`

    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url, headers, params)
    }
}

export function reset() {
  return {
    type: RESET
  }
}

