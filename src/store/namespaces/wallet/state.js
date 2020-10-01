export const state = {
    wallets: {},
    isLoading: false,
    currentWalletId: null,
    walletPerPage: 10,
    totalRecords: 10,
    activePage: 1,
    walletsList: state =>
      Object.values(state.wallet.wallets)
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1
          } else if (a.createdAt < b.createdAt) {
            return -1
          }

          return 0
        })
        .slice(0, state.walletPerPage)
  }