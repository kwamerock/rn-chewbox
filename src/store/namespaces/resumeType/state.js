export const state = {
    resumeTypes: {},
    currentresumeTypeId: null,
    resumeTypePerPage: 10,
    totalRecords: 10,
    activePage: 1,
    resumeTypesList: state =>
      Object.values(state.resumeTypes)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.resumeTypePerPage)
  }