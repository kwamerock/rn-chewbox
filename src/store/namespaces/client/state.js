export const state = {
    clients: {},
    currentClientId: null,
    clientPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    clientsList: state =>
      Object.values(state.clients)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.clientPerPage)
  }