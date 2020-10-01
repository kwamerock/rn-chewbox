export const state = {
    surveys: {},
    currentSurveyId: null,
    surveyPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    surveysList: state =>
      Object.values(state.surveys)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.surveyPerPage)
  }