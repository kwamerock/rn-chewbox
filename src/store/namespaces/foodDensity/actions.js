import { _ } from 'lodash'

  export const getTotalFoodDensities = async ({ state, effects }) => {
    const { foodDensities } = await effects.gql.queries.foodDensities()

    state.foodDensities.totalRecords = foodDensities ? foodDensities.length : 0
  }

  export const getFoodDensities = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.foodDensities.foodDensityPerPage,
        skip: (state.foodDensities.activePage - 1) * state.foodDensities.foodDensityPerPage
      }
    }
    //
    const { foodDensities } = await effects.gql.queries.foodDensities(options)
    if (data && data.getValues) return foodDensities
    else state.foodDensities.foodDensities = _.keyBy(foodDensities, 'id')
  }

  export const saveFoodDensity = async ({ effects }, data) => {
    return await effects.gql.mutations.saveFoodDensity(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.foodDensities.activePage = page
  }

  export const onFoodDensityAdded = ({ state }, data) => {
    state.foodDensities.push(data)
  }
  