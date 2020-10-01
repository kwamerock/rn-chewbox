import { _ } from 'lodash'

  export const getTotalInventoryProducts = async ({ state, effects }) => {
    const { inventoryProducts } = await effects.gql.queries.inventoryProducts()

    state.inventoryProducts.totalRecords = inventoryProducts ? inventoryProducts.length : 0
  }

  export const getInventoryProducts = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.inventoryProducts.inventoryProductPerPage,
        skip: (state.inventoryProducts.activePage - 1) * state.inventoryProducts.inventoryProductPerPage
      }
    }
    //
    const { inventoryProducts } = await effects.gql.queries.inventoryProducts(options)
    if (data && data.getValues) return inventoryProducts
    else state.inventoryProducts.inventoryProducts = _.keyBy(inventoryProducts, 'id')
  }

  export const saveInventoryProduct = async ({ effects }, data) => {
    return await effects.gql.mutations.saveInventoryProduct(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.inventoryProducts.activePage = page
  }

  export const onInventoryProductAdded = ({ state }, data) => {
    state.inventoryProducts.push(data)
  }
  