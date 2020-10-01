import { _ } from 'lodash'

  export const getTotalAds = async ({ state, effects }) => {
    const { ads } = await effects.gql.queries.ads()

    state.ads.totalRecords = ads ? ads.length : 0
  }

  export const getAds = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.ads.adPerPage,
        skip: (state.ads.activePage - 1) * state.ads.adPerPage
      }
    }
    //
    const { ads } = await effects.gql.queries.ads(options)
    if (data && data.getValues) return ads
    else state.ads.ads = _.keyBy(ads, 'id')
  }

  export const saveAd = async ({ effects }, data) => {
    return await effects.gql.mutations.saveAd(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.ads.activePage = page
  }

  export const onAdAdded = ({ state }, data) => {
    state.ads.push(data)
  }
  