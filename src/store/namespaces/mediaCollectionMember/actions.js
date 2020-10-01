import { _ } from 'lodash'

  export const getTotalMediaCollectionMembers = async ({ state, effects }) => {
    const { mediaCollectionMembers } = await effects.gql.queries.mediaCollectionMembers()

    state.mediaCollectionMembers.totalRecords = mediaCollectionMembers ? mediaCollectionMembers.length : 0
  }

  export const getMediaCollectionMembers = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.mediaCollectionMembers.mediaCollectionMemberPerPage,
        skip: (state.mediaCollectionMembers.activePage - 1) * state.mediaCollectionMembers.mediaCollectionMemberPerPage
      }
    }
    //
    const { mediaCollectionMembers } = await effects.gql.queries.mediaCollectionMembers(options)
    if (data && data.getValues) return mediaCollectionMembers
    else state.mediaCollectionMembers.mediaCollectionMembers = _.keyBy(mediaCollectionMembers, 'id')
  }

  export const saveMediaCollectionMember = async ({ effects }, data) => {
    return await effects.gql.mutations.saveMediaCollectionMember(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.mediaCollectionMembers.activePage = page
  }

  export const onMediaCollectionMemberAdded = ({ state }, data) => {
    state.mediaCollectionMembers.push(data)
  }
  