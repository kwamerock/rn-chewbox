import { _ } from 'lodash'

  export const getTotalSurveys = async ({ state, effects }) => {
    const { surveys } = await effects.gql.queries.surveys()

    state.surveys.totalRecords = surveys ? surveys.length : 0
  }

  export const getSurveys = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.surveys.surveyPerPage,
        skip: (state.surveys.activePage - 1) * state.surveys.surveyPerPage
      }
    }
    //
    const { surveys } = await effects.gql.queries.surveys(options)
    if (data && data.getValues) return surveys
    else state.surveys.surveys = _.keyBy(surveys, 'id')
  }

  export const saveSurvey = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSurvey(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.surveys.activePage = page
  }

  export const onSurveyAdded = ({ state }, data) => {
    state.surveys.push(data)
  }
  