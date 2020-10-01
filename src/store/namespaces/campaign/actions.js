import { _ } from 'lodash'

  export const getTotalCampaigns = async ({ state, effects }) => {
    const { campaigns } = await effects.gql.queries.campaigns()

    state.campaigns.totalRecords = campaigns ? campaigns.length : 0
  }

  export const getCampaigns = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.campaigns.campaignPerPage,
        skip: (state.campaigns.activePage - 1) * state.campaigns.campaignPerPage
      }
    }
    //
    const { campaigns } = await effects.gql.queries.campaigns(options)
    if (data && data.getValues) return campaigns
    else state.campaigns.campaigns = _.keyBy(campaigns, 'id')
  }

  export const saveCampaign = async ({ effects }, data) => {
    return await effects.gql.mutations.saveCampaign(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.campaigns.activePage = page
  }

  export const onCampaignAdded = ({ state }, data) => {
    state.campaigns.push(data)
  }
  