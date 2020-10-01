export const state = {
    services: {},
    currentServiceId: null,
    servicePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    servicesList: state =>
      Object.values(state.services)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.servicePerPage)
  }