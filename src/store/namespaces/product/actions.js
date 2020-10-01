import { keyBy } from 'lodash'

export const getTotalProducts = async ({ state, effects }) => {
  const { products } = await effects.gql.queries.products()

  state.products.totalRecords = products ? products.length : 0
}

export const getProducts = async ({ state, effects }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.product.productPerPage,
      skip: (state.product.activePage - 1) * state.product.productPerPage
    }
  }
  //
  const { products } = await effects.gql.queries.products(options)
  if (data && data.getValues) return products
  else state.product.products = keyBy(products, 'id')
}

export const saveProduct = async ({ effects }, data) => {
  return await effects.gql.mutations.saveProduct(data)
}

export const onChangePage = async ({ state }, page) => {
  state.products.activePage = page
}

export const onProductAdded = ({ state }, data) => {
  state.products.push(data)
}