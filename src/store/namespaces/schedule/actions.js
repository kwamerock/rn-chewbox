import { _ } from 'lodash'

  export const getTotalSchedules = async ({ state, effects }) => {
    const { schedules } = await effects.gql.queries.schedules()

    state.schedules.totalRecords = schedules ? schedules.length : 0
  }

  export const getSchedules = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.schedules.schedulePerPage,
        skip: (state.schedules.activePage - 1) * state.schedules.schedulePerPage
      }
    }
    //
    const { schedules } = await effects.gql.queries.schedules(options)
    if (data && data.getValues) return schedules
    else state.schedules.schedules = _.keyBy(schedules, 'id')
  }

  export const saveSchedule = async ({ effects }, data) => {
    return await effects.gql.mutations.saveSchedule(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.schedules.activePage = page
  }

  export const onScheduleAdded = ({ state }, data) => {
    state.schedules.push(data)
  }
  