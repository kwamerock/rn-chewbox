import { _ } from 'lodash'

  export const getTotalCompanies = async ({ state, effects }) => {
    const { companies } = await effects.gql.queries.companies()

    state.companies.totalRecords = companies ? companies.length : 0
  }

  export const getCompanies = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.companies.companyPerPage,
        skip: (state.companies.activePage - 1) * state.companies.companyPerPage
      }
    }
    //
    const { companies } = await effects.gql.queries.companies(options)
    if (data && data.getValues) return companies
    else state.companies.companies = _.keyBy(companies, 'id')
  }

  export const saveCompany = async ({ effects }, data) => {
    return await effects.gql.mutations.saveCompany(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.companies.activePage = page
  }

  export const onCompanyAdded = ({ state }, data) => {
    state.companies.push(data)
  }
  