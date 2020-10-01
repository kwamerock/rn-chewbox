export const state = {
    websites: {},
    currentWebsiteId: null,
    websitePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    websitesList: state =>
      Object.values(state.websites)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.websitePerPage)
  }