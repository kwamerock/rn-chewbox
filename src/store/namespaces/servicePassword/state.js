export const state = {
    servicePasswords: {},
    currentServicePasswordId: null,
    servicePasswordPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    servicePasswordsList: state =>
      Object.values(state.servicePasswords)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.servicePasswordPerPage)
  }