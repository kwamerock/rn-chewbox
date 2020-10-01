export const state = {
    permissionCollections: {},
    currentPermissionCollectionId: null,
    permissionCollectionPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    permissionCollectionsList: state =>
      Object.values(state.permissionCollections)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.permissionCollectionPerPage)
  }