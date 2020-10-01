import { _ } from 'lodash'

  export const getTotalResumeTypes = async ({ state, effects }) => {
    const { resumeTypes } = await effects.gql.queries.resumeTypes()

    state.resumeTypes.totalRecords = resumeTypes ? resumeTypes.length : 0
  }

  export const getResumeTypes = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.resumeTypes.resumeTypePerPage,
        skip: (state.resumeTypes.activePage - 1) * state.resumeTypes.resumeTypePerPage
      }
    }
    //
    const { resumeTypes } = await effects.gql.queries.resumeTypes(options)
    if (data && data.getValues) return resumeTypes
    else state.resumeTypes.resumeTypes = _.keyBy(resumeTypes, 'id')
  }

  export const saveresumeType = async ({ effects }, data) => {
    return await effects.gql.mutations.saveresumeType(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.resumeTypes.activePage = page
  }

  export const onresumeTypeAdded = ({ state }, data) => {
    state.resumeTypes.push(data)
  }
  