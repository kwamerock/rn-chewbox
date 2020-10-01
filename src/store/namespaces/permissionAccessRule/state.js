export const state = {
    permissionAccessRules: {},
    currentPermissionAccessRuleId: null,
    permissionAccessRulePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    permissionAccessRulesList: state =>
      Object.values(state.permissionAccessRules)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.permissionAccessRulePerPage)
  }