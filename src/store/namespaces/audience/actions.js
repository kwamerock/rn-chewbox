import { _ } from 'lodash'

  export const getTotalAudiences = async ({ state, effects }) => {
    const { audiences } = await effects.gql.queries.audiences()

    state.audiences.totalRecords = audiences ? audiences.length : 0
  }

  export const getAudiences = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.audiences.audiencePerPage,
        skip: (state.audiences.activePage - 1) * state.audiences.audiencePerPage
      }
    }
    //
    const { audiences } = await effects.gql.queries.audiences(options)
    if (data && data.getValues) return audiences
    else state.audiences.audiences = _.keyBy(audiences, 'id')
  }

  export const saveAudience = async ({ effects }, data) => {
    return await effects.gql.mutations.saveAudience(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.audiences.activePage = page
  }

  export const onAudienceAdded = ({ state }, data) => {
    state.audiences.push(data)
  }
  