import { combineReducers } from 'redux'
import user from './modules/user'
import assessment from './modules/assessment'
import exam from './modules/exam'
import skill from './modules/exam/skill'
import score from './modules/score'
import questionDetail from './modules/questionDetail'
import Menu from './modules/menu'
import question from './modules/question'
import student from './modules/student'
import noQuestion from './modules/no-question'
import attitude from './modules/attitude'
import teacherNote from './modules/teacherNote'

export default combineReducers({
  user,
  assessment,
  exam,
  skill,
  questionDetail,
  score,
  Menu,
  question,
  student,
  noQuestion,
  attitude,
  teacherNote
})

