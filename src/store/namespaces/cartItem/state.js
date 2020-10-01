export const state = {
    cartItems: {},
    currentCartItemId: null,
    cartItemPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    cartItemsList: state =>
      Object.values(state.cartItems)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.cartItemPerPage)
  }