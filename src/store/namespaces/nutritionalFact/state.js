export const state = {
    nutritionalFacts: {},
    currentNutritionalFactId: null,
    nutritionalFactPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    nutritionalFactsList: state =>
      Object.values(state.nutritionalFacts)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.nutritionalFactPerPage)
  }