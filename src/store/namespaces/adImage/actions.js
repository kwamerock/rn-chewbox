import { _ } from 'lodash'

  export const getTotalAdImages = async ({ state, effects }) => {
    const { adImages } = await effects.gql.queries.adImages()

    state.adImages.totalRecords = adImages ? adImages.length : 0
  }

  export const getAdImages = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.adImages.adImagePerPage,
        skip: (state.adImages.activePage - 1) * state.adImages.adImagePerPage
      }
    }
    //
    const { adImages } = await effects.gql.queries.adImages(options)
    if (data && data.getValues) return adImages
    else state.adImages.adImages = _.keyBy(adImages, 'id')
  }

  export const saveAdImage = async ({ effects }, data) => {
    return await effects.gql.mutations.saveAdImage(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.adImages.activePage = page
  }

  export const onAdImageAdded = ({ state }, data) => {
    state.adImages.push(data)
  }
  