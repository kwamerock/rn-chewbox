import { _ } from 'lodash'

  export const getTotalSurveyQuestions = async ({ state, effects }) => {
    const { surveyQuestions } = await effects.gql.queries.surveyQuestions()

    state.surveyQuestions.totalRecords = surveyQuestions ? surveyQuestions.length : 0
  }

  export const getSurveyQuestions = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.surveyQuestions.surveyQuestionPerPage,
        skip: (state.surveyQuestions.activePage - 1) * state.surveyQuestions.surveyQuestionPerPage
      }
    }
    //
    const { surveyQuestions } = await effects.gql.queries.surveyQuestions(options)
    if (data && data.getValues) return surveyQuestions
    else state.surveyQuestions.surveyQuestions = _.keyBy(surveyQuestions, 'id')
  }

  export const saveSurveyQuestion = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSurveyQuestion(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.surveyQuestions.activePage = page
  }

  export const onSurveyQuestionAdded = ({ state }, data) => {
    state.surveyQuestions.push(data)
  }
  