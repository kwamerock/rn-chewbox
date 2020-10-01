export const state = {
    adImages: {},
    currentAdImageId: null,
    adImagePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    adImagesList: state =>
      Object.values(state.adImages)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.adImagePerPage)
  }