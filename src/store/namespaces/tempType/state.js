export const state = {
    tempTypes: {},
    currentTempTypeId: null,
    tempTypePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    tempTypesList: state =>
      Object.values(state.tempTypes)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.tempTypePerPage)
  }