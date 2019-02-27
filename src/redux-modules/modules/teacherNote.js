const SET = "modules/teacherNote/SET"
const RESET = "modules/teacherNote/RESET"
const LOAD = "modules/teacherNote/LOAD"
const LOAD_SUCCESS = "modules/teacherNote/LOAD_SUCCESS"
const LOAD_FAIL = "modules/teacherNote/LOAD_FAIL"
const GET_DATA = "modules/teacherNote/GET_DATA"
const GET_EXTRACURRICULARS = "module/teacherNote/GET_EXTRACURRICULARS"
const HANDLE_EVENT = "module/teacherNote/HANDLE_EVENT"
const HANDLE_ADD = "module/teacherNote/HANDLE_ADD"
const HANDLE_DISABLED = "module/teacherNote/HANDLE_DISABLED"


const initialState = {
  disabled: true
};
const initialNote = {
  extracurricular_id: '', description: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      let notes = action.result.data.notes

      notes = notes.length ? notes : [initialNote]
      state.notes = notes

      return {
        ...state,
        loaded: true,
        loading: false
      };
    case GET_EXTRACURRICULARS:
      let extracurriculars = action.result.data.extracurriculars
      extracurriculars = extracurriculars.map(extracurricular => {
        return {label: extracurricular.name, value: extracurricular.id, isDisabled: false}
      })

      state.extracurriculars = extracurriculars
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case HANDLE_EVENT:
      state.notes.map(note => {
        if (note.id === action.id) {
          if (note[action.field] !== action.value) {
            state.disabled = false
          }
          note[action.field] = action.value
        }
      })
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case HANDLE_ADD:
      if (action.content === 'extracurricular') {
        state.notes = [...state.notes, initialNote]
      }

      return {
        ...state,
        loaded: true,
        loading: false
      }
    case HANDLE_DISABLED:
      state.disabled = true
      return {
        ...state,
        loaded: true,
        loading: false
      }
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
}

export function getData(id, type) {
  let url = `v1/students/${id}/teacher_notes?achievement_type=${type}`;

  return {
    types: [LOAD, GET_DATA, LOAD_FAIL],
    id: id,
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function getExtracurriculars() {
  let url = 'v1/filters/extracurriculars';

  return {
    types: [LOAD, GET_EXTRACURRICULARS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function handleEvent(value, field, id) {

  return {
    type: HANDLE_EVENT,
    value: value,
    field: field,
    id: id
  }
}

export function addNote(content) {

  return {
    type: HANDLE_ADD,
    content: content
  }
}

export function handleDisabled() {

  return {
    type: HANDLE_DISABLED
  }
}