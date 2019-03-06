import headers from './../../utils/header'

const SET = 'modules/user/SET';
const RESET = 'modules/user/RESET';
const LOAD = 'modules/user/LOAD';
const LOAD_SUCCESS = 'modules/user/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/user/LOAD_FAIL';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        ...action.result
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

export function getQuestionResults(assessment_id, exam_id, exam_classes_id) {
    let assessment_id = '6ae41268-d737-4a87-bb54-1a9cfd1d69f8'
    let exam_id = 'b4aa7bda-f96d-4665-8dc3-fe263ed670ed'
    let exam_classes_id = '1a5e496b-ffc4-445f-93b4-ef324e80e31c'
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`v1/assessments/${assessment_id}/exams/${exam_id}/exam_classes/${exam_classes_id}/questions`)
  }
}

export function reset() {
  return {
    type: RESET
  }
}

