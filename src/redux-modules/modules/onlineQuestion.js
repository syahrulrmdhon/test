import headers from './../../utils/header'

const SET = 'modules/onlineQuestion/SET'
const RESET = 'modules/onlineQuestion/RESET'
const LOAD = 'modules/onlineQuestion/LOAD'
const LOAD_SUCCESS = 'modules/onlineQuestion/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/onlineQuestion/LOAD_FAIL'
const BASIC_COMPETENCIES = 'modules/onlineQuestion/BASIC_COMPETENCIES'
const HANDLE_CHANGE_INPUT = 'modules/onlineQuestion/HANDLE_CHANGE_INPUT'
const HANDLE_CHANGE_CORRECT_ANSWER = 'modules/onlineQuestion/HANDLE_CHANGE_CORRECT_ANSWER'
const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      delete state.error;
      if (state.result !== action.result) {
        const data = action.result.data.question
        // console.log(action.result)
        let body = {
          "exam_question": {
            "qn_number": data.qn_number,
            "problem_type": data.problem_type,
            "question": data.question,
            "weight": data.weight,
            "basic_comp_id": data.basic_comp_id
          }
        }
        if (data.exam_question_choices.length) {
          body.exam_question.exam_question_choices_attributes = data.exam_question_choices
        }

        return {
          ...state,
          loaded: true,
          loading: false,
          ...action.result,
          ...{body}
        }
      }
    break;
    case BASIC_COMPETENCIES:
      let basicCompetencies = action.result.data.basic_comps
      basicCompetencies.map(competency => {
        competency.label = `${competency.competency_number} ${competency.content} (${competency.subject_name})`
        competency.value = competency.id
      })
      return {
        ...state,
        loaded: true,
        loading:false,
        ...{basicCompetencies: basicCompetencies}
      }
    case HANDLE_CHANGE_INPUT:
      state.data.question[action.field] = action.value
      state.body.exam_question[action.field] = action.value
      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case HANDLE_CHANGE_CORRECT_ANSWER:
      state.data.question.exam_question_choices.map((choice, index) => {
        if (index == action.order) {
          choice.is_correct_ans = true
        }
        else {
          choice.is_correct_ans = false
        }
      })
      state.body.exam_question.exam_question_choices_attributes = state.data.question.exam_question_choices

      return {
        ...state,
        loaded: true,
        loading:false,
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

export function getQuestion({assessmentId, examId, params}) {
    const url = `${process.env.API_URL}v1/assessments/${assessmentId}/exams/${examId}/questions/new`

    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: client => client.get(url, headers, params)
    }
}

export function getBasicCompetency({params}) {
  const url = `${process.env.API_URL}v1/filters/basic_comps`

    return {
        types: [LOAD, BASIC_COMPETENCIES, LOAD_FAIL],
        promise: client => client.get(url, headers, params)
    }
}

export function onChangeInput({field, value}) {
  return {
    type: HANDLE_CHANGE_INPUT,
    field: field,
    value: value
  }
}

export function onChangeCorrectAnswer({order}) {
  return {
    type: HANDLE_CHANGE_CORRECT_ANSWER,
    order: order
  }
}

export function reset() {
  return {
    type: RESET
  }
}

