export const state = {
    companies: {},
    currentCompanyId: null,
    companyPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    companiesList: state =>
      Object.values(state.companies)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.companyPerPage)
  }