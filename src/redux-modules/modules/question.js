const SET = 'modules/question/SET'
const RESET = 'modules/question/RESET'
const LOAD = 'modules/question/LOAD'
const LOAD_SUCCESS = 'modules/question/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/question/LOAD_FAIL'
const GET_DATA = 'modules/question/GET_DATA'
const HANDLE_SWITCH = 'modules/question/HANDLE_EVENT'
const HANDLE_EVENT = 'modules/question/HANDLE_INPUT'
const HANDLE_NUMBER = 'modules/question/HANDLE_NUMBER'


const initialState = {
  switch: true
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
    const basicCompetencies = action.result.data.assessment_basic_comps
    
    delete state.error
      if (action.step === 'BasicForm') {
        const data = action.result.data.exam
        state.basicForm = {
          assessment_id: action.id,
          name: data.name || '',
          exam_type: data.exam_type,
          question_count: data.question_count || '',
          is_remedial: data.is_remedial || false,
          include_question: data.include_question || true
        }
        state.switch = true
        state.basicCompetencies = basicCompetencies
        state.is_correct_ans = 0
        state.number = 1
      }
      else if (action.step === 'QuestionForm') {
        const data = action.result.data

        state.questionForm = data
        basicCompetencies.map(competence => {     
          competence.label = `${competence.label} (${competence.subject_name})`
        })
        state.basicCompetencies = basicCompetencies

        if (data.exam_question.exam_question_choices === null) {
          data.exam.exam_questions_attributes.push({
            weight: '',
            exam_question_choices_attributes: [{order: 0, symbol: '', content: '', is_correct_ans: true}],
            problem_type: null,
            basic_comp_id: null,
            question: '',
            school_subject_id: ''
          })
          state.is_correct_ans = 0
        }
        else if (data.exam.exam_questions_attributes.length) {
          const correctAnswer = data.exam.exam_questions_attributes[state.number - 1].exam_question_choices_attributes.findIndex(choice => { return choice.is_correct_ans === true})
          state.is_correct_ans = correctAnswer
        }
      }
      return {
        ...state,
        loaded: true,
        loading:false
      }
    case HANDLE_SWITCH:
      state.switch = action.value
      state.basicForm.include_question = action.value
      return{
        ...state,
        loaded: false,
        loading: true,
      }
    case HANDLE_EVENT:
      if (action.step === 'BasicForm'){
        state.basicForm[action.field] = action.value
      }
      else if (action.step === 'QuestionForm') {        
        const data = state.questionForm.exam

        if (action.field === 'symbol' || action.field === 'content') {
          const index = data.exam_questions_attributes[state.number - 1].exam_question_choices_attributes.findIndex(choice => {
            return choice.order === action.order;
          })
          data.exam_questions_attributes[state.number - 1].exam_question_choices_attributes[index][action.field] = action.value
        }
        else if (action.field === 'is_correct_ans') {
          data.exam_questions_attributes[state.number - 1].exam_question_choices_attributes.map(choice => delete choice[action.field])
          state[action.field] = parseInt(action.value)
          data.exam_questions_attributes[state.number - 1].exam_question_choices_attributes[state[action.field]][action.field] = true
        }
        else if (action.field === 'basic_comp_id') {
          data.exam_questions_attributes[state.number - 1][action.field] = action.value
          const competence = state.basicCompetencies.find(competence => {return competence.value === action.value})
          data.exam_questions_attributes[state.number - 1].school_subject_id = competence.school_subject_id
        }
        else {
          data.exam_questions_attributes[state.number - 1][action.field] = action.value
        }
      }
      return{
        ...state,
        loaded: false,
        loading: true,
      }
    case HANDLE_NUMBER:
      if (action.next) {
        state.number = state.number + action.value
      }
      else {
        state.number = action.value
        if (state.questionForm) {
          const correctAnswer = state.questionForm.exam.exam_questions_attributes[state.number - 1].exam_question_choices_attributes.findIndex(choice => { return choice.is_correct_ans === true})
          state.is_correct_ans = correctAnswer
        }
      }
      return {
        ...state,
        loaded: false,
        loading: true,
      }
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        ...action.result
      }
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

const school_id = localStorage.getItem("school_id")
const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'School-ID': school_id
    }
}

export function getData(assessmentId = false, step = '', number, examId) {

  let url = `v1/assessments/${assessmentId}/exams/new?step=${step}`

  if (number) {
    url = `v1/assessments/${assessmentId}/exams/new?step=${step}&number=${number}`
  }
  
  if (step && examId) {
    url = `v1/assessments/${assessmentId}/exams/${examId}/edit?step=${step}`
  }

  return {
      types: [LOAD, GET_DATA, LOAD_FAIL],
      id: assessmentId,
      step: step,
      examId: examId,
      promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function handleSwitch(value) {
  return {
      type: HANDLE_SWITCH,
      value: value,
  }
}

export function handleEvent(value, field, step, order) {
  return {
      type: HANDLE_EVENT,
      value: value,
      field: field,
      step: step,
      order: order
  }
}

export function handleNumber(value, next = true) {
  return {
    type: HANDLE_NUMBER,
    value: value,
    next: next,
  }
}