import { _ } from 'lodash'

/*
*
*/
export const getTotalComments = async ({ state, effects }) => {
  const { comments } = await effects.gql.queries.comments()

  state.comments.totalRecords = comments ? comments.length : 0
}

/*
*
*/
export const getComments = async ({ state, effects, actions }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.comments.commentPerPage,
      skip: (state.comments.activePage - 1) * state.comments.commentPerPage
    }
  }
  //
  const { comments } = await effects.gql.queries.comments(options)
  if (data && data.getValues) return comments
  else state.comments.comments = _.keyBy(comments, 'id');
}

/*
*
*/
export const saveComment = async ({ effects }, data) => {
  return await effects.gql.mutations.saveComment(data)
}

/*
*
*/
export const onChangePage = async ({ state }, page) => {
  state.comments.activePage = page
}

/*
*
*/
export const onCommentAdded = ({ state }, data) => {
  state.comments.push(data)
}

/*
*
*/
export const markNotificationRead = ({ state }, data) => {
}
