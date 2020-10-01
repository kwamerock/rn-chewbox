import { _ } from 'lodash'

  export const getTotalArticles = async ({ state, effects }) => {
    const { articles } = await effects.gql.queries.articles()

    state.articles.totalRecords = articles ? articles.length : 0
  }

  export const getArticles = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.articles.articlePerPage,
        skip: (state.articles.activePage - 1) * state.articles.articlePerPage
      }
    }
    //
    const { articles } = await effects.gql.queries.articles(options)
    if (data && data.getValues) return articles
    else state.articles.articles = _.keyBy(articles, 'id')
  }

  export const saveArticle = async ({ effects }, data) => {
    return await effects.gql.mutations.saveArticle(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.articles.activePage = page
  }

  export const onArticleAdded = ({ state }, data) => {
    state.articles.push(data)
  }
  