import headers from './../../utils/header'

const SET = 'modules/student/SET';
const RESET = 'modules/student/RESET';
const LOAD = 'modules/student/LOAD';
const LOAD_SUCCESS = 'modules/student/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/student/LOAD_FAIL';
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

export function getStudent(student_id= '') {
    const url = `${process.env.API_URL}/v1/students/${student_id}`
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")

    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url,headers)
    }
}

export function reset() {
  return {
    type: RESET
  }
}

