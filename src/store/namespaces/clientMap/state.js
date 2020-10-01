export const state = {
    clientMaps: {},
    currentClientMapId: null,
    clientMapPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    clientMapsList: state =>
      Object.values(state.clientMaps)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.clientMapPerPage)
  }