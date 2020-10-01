import { keyBy, isEmpty } from 'lodash';

  export const getTotalOrders = async ({ state, effects }) => {
    const { orders } = await effects.gql.queries.orders()

    state.order.totalRecords = orders ? orders.length : 0
  }

  export const getOrders = async ({ state, effects }, data) => {
    console.log(data, 'data getOrders');
    let options = {};

    if(isEmpty(data)) {
      options = {
        first: state.order.orderPerPage,
        skip: (state.order.activePage - 1) * state.order.orderPerPage
      }
    } else {
      options = data;
      if(!data.first) options.first = state.order.orderPerPage;
      if(!data.skip) options.skip = (state.order.activePage - 1) * state.order.orderPerPage;
    }

    //
    console.log(options, 'options getOrders');
    const { orders } = await effects.gql.queries.orders(options)
    state.order.orders = keyBy(orders, 'id');
  }

  export const saveOrder = async ({ effects }, data) => {
    return await effects.gql.mutations.saveOrder(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.order.activePage = page
  }

  export const onOrderAdded = ({ state }, data) => {
    state.order.push(data)
  }
  