export const state = {
    inventoryProducts: {},
    currentInventoryProductId: null,
    inventoryProductPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    inventoryProductsList: state =>
      Object.values(state.inventoryProducts)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.inventoryProductPerPage)
  }