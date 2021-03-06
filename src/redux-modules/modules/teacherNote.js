import headers from './../../utils/header'


const SET = "modules/teacherNote/SET"
const RESET = "modules/teacherNote/RESET"
const LOAD = "modules/teacherNote/LOAD"
const LOAD_SUCCESS = "modules/teacherNote/LOAD_SUCCESS"
const LOAD_FAIL = "modules/teacherNote/LOAD_FAIL"
const GET_DATA = "modules/teacherNote/GET_DATA"
const GET_EXTRACURRICULARS = "modules/teacherNote/GET_EXTRACURRICULARS"
const HANDLE_EVENT = "modules/teacherNote/HANDLE_EVENT"
const HANDLE_ADD = "modules/teacherNote/HANDLE_ADD"
const HANDLE_DISABLED = "modules/teacherNote/HANDLE_DISABLED"

const initialState = {
  disabled: true
};

const initialExtracurriculars = {
  extracurricular_id: '', description: ''
};

const initialAchievement = {
  title: '', description: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      let notes = action.result.data.notes
      if (action.content === 'extracurricular') {
        notes = notes.length ? notes : [initialExtracurriculars]
      }
      else if (action.content === 'daily_result') {
        notes = notes.length ? notes : [initialAchievement]
      }

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
      const {field, value, data} = action
      state.notes[data.order][field] = value
      
      if(data.id != undefined){
        state.notes[data.order]['id'] = data.id
      }
      state.disabled = false
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case HANDLE_ADD:
      if (action.content === 'extracurricular') {
        state.notes = [...state.notes, {initialExtracurriculars}]
      }
      else if (action.content === 'daily_result') {
        state.notes = [...state.notes, {initialAchievement}]
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

export function getData(id, type) {
  let url = `v1/students/${id}/teacher_notes?achievement_type=${type}`;

  return {
    types: [LOAD, GET_DATA, LOAD_FAIL],
    content: type,
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

export function handleEvent(value, field, params) {
  return {
    type: HANDLE_EVENT,
    value: value,
    field: field,
    data: params
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