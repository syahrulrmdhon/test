import { combineReducers } from 'redux'
import counter from './modules/counter'
import user from './modules/user'
import score from './modules/score'
import assessment from './modules/assessment'

export default combineReducers({
  user,
  counter,
  score,
  assessment,
})
