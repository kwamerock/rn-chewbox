export const state = {
    processData: {},
    currentProcessDataId: null,
    processDataPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    processDataList: state =>
      Object.values(state.processData)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.processDataPerPage)
  }