import { _ } from 'lodash'

  export const getTotalEmails = async ({ state, effects }) => {
    const { emails } = await effects.gql.queries.emails()

    state.emails.totalRecords = emails ? emails.length : 0
  }

  export const getEmails = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.emails.emailPerPage,
        skip: (state.emails.activePage - 1) * state.emails.emailPerPage
      }
    }
    //
    const { emails } = await effects.gql.queries.emails(options)
    if (data && data.getValues) return emails
    else state.emails.emails = _.keyBy(emails, 'id')
  }

  export const saveEmail = async ({ effects }, data) => {
    return await effects.gql.mutations.saveEmail(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.emails.activePage = page
  }

  export const onEmailAdded = ({ state }, data) => {
    state.emails.push(data)
  }
  