export const state = {
    equipment: {},
    currentEquipmentId: null,
    equipmentPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    equipmentList: state =>
      Object.values(state.equipment)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.equipmentPerPage)
  }