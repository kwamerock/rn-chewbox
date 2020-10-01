import { _ } from 'lodash'

  export const getTotalArticleCategories = async ({ state, effects }) => {
    const { articleCategories } = await effects.gql.queries.articleCategories()

    state.articleCategories.totalRecords = articleCategories ? articleCategories.length : 0
  }

  export const getArticleCategories = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.articleCategories.articleCategoryPerPage,
        skip: (state.articleCategories.activePage - 1) * state.articleCategories.articleCategoryPerPage
      }
    }
    //
    const { articleCategories } = await effects.gql.queries.articleCategories(options)
    if (data && data.getValues) return articleCategories
    else state.articleCategories.articleCategories = _.keyBy(articleCategories, 'id')
  }

  export const saveArticleCategory = async ({ effects }, data) => {
    return await effects.gql.mutations.saveArticleCategory(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.articleCategories.activePage = page
  }

  export const onArticleCategoryAdded = ({ state }, data) => {
    state.articleCategories.push(data)
  }
  