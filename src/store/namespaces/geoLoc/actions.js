import { _ } from 'lodash'

  export const getTotalGeoLocs = async ({ state, effects }) => {
    const { geoLocs } = await effects.gql.queries.geoLocs()

    state.geoLocs.totalRecords = geoLocs ? geoLocs.length : 0
  }

  export const getGeoLocs = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.geoLocs.geoLocPerPage,
        skip: (state.geoLocs.activePage - 1) * state.geoLocs.geoLocPerPage
      }
    }
    //
    const { geoLocs } = await effects.gql.queries.geoLocs(options)
    if (data && data.getValues) return geoLocs
    else state.geoLocs.geoLocs = _.keyBy(geoLocs, 'id')
  }

  export const saveGeoLoc = async ({ effects }, data) => {
    return await effects.gql.mutations.saveGeoLoc(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.geoLocs.activePage = page
  }

  export const onGeoLocAdded = ({ state }, data) => {
    state.geoLocs.push(data)
  }
  