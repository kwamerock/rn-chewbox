import { _ } from 'lodash'

  export const getTotalPayments = async ({ state, effects }) => {
    const { payments } = await effects.gql.queries.payments()

    state.payments.totalRecords = payments ? payments.length : 0
  }

  export const getPayments = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.payments.paymentPerPage,
        skip: (state.payments.activePage - 1) * state.payments.paymentPerPage
      }
    }
    //
    const { payments } = await effects.gql.queries.payments(options)
    if (data && data.getValues) return payments
    else state.payments.payments = _.keyBy(payments, 'id')
  }

  export const savePayment = async ({ effects }, data) => {
    return await effects.gql.mutations.savePayment(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.payments.activePage = page
  }

  export const onPaymentAdded = ({ state }, data) => {
    state.payments.push(data)
  }
  