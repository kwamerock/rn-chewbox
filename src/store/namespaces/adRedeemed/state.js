export const state = {
    adRedeemeds: {},
    currentAdRedeemedId: null,
    adRedeemedPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    adRedeemedsList: state =>
      Object.values(state.adRedeemeds)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.adRedeemedPerPage)
  }