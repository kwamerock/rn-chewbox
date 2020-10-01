export const state = {
    productTasks: {},
    currentProductTaskId: null,
    productTaskPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    productTasksList: state =>
      Object.values(state.productTasks)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.productTaskPerPage)
  }