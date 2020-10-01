import { _ } from 'lodash'

  export const getTotalNutritionalFacts = async ({ state, effects }) => {
    const { nutritionalFacts } = await effects.gql.queries.nutritionalFacts()

    state.nutritionalFacts.totalRecords = nutritionalFacts ? nutritionalFacts.length : 0
  }

  export const getNutritionalFacts = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.nutritionalFacts.nutritionalFactPerPage,
        skip: (state.nutritionalFacts.activePage - 1) * state.nutritionalFacts.nutritionalFactPerPage
      }
    }
    //
    const { nutritionalFacts } = await effects.gql.queries.nutritionalFacts(options)
    if (data && data.getValues) return nutritionalFacts
    else state.nutritionalFacts.nutritionalFacts = _.keyBy(nutritionalFacts, 'id')
  }

  export const saveNutritionalFact = async ({ effects }, data) => {
    return await effects.gql.mutations.saveNutritionalFact(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.nutritionalFacts.activePage = page
  }

  export const onNutritionalFactAdded = ({ state }, data) => {
    state.nutritionalFacts.push(data)
  }
  