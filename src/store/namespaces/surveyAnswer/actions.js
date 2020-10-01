import { _ } from 'lodash'

  export const getTotalSurveyAnswers = async ({ state, effects }) => {
    const { surveyAnswers } = await effects.gql.queries.surveyAnswers()

    state.surveyAnswers.totalRecords = surveyAnswers ? surveyAnswers.length : 0
  }

  export const getSurveyAnswers = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.surveyAnswers.surveyAnswerPerPage,
        skip: (state.surveyAnswers.activePage - 1) * state.surveyAnswers.surveyAnswerPerPage
      }
    }
    //
    const { surveyAnswers } = await effects.gql.queries.surveyAnswers(options)
    if (data && data.getValues) return surveyAnswers
    else state.surveyAnswers.surveyAnswers = _.keyBy(surveyAnswers, 'id')
  }

  export const saveSurveyAnswer = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSurveyAnswer(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.surveyAnswers.activePage = page
  }

  export const onSurveyAnswerAdded = ({ state }, data) => {
    state.surveyAnswers.push(data)
  }
  