import { combineReducers } from 'redux'
import user from './modules/user'
import score from './modules/score'
import assessment from './modules/assessment'

export default combineReducers({
    assessment,
    user,
    score
})

