export const state = {
    ingredients: {},
    currentIngredientId: null,
    ingredientPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    ingredientsList: state =>
      Object.values(state.ingredients)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.ingredientPerPage)
  }