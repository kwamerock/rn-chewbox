export const state = {
    adImpressions: {},
    currentAdImpressionId: null,
    adImpressionPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    adImpressionsList: state =>
      Object.values(state.adImpressions)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.adImpressionPerPage)
  }