import headers from './../../utils/header'

 const SET = 'modules/Item/SET';
const RESET = 'modules/Item/RESET';
const LOAD = 'modules/Item/LOAD';
const LOAD_SUCCESS = 'modules/Item/LOAD_SUCCESS';
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

export function get(id = 1) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }
}

export function reset() {
  return {
    type: RESET
  }
}

