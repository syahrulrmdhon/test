import { combineReducers } from 'redux'
import counter from './modules/counter'
import user from './modules/user'
import assessment from './modules/assessment'
import score from './modules/score'

export default combineReducers({
  user,
  counter,
  assessment,
  score
})
