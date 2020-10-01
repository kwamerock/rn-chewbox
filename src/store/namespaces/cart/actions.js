import { _ } from 'lodash'

/*
*
*/
export const getTotalCarts = async ({ state, effects }) => {
  const { carts } = await effects.gql.queries.carts()

  state.cart.totalRecords = carts ? carts.length : 0
}

/*
*
*/
export const getCarts = async ({ state, effects }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.cart.cartPerPage,
      skip: (state.cart.activePage - 1) * state.cart.cartPerPage
    }
  }
  //
  const { carts } = await effects.gql.queries.carts(options)
  if (data && data.getValues) return carts
  else state.cart.carts = _.keyBy(carts, 'id')
}

/*
*
*/
export const saveCart = async ({ effects }, data) => {
  return await effects.gql.mutations.saveCart(data)
}

/*
*
*/
export const onChangePage = async ({ state }, page) => {
  state.cart.activePage = page
}

/*
*
*/
export const onCartAdded = ({ state }, data) => {
  state.cart.push(data)
}
  
/*
*
*/
export const isSoldOut = ({ state }, date) => {
  if(!date) date = state.dateSlider.selectedDate;
  const formattedDate = moment(date).format('YYYY-MM-DD');  
  return (Object.values(state.cart.soldOutDays).indexOf(formattedDate) >= 0) ? true : false;
}

/*
*
*/
export const setSoldOutDays = async ({ state, effects }) => {
  const days = await effects.gql.queries.soldOutDays();
  state.cart.soldOutDays = days;
}