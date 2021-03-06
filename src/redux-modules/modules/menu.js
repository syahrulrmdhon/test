import headers from './../../utils/header'


const SET = 'modules/menu/SETDATA';
const RESET = 'modules/menu/RESET';
const LOAD = 'modules/menu/LOAD';
const LOAD_SUCCESS = 'modules/menu/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/menu/LOAD_FAIL';
const LOGOUT = 'modules/menu/LOGOUT';
const initialState = null;

export default function reducer(state = initialState, action) {
    switch (action.type) {
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

export function getMenu() {
    const token = localStorage.getItem('token')
    const schoolId = localStorage.getItem("school_id")
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(process.env.API_URL + `v1/menu`,headers)
    }
}



export function SETDATA(payload) {
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
