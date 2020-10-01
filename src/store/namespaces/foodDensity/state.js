export const state = {
    foodDensities: {},
    currentFoodDensityId: null,
    foodDensityPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    foodDensitiesList: state =>
      Object.values(state.foodDensities)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.foodDensityPerPage)
  }