import { _ } from 'lodash'

  export const getTotalScheduleBreaks = async ({ state, effects }) => {
    const { scheduleBreaks } = await effects.gql.queries.scheduleBreaks()

    state.scheduleBreaks.totalRecords = scheduleBreaks ? scheduleBreaks.length : 0
  }

  export const getScheduleBreaks = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.scheduleBreaks.scheduleBreakPerPage,
        skip: (state.scheduleBreaks.activePage - 1) * state.scheduleBreaks.scheduleBreakPerPage
      }
    }
    //
    const { scheduleBreaks } = await effects.gql.queries.scheduleBreaks(options)
    if (data && data.getValues) return scheduleBreaks
    else state.scheduleBreaks.scheduleBreaks = _.keyBy(scheduleBreaks, 'id')
  }

  export const saveScheduleBreak = async ({ effects }, data) => {
    return await effects.gql.mutations.saveScheduleBreak(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.scheduleBreaks.activePage = page
  }

  export const onScheduleBreakAdded = ({ state }, data) => {
    state.scheduleBreaks.push(data)
  }
  