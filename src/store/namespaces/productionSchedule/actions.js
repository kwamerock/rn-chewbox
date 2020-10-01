import { _ } from 'lodash'

  export const getTotalProductionSchedules = async ({ state, effects }) => {
    const { productionSchedules } = await effects.gql.queries.productionSchedules()

    state.productionSchedules.totalRecords = productionSchedules ? productionSchedules.length : 0
  }

  export const getProductionSchedules = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.productionSchedules.productionSchedulePerPage,
        skip: (state.productionSchedules.activePage - 1) * state.productionSchedules.productionSchedulePerPage
      }
    }
    //
    const { productionSchedules } = await effects.gql.queries.productionSchedules(options)
    if (data && data.getValues) return productionSchedules
    else state.productionSchedules.productionSchedules = _.keyBy(productionSchedules, 'id')
  }

  export const saveProductionSchedule = async ({ effects }, data) => {
    return await effects.gql.mutations.saveProductionSchedule(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.productionSchedules.activePage = page
  }

  export const onProductionScheduleAdded = ({ state }, data) => {
    state.productionSchedules.push(data)
  }
  