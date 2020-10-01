import { _ } from 'lodash'

  export const getTotalProductTasks = async ({ state, effects }) => {
    const { productTasks } = await effects.gql.queries.productTasks()

    state.productTasks.totalRecords = productTasks ? productTasks.length : 0
  }

  export const getProductTasks = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.productTasks.productTaskPerPage,
        skip: (state.productTasks.activePage - 1) * state.productTasks.productTaskPerPage
      }
    }
    //
    const { productTasks } = await effects.gql.queries.productTasks(options)
    if (data && data.getValues) return productTasks
    else state.productTasks.productTasks = _.keyBy(productTasks, 'id')
  }

  export const saveProductTask = async ({ effects }, data) => {
    return await effects.gql.mutations.saveProductTask(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.productTasks.activePage = page
  }

  export const onProductTaskAdded = ({ state }, data) => {
    state.productTasks.push(data)
  }
  