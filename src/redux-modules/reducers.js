import { combineReducers } from 'redux'
import counter from './modules/counter'
import user from './modules/user'
import assessment from './modules/assessment'

export default combineReducers({
  user,
  assessment,
  counter
})
