export const state = {
    surveyQuestions: {},
    currentSurveyQuestionId: null,
    surveyQuestionPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    surveyQuestionsList: state =>
      Object.values(state.surveyQuestions)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.surveyQuestionPerPage)
  }