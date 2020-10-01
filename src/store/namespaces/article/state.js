export const state = {
    articles: {},
    currentArticleId: null,
    articlePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    articlesList: state =>
      Object.values(state.articles)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.articlePerPage)
  }