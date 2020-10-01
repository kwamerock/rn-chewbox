export const state = {
    geoLocs: {},
    currentGeoLocId: null,
    geoLocPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    geoLocsList: state =>
      Object.values(state.geoLocs)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.geoLocPerPage)
  }