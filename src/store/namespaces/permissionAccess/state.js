export const state = {
    permissionAccess: {},
    currentPermissionAccessId: null,
    permissionAccessPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    permissionAccessList: state =>
      Object.values(state.permissionAccess)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.permissionAccessPerPage)
  }