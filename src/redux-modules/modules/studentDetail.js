import headers from './../../utils/header'

const SET = "modules/studentDetail/SET"
const RESET = "modules/studentDetail/RESET"
const LOAD = "modules/studentDetail/LOAD"
const LOAD_SUCCESS = "modules/studentDetail/LOAD_SUCCESS"
const LOAD_FAIL = "modules/studentDetail/LOAD_FAIL"
const GET_DATA = "modules/studentDetail/GET_DATA"
const GET_EXTRACURRICULARS = "modules/studentDetail/GET_EXTRACURRICULARS"
const HANDLE_EVENT = "modules/studentDetail/HANDLE_EVENT"
const HANDLE_ADD = "modules/studentDetail/HANDLE_ADD"
const HANDLE_DISABLED = "modules/studentDetail/HANDLE_DISABLED"
const GET_ATTENDANCES= "modules/studentDetail/GET_ATTENDANCES"
const GET_STATUS= "modules/studentDetail/GET_STATUS"
const GET_SUBJECTS= "modules/studentDetail/GET_SUBJECTS"
const HANDLE_FILTER= "modules/studentDetail/HANDLE_FILTER"
const RESET_NOTES= "modules/studentDetail/RESET_NOTES"

const initialState = {
  disabled: true,
  filter: {} 
};

const initialExtracurriculars = {
  extracurricular_id: '', description: ''
};

const initialAchievement = {
  title: '', description: ''
}

const school_id = localStorage.getItem("school_id");

let student = ''

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      let notes = action.result.data.notes
      if (action.content === 'extracurricular') {
        notes = notes.length ? notes : [{extracurricular_id: '', description: ''}]
      }
      else if (action.content === 'daily_result') {
        notes = notes.length ? notes : [{  title: '', description: ''}]
      }

      state.disabled = true
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
        state.notes = [...state.notes, {extracurricular_id: '', description: ''}]
      }
      else if (action.content === 'daily_result') {
        state.notes = [...state.notes, {title: '', description: ''}]
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
    case GET_STATUS:
      let status = [{label: 'Semua Status', value: 'all'}]
      action.result.data.attendance_status.map(item => {
        status.push(
          {
            label: item.value,
            value: item.key
          }
        )
      })
      state.status = status
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case GET_SUBJECTS:
      let subjects = [{label: 'Semua Mata Pelajaran', value: 'all'}]
      action.result.data.subjects.map(item => {
        subjects.push(
          {
            label: item.subject_name,
            value: item.id
          }
        )
      })
      state.subjects = subjects
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case GET_ATTENDANCES:
      state.attendances = action.result.data
      return {
        ...state,
        loaded: true,
        loading: false
      };
    case HANDLE_FILTER:
      switch (action.field) {
        case 'school_subject_id':
          if (action.value === 'all') {
            delete state.filter[action.field]
          }
          else {
            state.filter[action.field] = action.value
          }
          break;
        case 'date_start':
          state.filter[action.field] = action.value
          break;
        case 'date_end':
          state.filter[action.field] = action.value
          break;
        case 'status':
          if (action.value === 'all') {
            delete state.filter[action.field]
          }
          else {
            state.filter[action.field] = action.value
          }
          break;
        default:
          state.filter = {}
        }
      return {
        ...state,
        loaded: true,
        loading: false
      }
    case LOAD:
      if (state.notes) {
        if (state.notes.length === 1 && (state.notes.extracurricular_id === '' || state.notes.description === '') ) {
          state.notes[0].extracurricular_id = ''
          state.notes[0].description = ''
        }
        else {
          state.notes[0].title = ''
          state.notes[0].description = ''
        }
      }
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

export function getAttendances(studentId, params) {
  const url = `v1/students/${studentId}/attendance_recap`
  student = studentId
  return {
    types: [LOAD, GET_ATTENDANCES, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers, params)
  }
}

export function getStatus() {
  let url = 'v1/filters/attendance_status'

  return {
    types: [LOAD, GET_STATUS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function getSubjects(studentId) {
  let url = `v1/filters/subjects?user_id=${studentId}`

  return {
    types: [LOAD, GET_SUBJECTS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function handleFilter(value, field) {
  return {
    type: HANDLE_FILTER,
    value: value,    
    field: field,
  }
}

