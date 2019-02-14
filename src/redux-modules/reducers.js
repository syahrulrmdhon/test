import { combineReducers } from 'redux'
import user from './modules/user'
import assessment from './modules/assessment'
import exam from './modules/exam'
import score from './modules/score'

export default combineReducers({
  user,
  assessment,
  exam,
  score
})

