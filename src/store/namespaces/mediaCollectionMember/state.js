export const state = {
    mediaCollectionMembers: {},
    currentMediaCollectionMemberId: null,
    mediaCollectionMemberPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    mediaCollectionMembersList: state =>
      Object.values(state.mediaCollectionMembers)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.mediaCollectionMemberPerPage)
  }