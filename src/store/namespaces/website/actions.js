import { _ } from 'lodash'

  export const getTotalWebsites = async ({ state, effects }) => {
    const { websites } = await effects.gql.queries.websites()

    state.websites.totalRecords = websites ? websites.length : 0
  }

  export const getWebsites = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.websites.websitePerPage,
        skip: (state.websites.activePage - 1) * state.websites.websitePerPage
      }
    }
    //
    const { websites } = await effects.gql.queries.websites(options)
    if (data && data.getValues) return websites
    else state.websites.websites = _.keyBy(websites, 'id')
  }

  export const saveWebsite = async ({ effects }, data) => {
    return await effects.gql.mutations.saveWebsite(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.websites.activePage = page
  }

  export const onWebsiteAdded = ({ state }, data) => {
    state.websites.push(data)
  }
  