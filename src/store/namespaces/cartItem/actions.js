import { _ } from 'lodash'

  export const getTotalCartItems = async ({ state, effects }) => {
    const { cartItems } = await effects.gql.queries.cartItems()

    state.cartItems.totalRecords = cartItems ? cartItems.length : 0
  }

  export const getCartItems = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.cartItems.cartItemPerPage,
        skip: (state.cartItems.activePage - 1) * state.cartItems.cartItemPerPage
      }
    }
    //
    const { cartItems } = await effects.gql.queries.cartItems(options)
    if (data && data.getValues) return cartItems
    else state.cartItems.cartItems = _.keyBy(cartItems, 'id')
  }

  export const saveCartItem = async ({ effects }, data) => {
    return await effects.gql.mutations.saveCartItem(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.cartItems.activePage = page
  }

  export const onCartItemAdded = ({ state }, data) => {
    state.cartItems.push(data)
  }
  