export const state = {
    permissions: {},
    currentPermissionId: null,
    permissionPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    permissionsList: state =>
      Object.values(state.permissions)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.permissionPerPage)
  }