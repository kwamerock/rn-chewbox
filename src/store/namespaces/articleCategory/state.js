export const state = {
    articleCategories: {},
    currentArticleCategoryId: null,
    articleCategoryPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    articleCategoriesList: state =>
      Object.values(state.articleCategories)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.articleCategoryPerPage)
  }