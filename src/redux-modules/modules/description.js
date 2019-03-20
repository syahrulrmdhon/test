import headers from "./../../utils/header"

const SET = "modules/description/SET"
const RESET = "modules/description/RESET"
const LOAD = "modules/description/LOAD"
const LOAD_FAIL = "modules/description/LOAD_FAIL"
const BASIC_COMPETENCIES = "modules/description/BASIC_COMPETENCIES"
const SUBJECT_DESCRIPTION = "modules/description/SUBJECT_DESCRIPTION"
const HANDLE_CHANGE = "modules/description/HANDLE_CHANGE"


const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case BASIC_COMPETENCIES:
      delete state.error;
      if (state.result !== action.result) {
        return {
          ...state,
          loaded: true,
          loading: false,
          ...action.result.data
        }
      }
    break
    case SUBJECT_DESCRIPTION:
      delete state.error;
      if (state.result !== action.result) {
        return {
          ...state,
          loaded: true,
          loading: false,
          ...action.result.data
        }
      }
    break
    case HANDLE_CHANGE:
      state.description = action.value
    return {
      ...state,
      loaded: true,
      loading: false
    }
    case LOAD_FAIL:
      return {
        loaded: true,
        loading: false,
        error: action.error
      };
    case SET:
      return { ...state, ...action.payload };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}

export function getCompetencies({ studentId, subjectId, params }) {
  const url = `${process.env.API_URL}v1/students/${studentId}/score_details/${subjectId}`;
  return {
    types: [LOAD, BASIC_COMPETENCIES, LOAD_FAIL],
    promise: client => client.get(url, headers, params)
  };
}

export function getDescription({ studentId, subjectId, params }) {
  const url = `${process.env.API_URL}v1/students/${studentId}/score_details/${subjectId}/description`;
  return {
    types: [LOAD, SUBJECT_DESCRIPTION, LOAD_FAIL],
    promise: client => client.get(url, headers, params)
  };
}

export function handleChange({ value }) {
  return {
    type: HANDLE_CHANGE,
    value: value,
  }
}

export function reset() {
  return {
    type: RESET
  };
}
