export const state = {
    campaigns: {},
    currentCampaignId: null,
    campaignPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    campaignsList: state =>
      Object.values(state.campaigns)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.campaignPerPage)
  }