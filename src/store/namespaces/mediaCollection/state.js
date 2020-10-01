export const state = {
    mediaCollections: {},
    currentMediaCollectionId: null,
    mediaCollectionPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    mediaCollectionsList: state =>
      Object.values(state.mediaCollections)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.mediaCollectionPerPage)
  }