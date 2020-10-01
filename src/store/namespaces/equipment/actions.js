import { _ } from 'lodash'

  export const getTotalEquipment = async ({ state, effects }) => {
    const { equipment } = await effects.gql.queries.equipment()

    state.equipment.totalRecords = equipment ? equipment.length : 0
  }

  export const getEquipment = async ({ state, effects }, data) => {
    let options = {}
    if (data && data.options) options = data.options
    else if (data && data.all) options = {}
    else {
      options = {
        first: state.equipment.equipmentPerPage,
        skip: (state.equipment.activePage - 1) * state.equipment.equipmentPerPage
      }
    }
    //
    const { equipment } = await effects.gql.queries.equipment(options)
    if (data && data.getValues) return equipment
    else state.equipment.equipment = _.keyBy(equipment, 'id')
  }

  export const saveEquipment = async ({ effects }, data) => {
    return await effects.gql.mutations.saveEquipment(data)
  }

  export const onChangePage = async ({ state }, page) => {
    state.equipment.activePage = page
  }

  export const onEquipmentAdded = ({ state }, data) => {
    state.equipment.push(data)
  }
  