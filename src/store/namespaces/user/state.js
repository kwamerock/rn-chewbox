export const state = {
    users: {},
    isLoading: false,
    currentUserId: null,
    userPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    userList: userNamespace =>
      Object.values(userNamespace.users)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          } else if (a.createdAt < b.createdAt) {
            return -1;
          }
          return 0;
        })
        .slice(0, userNamespace.userPerPage)
  }