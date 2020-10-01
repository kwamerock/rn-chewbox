export const state = {
    pricings: {},
    currentPricingId: null,
    pricingPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    pricingsList: state =>
      Object.values(state.pricings)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.pricingPerPage)
  }