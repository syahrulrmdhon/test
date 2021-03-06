import headers from './../../utils/header'

const SET = 'modules/onlineQuestion/SET'
const RESET = 'modules/onlineQuestion/RESET'
const LOAD = 'modules/onlineQuestion/LOAD'
const LOAD_SUCCESS = 'modules/onlineQuestion/LOAD_SUCCESS'
const LOAD_FAIL = 'modules/onlineQuestion/LOAD_FAIL'
const BASIC_COMPETENCIES = 'modules/onlineQuestion/BASIC_COMPETENCIES'
const HANDLE_CHANGE = 'modules/onlineQuestion/HANDLE_CHANGE'
const HANDLE_CHANGE_CORRECT_ANSWER = 'modules/onlineQuestion/HANDLE_CHANGE_CORRECT_ANSWER'
const HANDLE_DELETE_CHOICE = 'modules/onlineQuestion/HANDLE_DELETE_CHOICE'
const HANDLE_ADD_CHOICE = 'modules/onlineQuestion/HANDLE_ADD_CHOICE'
const HANDLE_CHANGE_CONTENT = 'modules/onlineQuestion/HANDLE_CHANGE_CONTENT'
const HANDLE_SUCCESS = 'modules/onlineQuestion/HANDLE_SUCCESS'
const HANDLE_ADD_IMAGE_QUESTION = 'modules/onlineQuestion/HANDLE_ADD_IMAGE_QUESTION'
const QUESTION_SELECTED = 'modules/onlineQuestion/QUESTION_SELECTED'
const HANDLE_DELETE_IMAGE = 'modules/onlineQuestion/HANDLE_DELETE_IMAGE'
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
        action.result.success = false
        let body = {
          "exam_question": {
            "qn_number": data.qn_number,
            "problem_type": data.problem_type,
            "question": data.question,
            "weight": data.weight,
            "basic_comp_id": data.basic_comp_id,
            "image_sources": [],
            "exam_question_choices_attributes": [{id: null, symbol: 'A', content: '', is_correct_ans: true}]
          }
        }
        if (data.exam_question_choices.length) {
          body.exam_question.exam_question_choices_attributes = data.exam_question_choices
        }
        else {
          data.exam_question_choices.push({id: null, symbol: 'A', content: '', is_correct_ans: true})
        }
        state.changed = false

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
    case HANDLE_CHANGE:
      state.data.question[action.field] = action.value
      state.body.exam_question[action.field] = action.value
      state.changed = true
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
      state.changed = true

      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case HANDLE_DELETE_CHOICE:
      const defaultCharCode = 65

      const order = action.order
      const options = state.data.question.exam_question_choices
      options.splice(order, 1)

      for (let counter = order; counter < options.length; counter++) {
        options[counter].symbol = String.fromCharCode(defaultCharCode + counter)
      }
      state.body.exam_question.exam_question_choices_attributes = options
      state.changed = true

      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case HANDLE_ADD_CHOICE:
      const initialCharCode = 65
      const choices = state.data.question.exam_question_choices
      const symbol = String.fromCharCode(initialCharCode + choices.length)

      choices.push({id: null, symbol: symbol, content: '', is_correct_ans: false})
      state.body.exam_question.exam_question_choices_attributes = choices

      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case HANDLE_CHANGE_CONTENT:
      state.data.question.exam_question_choices[action.order].content = action.value
      state.body.exam_question.exam_question_choices_attributes[action.order].content = action.value
      state.changed = true

      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case HANDLE_ADD_IMAGE_QUESTION:
      const base64 = action.value.split(",")[1]
      state.data.question.image_urls.splice(0,1,{doc_aws_url: action.value})
      state.body.exam_question.image_sources.splice(0,1,{src: base64})
      state.changed = true

      return {
        ...state,
        loaded: true,
        loading:false,
      }
    case QUESTION_SELECTED:
    let data = action.data
    state.data.question = {
      basic_comp_id: data.basic_comp_id,
      exam_id: data.exam_id,
      exam_question_choices: data.exam_question_choices,
      id: data.id,
      image_urls: data.image_urls,
      problem_type: data.problem_type,
      problem_type_text: data.problem_type_text,
      qn_number: state.data.question.qn_number,
      question: data.question,
      school_subject_id: data.school_subject_id,
      weight: data.weight,
    }

    data.exam_question_choices.map(choice => {
      choice.id = null
      delete choice.image_urls
    })

    let body = {
      exam_question: {
        qn_number: state.data.question.qn_number,
        problem_type: data.problem_type,
        question: data.question,
        weight: data.weight,
        basic_comp_id: data.basic_comp_id,
        image_sources: [],
        exam_question_choices_attributes: [{id: null, symbol: 'A', content: '', is_correct_ans: true}]
      }
    }
    if (state.data.question.exam_question_choices.length) {
      body.exam_question.exam_question_choices_attributes = data.exam_question_choices
    }
    else {
      data.exam_question_choices.push({id: null, symbol: 'A', content: '', is_correct_ans: true})
    }

    state.body = body
    state.changed = true

    return {
      ...state,
      loaded: true,
      loading:false,
    }

    case HANDLE_DELETE_IMAGE:
      const images = state.data.question.image_urls
      images.splice(0, 1)
      state.body.exam_question.image_sources = [{src: ''}]
      state.changed = true
    return {
      ...state,
      loaded: true,
      loading:false,
    }

    case HANDLE_SUCCESS:
      state.success = action.value
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

export function onChange({field, value}) {
  return {
    type: HANDLE_CHANGE,
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

export function deleteChoiceHandler({order}) {
  return {
    type: HANDLE_DELETE_CHOICE,
    order: order
  }
}

export function addChoiceHandler() {
  return {
    type: HANDLE_ADD_CHOICE,
  }
}

export function onChangeContent({order, value}) {
  return {
    type: HANDLE_CHANGE_CONTENT,
    order: order,
    value: value
  }
}

export function onAddImageQuestion({base64}) {
  return {
    type: HANDLE_ADD_IMAGE_QUESTION,
    value: base64
  }
}

export function handleSuccess(value) {
  return {
    type: HANDLE_SUCCESS,
    value: value
  }
}


export function onQuestionSelected({data}) {
  return {
    type: QUESTION_SELECTED,
    data: data
  }
}

export function deleteImage() {
  return {
    type: HANDLE_DELETE_IMAGE,
  }
}

export function reset() {

  return {
    type: RESET
  }
}

