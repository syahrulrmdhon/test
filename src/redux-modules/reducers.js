import { combineReducers } from 'redux'
import counter from './modules/counter'
import user from './modules/user'
import score from './modules/score'

export default combineReducers({
  user,
  counter,
  score
})
