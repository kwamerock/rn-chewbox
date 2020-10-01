import { _ } from 'lodash'

  export const getTotalMedia = async ({ state, effects }) => {
    const { media } = await effects.gql.queries.media()

    state.media.totalRecords = media ? media.length : 0
  }

  export const getMedia = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.media.mediaPerPage,
        skip: (state.media.activePage - 1) * state.media.mediaPerPage
      }
    }
    //
    const { media } = await effects.gql.queries.media(options)
    if (data && data.getValues) return media
    else state.media.media = _.keyBy(media, 'id')
  }

  export const saveMedia = async ({ effects }, data) => {
    return await effects.gql.mutations.saveMedia(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.media.activePage = page
  }

  export const onMediaAdded = ({ state }, data) => {
    state.media.push(data)
  }
  