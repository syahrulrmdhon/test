const SET = "modules/attendanceDetail/SET";
const RESET = "modules/attendanceDetail/RESET";
const LOAD = "modules/attendanceDetail/LOAD";
const LOAD_SUCCESS = "modules/attendanceDetail/LOAD_SUCCESS";
const LOAD_FAIL = "modules/attendanceDetail/LOAD_FAIL";
const GET_STATUS= "modules/attendanceDetail/GET_STATUS"
const GET_SUBJECTS= "modules/attendanceDetail/GET_SUBJECTS"

// const GET_DATA = "modules/attendanceDetail/GET_DATA";
// const GET_EXTRACURRICULARS = "modules/attendanceDetail/GET_EXTRACURRICULARS";
// const HANDLE_EVENT = "modules/attendanceDetail/HANDLE_EVENT";
// const HANDLE_ADD = "modules/attendanceDetail/HANDLE_ADD";
// const HANDLE_DISABLED = "modules/attendanceDetail/HANDLE_DISABLED";

const initialState = {
  disabled: true
};

export default function reducer(state = initialState, action) {
  let response = action.result
  switch (action.type) {
    case GET_STATUS:
      // console.log(response.data)
      state.status = response.data
      console.log(state)
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case GET_SUBJECTS:
      state.subjects = response.data
    console.log(state)

      return {
        ...state,
        loaded: true,
        loading: false
      };
    // case HANDLE_EVENT:
      
    //   return {
    //     ...state,
    //     loaded: true,
    //     loading: false
    //   };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        ...action.result
      };
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

const school_id = localStorage.getItem("school_id");
const headers = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + localStorage.getItem("token"),
    "School-ID": school_id
  }
};

export function getStatus() {
  let url = 'v1/filters/attendance_status'

  return {
    types: [LOAD, GET_STATUS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function getSubjects(userId) {
  let url = `v1/filters/subjects?user_id=${userId}`

  return {
    types: [LOAD, GET_SUBJECTS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}
