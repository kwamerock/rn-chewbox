export const state = {
    orders: {},
    isLoading: false,
    currentOrderId: null,
    orderPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    ordersList: orderNamespace =>
      Object.values(orderNamespace.orders)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, orderNamespace.orderPerPage)
  }