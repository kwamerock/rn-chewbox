export const state = {
    campaignLocations: {},
    currentCampaignLocationId: null,
    campaignLocationPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    campaignLocationsList: state =>
      Object.values(state.campaignLocations)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.campaignLocationPerPage)
  }