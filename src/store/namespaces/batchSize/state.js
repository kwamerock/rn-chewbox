export const state = {
    batchSizes: {},
    currentBatchSizeId: null,
    batchSizePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    batchSizesList: state =>
      Object.values(state.batchSizes)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.batchSizePerPage)
  }