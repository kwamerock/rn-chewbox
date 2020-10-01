import { _ } from 'lodash'

  export const getTotalEventDays = async ({ state, effects }) => {
    const { eventDays } = await effects.gql.queries.eventDays()

    state.eventDays.totalRecords = eventDays ? eventDays.length : 0
  }

  export const getEventDays = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.eventDays.eventDayPerPage,
        skip: (state.eventDays.activePage - 1) * state.eventDays.eventDayPerPage
      }
    }
    //
    const { eventDays } = await effects.gql.queries.eventDays(options)
    if (data && data.getValues) return eventDays
    else state.eventDays.eventDays = _.keyBy(eventDays, 'id')
  }

  export const saveEventDay = async ({ effects }, data) => {
    return await effects.gql.mutations.saveEventDay(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.eventDays.activePage = page
  }

  export const onEventDayAdded = ({ state }, data) => {
    state.eventDays.push(data)
  }
  