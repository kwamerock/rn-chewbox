export const state = {
    menuItems: {},
    currentMenuItemId: null,
    menuItemPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    menuItemsList: state =>
      Object.values(state.menuItems)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.menuItemPerPage)
  }