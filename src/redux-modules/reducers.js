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
import profile from './modules/profile'
import studentDetail from './modules/studentDetail'
import attendanceDetail from './modules/attendanceDetail'
import scoreList from './modules/scoreList'
import rapor from './modules/rapor'
import listOnlineExam from './modules/listOnlineExam'
import description from './modules/description'
import bank from './modules/bank'
import onlineExam from './modules/onlineExam'
import onlineQuestion from './modules/onlineQuestion'


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
  studentDetail,
  attendanceDetail,
  profile,
  scoreList,
  rapor,
  listOnlineExam,
  description,
  bank,
  onlineExam,
  onlineQuestion,
})

