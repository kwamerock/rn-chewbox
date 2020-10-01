import { _ } from 'lodash'

  export const getTotalInventoryVendors = async ({ state, effects }) => {
    const { inventoryVendors } = await effects.gql.queries.inventoryVendors()

    state.inventoryVendors.totalRecords = inventoryVendors ? inventoryVendors.length : 0
  }

  export const getInventoryVendors = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.inventoryVendors.inventoryVendorPerPage,
        skip: (state.inventoryVendors.activePage - 1) * state.inventoryVendors.inventoryVendorPerPage
      }
    }
    //
    const { inventoryVendors } = await effects.gql.queries.inventoryVendors(options)
    if (data && data.getValues) return inventoryVendors
    else state.inventoryVendors.inventoryVendors = _.keyBy(inventoryVendors, 'id')
  }

  export const saveInventoryVendor = async ({ effects }, data) => {
    return await effects.gql.mutations.saveInventoryVendor(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.inventoryVendors.activePage = page
  }

  export const onInventoryVendorAdded = ({ state }, data) => {
    state.inventoryVendors.push(data)
  }
  