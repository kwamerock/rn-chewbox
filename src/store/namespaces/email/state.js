export const state = {
    emails: {},
    currentEmailId: null,
    emailPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    emailsList: state =>
      Object.values(state.emails)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.emailPerPage)
  }