import { _ } from 'lodash'

  export const getTotalInventoryStocks = async ({ state, effects }) => {
    const { inventoryStocks } = await effects.gql.queries.inventoryStocks()

    state.inventoryStocks.totalRecords = inventoryStocks ? inventoryStocks.length : 0
  }

  export const getInventoryStocks = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.inventoryStocks.inventoryStockPerPage,
        skip: (state.inventoryStocks.activePage - 1) * state.inventoryStocks.inventoryStockPerPage
      }
    }
    //
    const { inventoryStocks } = await effects.gql.queries.inventoryStocks(options)
    if (data && data.getValues) return inventoryStocks
    else state.inventoryStocks.inventoryStocks = _.keyBy(inventoryStocks, 'id')
  }

  export const saveInventoryStock = async ({ effects }, data) => {
    return await effects.gql.mutations.saveInventoryStock(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.inventoryStocks.activePage = page
  }

  export const onInventoryStockAdded = ({ state }, data) => {
    state.inventoryStocks.push(data)
  }
  