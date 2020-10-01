import { _ } from 'lodash'

  export const getTotalUserSurveys = async ({ state, effects }) => {
    const { userSurveys } = await effects.gql.queries.userSurveys()

    state.userSurveys.totalRecords = userSurveys ? userSurveys.length : 0
  }

  export const getUserSurveys = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.userSurveys.userSurveyPerPage,
        skip: (state.userSurveys.activePage - 1) * state.userSurveys.userSurveyPerPage
      }
    }
    //
    const { userSurveys } = await effects.gql.queries.userSurveys(options)
    if (data && data.getValues) return userSurveys
    else state.userSurveys.userSurveys = _.keyBy(userSurveys, 'id')
  }

  export const saveUserSurvey = async ({ effects }, data) => {
    return await effects.gql.mutations.saveUserSurvey(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.userSurveys.activePage = page
  }

  export const onUserSurveyAdded = ({ state }, data) => {
    state.userSurveys.push(data)
  }
  