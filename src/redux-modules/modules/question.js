const SET = 'modules/question/SET'
const RESET = 'modules/question/RESET'
const LOAD = 'modules/question/LOAD'
const LOAD_SUCCESS = 'modules/question/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/question/LOAD_FAIL'
const GET_DATA = 'modules/question/GET_DATA'
const HANDLE_SWITCH = 'modules/question/HANDLE_EVENT'
const HANDLE_EVENT = 'modules/question/HANDLE_INPUT'

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
        console.log(data, 'response')
        // console.log(data, 'basic form')
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
        console.log(state, 'redux')
      }
      else if (action.step === 'QuestionForm') {

        const data = action.result.data
        state.questionForm = data
        basicCompetencies.map(competence => {     
          competence.label = `${competence.competency_number} ${competence.label} (${competence.subject_name})`
        })
        state.basicCompetencies = basicCompetencies
        console.log(data, 'question form redus')

        // console.log(state, 'qyuestion form')
        if (data.exam_question.exam_question_choices !== null) {
          // console.log(data, 'question form redux')
          state.initialQuestion = {
              weight: data.exam_question.exam_question_choices.weight || ''
          //   problem_type
          //   question
          //   school_subject_id
          //   basic_comp_id
          //   exam_question_choices_attributes: [{order: 0, symbol: '', content: ''}]
          //   assessment_id: action.id,
          //   name: data.name || '',
          //   exam_type: data.exam_type,
          //   question_count: data.question_count || '',
          //   is_remedial: data.is_remedial || false,
          //   include_question: data.include_question || true
          }
        }
      }
      // console.log(state, 'ini dari redux')
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
        // console.log(state.questionForm.exam_question[], 'ppppff')
        state.questionForm.exam_question[action.field] = action.value
      }
      console.log(state, 'opopop')
      return{
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

export function getData(assessmentId = false, step = '') {
  let url = `v1/assessments/${assessmentId}/exams/new?step=${step}`
  console.log(url)
  return{
      types: [LOAD, GET_DATA, LOAD_FAIL],
      id: assessmentId,
      step: step,
      promise: client => client.get(process.env.API_URL + url, headers)
  }
}

export function handleSwitch(value) {
  return {
      type: HANDLE_SWITCH,
      value: value,
  }
}

export function handleEvent(value, field, step){
  return {
      type: HANDLE_EVENT,
      value: value,
      field: field,
      step: step
  }
}