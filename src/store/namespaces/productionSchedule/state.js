export const state = {
    productionSchedules: {},
    currentProductionScheduleId: null,
    productionSchedulePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    productionSchedulesList: state =>
      Object.values(state.productionSchedules)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.productionSchedulePerPage)
  }