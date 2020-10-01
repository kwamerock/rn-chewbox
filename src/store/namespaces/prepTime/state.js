export const state = {
    prepTimes: {},
    currentPrepTimeId: null,
    prepTimePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    prepTimesList: state =>
      Object.values(state.prepTimes)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.prepTimePerPage)
  }