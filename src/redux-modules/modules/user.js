import moment from 'moment/moment.js'
import headers from './../../utils/header'


const SET = 'modules/user/SET';
const RESET = 'modules/user/RESET';
const LOAD = 'modules/user/LOAD';
const LOAD_SUCCESS = 'modules/user/LOAD_SUCCESS';
const LOAD_FAIL = 'modules/user/LOAD_FAIL';
const LOAD_SUCCESS_REGION = 'modules/user/LOAD_SUCCESS_REGION'
const HANDLE_FORM_TEXT = 'modules/user/HANDLE_FORM_TEXT'
const HANDLE_REMOVE_PROFILE_PICTURE = 'modules/user/HANDLE_REMOVE_PROFILE_PICTURE'

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
        if (action.result.data.profile) {
          action.result.data['user'] = {}
          action.result.data['user'] = {
            phone_number: action.result.data.profile.phone_number ? action.result.data.profile.phone_number : '',
            email: action.result.data.profile.email ? action.result.data.profile.email : '',
            full_name: action.result.data.profile.full_name ? action.result.data.profile.full_name : '',
            gender: action.result.data.profile.gender ? action.result.data.profile.gender : '',
            pob: action.result.data.profile.pob ?  action.result.data.profile.pob : '',
            dob: action.result.data.profile.dob ? action.result.data.profile.dob : '',
            url: action.result.data.profile.photo_url ? action.result.data.profile.photo_url : '',
            address_attributes: {
              id: action.result.data.profile.address.id ? action.result.data.profile.address.id : '',
              street: action.result.data.profile.address.street ? action.result.data.profile.address.street : '',
              postal_code: action.result.data.profile.address.postal_code ? action.result.data.profile.address.postal_code : '',
              subarea_id: action.result.data.profile.address.subarea_id ? action.result.data.profile.address.subarea_id : '',
              city_id: action.result.data.profile.address.city_id ? action.result.data.profile.address.city_id : '',
              region_id: action.result.data.profile.address.region_id ? action.result.data.profile.address.region_id : '',
            }
          }
        }

        return {
          ...state,
          loaded: true,
          loading: false,
          result: true,
          ...action.result
        }
      }
      break;
    case HANDLE_FORM_TEXT:

      switch (action.field) {
        case 'street':
          state.data.user.address_attributes[action.field] = action.value.target.value
          break;
        case 'postal_code':
          state.data.user.address_attributes[action.field] = action.value.target.value
          break;
        case 'region_id':
          state.data.user.address_attributes[action.field] = action.value
          
          break;
        case 'city_id':
        state.data.user.address_attributes[action.field] = action.value
          break;
        case 'dob':
         
          break;
        default:
          state.data.user[action.field] = action.value.target.value
      }

      console.log(state.data.user, "state")

      return {
        ...state,
        loaded: true,
        loading: false,
      }
    case HANDLE_REMOVE_PROFILE_PICTURE:
      state.data.profile.photo_url= ''
      return {
        ...state,
        loaded: true,
        loading: false,
      }
    case LOAD_SUCCESS_REGION:
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

export function handlingInputText(e, field_name) {
  console.log(e, "value")
  return {
    type: HANDLE_FORM_TEXT,
    value: e,
    field: field_name
  }
}

export function handlingInputSelectRegion(e, field_name) {
  console.log(e.value, "value")
  return {
    type: HANDLE_FORM_TEXT,
    value: e.value,
    field: field_name
  }
}

export function handleRemoveProfilePicture(field_name,value) {
  console.log(value,field_name)
  return {
    type: HANDLE_REMOVE_PROFILE_PICTURE,
    value: value,
    field_name: field_name
  }
}



export function getUSer() {
  const token = localStorage.getItem('token')
  const schoolId = localStorage.getItem("school_id")

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + `v1/users/profile`, headers)
  }
}



export function getRegion() {
  return {
    types: [LOAD, LOAD_SUCCESS_REGION, LOAD_FAIL],
    promise: client => client.get(process.env.API_URL + `/v1/filters/regions`, headers)
  }
}


export function reset() {
  return {
    type: RESET
  }
}

