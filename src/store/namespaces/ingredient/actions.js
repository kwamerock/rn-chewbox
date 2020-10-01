import { _ } from 'lodash'

  export const getTotalIngredients = async ({ state, effects }) => {
    const { ingredients } = await effects.gql.queries.ingredients()

    state.ingredients.totalRecords = ingredients ? ingredients.length : 0
  }

  export const getIngredients = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.ingredients.ingredientPerPage,
        skip: (state.ingredients.activePage - 1) * state.ingredients.ingredientPerPage
      }
    }
    //
    const { ingredients } = await effects.gql.queries.ingredients(options)
    if (data && data.getValues) return ingredients
    else state.ingredients.ingredients = _.keyBy(ingredients, 'id')
  }

  export const saveIngredient = async ({ effects }, data) => {
    return await effects.gql.mutations.saveIngredient(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.ingredients.activePage = page
  }

  export const onIngredientAdded = ({ state }, data) => {
    state.ingredients.push(data)
  }
  