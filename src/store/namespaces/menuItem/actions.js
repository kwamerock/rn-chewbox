import { _ } from 'lodash'

  export const getTotalMenuItems = async ({ state, effects }) => {
    const { menuItems } = await effects.gql.queries.menuItems()

    state.menuItems.totalRecords = menuItems ? menuItems.length : 0
  }

  export const getMenuItems = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.menuItems.menuItemPerPage,
        skip: (state.menuItems.activePage - 1) * state.menuItems.menuItemPerPage
      }
    }
    //
    const { menuItems } = await effects.gql.queries.menuItems(options)
    if (data && data.getValues) return menuItems
    else state.menuItems.menuItems = _.keyBy(menuItems, 'id')
  }

  export const saveMenuItem = async ({ effects }, data) => {
    return await effects.gql.mutations.saveMenuItem(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.menuItems.activePage = page
  }

  export const onMenuItemAdded = ({ state }, data) => {
    state.menuItems.push(data)
  }
  