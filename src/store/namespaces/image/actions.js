import { _ } from 'lodash'

  export const getTotalImages = async ({ state, effects }) => {
    const { images } = await effects.gql.queries.images()

    state.images.totalRecords = images ? images.length : 0
  }

  export const getImages = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.images.imagePerPage,
        skip: (state.images.activePage - 1) * state.images.imagePerPage
      }
    }
    //
    const { images } = await effects.gql.queries.images(options)
    if (data && data.getValues) return images
    else state.images.images = _.keyBy(images, 'id')
  }

  export const saveImage = async ({ effects }, data) => {
    return await effects.gql.mutations.saveImage(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.images.activePage = page
  }

  export const onImageAdded = ({ state }, data) => {
    state.images.push(data)
  }
  