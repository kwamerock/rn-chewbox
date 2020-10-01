import { _ } from 'lodash'

  export const getTotalCampaignLocations = async ({ state, effects }) => {
    const { campaignLocations } = await effects.gql.queries.campaignLocations()

    state.campaignLocations.totalRecords = campaignLocations ? campaignLocations.length : 0
  }

  export const getCampaignLocations = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.campaignLocations.campaignLocationPerPage,
        skip: (state.campaignLocations.activePage - 1) * state.campaignLocations.campaignLocationPerPage
      }
    }
    //
    const { campaignLocations } = await effects.gql.queries.campaignLocations(options)
    if (data && data.getValues) return campaignLocations
    else state.campaignLocations.campaignLocations = _.keyBy(campaignLocations, 'id')
  }

  export const saveCampaignLocation = async ({ effects }, data) => {
    return await effects.gql.mutations.saveCampaignLocation(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.campaignLocations.activePage = page
  }

  export const onCampaignLocationAdded = ({ state }, data) => {
    state.campaignLocations.push(data)
  }
  