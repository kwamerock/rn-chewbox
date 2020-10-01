import { AppDetails } from '@/Config';
import * as internalActions from '@/store/internalActions';
import * as Storage from '@/utils/AsyncStorage';
import { isEmpty } from 'lodash';

const TOKEN_NAME = '@' + AppDetails.appName.toLowerCase().replace(/\s/g, '') + ':token';

export const internal = internalActions;

/*
*
*/
export const isProfileUnset = async ({ state }) => {
  const unset =
    isEmpty(state.currentUser.email) ||
    isEmpty(state.currentUser.fullName) ||
    isEmpty(state.currentUser.id)
  console.log(unset, 'unset')
  return unset;
};

/*
*
*/
export const createAppUser = async ({ state, effects }, variables) => {
  console.log('creating app user...', variables);

  const user = await effects.gql.mutations.createAppUser(variables);

  console.log('Login with code...', user.createAppUser.verificationCode);

  state.currentUser = user.createAppUser.user;
  return user.createAppUser;
};

/*
*
*/
export const verifySmsCode = async ({ effects }, variables) => {
  console.log('verifying sms code...');

  const result = await effects.gql.mutations.verifySmsCode(variables);
  return result.verifySmsCode;
};

/*
*
*/
export const setStoredAuthToken = async ({ state }) => {
  return Storage.putObject(TOKEN_NAME, { token: state.authToken, userId: state.currentUser.id });
};

/*
*
*/
export const getStoredAuthToken = async () => {
  var TOKEN = await Storage.getObject(TOKEN_NAME);
  if (!TOKEN) {
    Storage.putObject(TOKEN_NAME, { token: null, userId: null });
    return { token: null, userId: null };
  }
  return TOKEN;
};

/*
*
*/
export const removeStoredAuthToken = async () => {
  return Storage.remove(TOKEN_NAME);
};

/*
*
*/
export const logout = async ({ state, actions }) => {
  state.currentUser = null;
  state.isLoggedIn = false;
  state.authToken = null;

  await actions.removeStoredAuthToken();
  actions.pushNotification.unsubscribe();
  return true;
};

/*
*
*/
export const login = async ({ effects, state, actions }, variables) => {
  try {
    const { login } = await effects.gql.mutations.login(variables);

    state.currentUser = login.user;
    state.isLoggedIn = true;
    state.authToken = login.token;

    await actions.setStoredAuthToken();
    return true;

  } catch (e) {
    await actions.removeStoredAuthToken();
    state.errors = e.response.errors;
  }
}

/*
*
*/
export const loginWithToken = async ({ effects, state, actions }, variables) => {
  console.log('logging in with token...', variables);

  if (!variables.token || !variables.userId) {
    state.isAuthenticating = false;
    return;
  }

  try {
    const { loginWithToken } = await effects.gql.mutations.loginWithToken(variables);

    state.currentUser = loginWithToken.user;
    state.isLoggedIn = true;
    state.authToken = variables.token;
    state.isAuthenticating = false;

    await actions.setStoredAuthToken();
    actions.pushNotification.subscribe();

    // user subscription 
    effects.gql.subscriptions.userSubscription(actions.onUserChange);

    // preload some data
    // actions.cart.getCarts({userId: state.currentUser.id});
    // actions.notification.getNotifications({userId: state.currentUser.id});

    // Check if update is needed
    // if (info.needToUpgrade === 'true' && process.env.NODE_ENV === 'production') {
    //   Alert.alert(AppUpdate.title, AppUpdate.message, [
    //     {text:'No, Thanks', style:'cancel', onPress:() => _go2Next()},
    //     {text:'OK', onPress:() => {
    //       const link = AppUpdate.link2App()
    //       Linking.canOpenURL(link).then(supported => {
    //         supported && Linking.openURL(link)
    //       }).catch(error=> {
    //         console.log(tag, '_loginWithToken() - ', error)
    //       })

    //       _go2Next()
    //     }},
    //     { cancelable: false }
    //   ])
    // }

    return true;

  } catch (e) {
    console.log('e', e, Object.keys(e));

    state.isAuthenticating = false;
    await actions.removeStoredAuthToken();
    state.errors = e.response.errors;
  }
}

/*
*
*/
export const focusInput = ({ state }) => {
  state.errors = [];
};

/*
*
*/
export const connectionChanged = ({ state }, connected) => {
  state.connected = connected;
};

/*
* Init User in Local Storage ('user_info_snapshot')
*/
export const initializeUserFromStorage = ({ state }, user) => {
  return Storage.getObject(key)
    .then((snapshot: any) => {
      if (snapshot) {
        applySnapshot(store, snapshot);
      }
    })
    .catch((e: Error) => {
      console.error('UserStore::initialize() : Error Occurred:', e);
    });
}

/*
* Store User in Local Storage ('user_info_snapshot')
*/
export const scheduleWrite2Storage = ({ state }, user) => {
  if (store._saveTimeoutHandler) {
    clearTimeout(store._saveTimeoutHandler);
  }
  // Save to local storage
  store._saveTimeoutHandler = setTimeout(() => {
    console.log('scheduleWrite2Storage(): Saving state to local storage');
    Storage.putObject(key, getSnapshot(store));
  }, 300);
}

/*
*
*/
export const fetchCarts = async ({ state, effects }, eventId) => {
  // const isfetching = true;
  const user = await effects.gql.mutations.createAppUser({
    where: { user: { id: user.id } }
  });

  await actions.cart.getCarts({ where: { user: { id: currentUser.id } } });
  // console.log('====>fetch cart', error, result);
  // // state.isfetching = false;

  // if (error == null && result.errors == null) {
  //     const pending = result.data.carts.find(o => o.isPending &&
  //         (eventId == null ? (o.event == null || o.event.id == null) :
  //             (o.event != null && o.event.id == eventId)));
  // }
}

/*
*
*/
export const setErrors = ({ state }, errors) => {
  state.errors = errors
};




/*
*
*/
export const signInClicked = ({ state }, redirectTo) => {
  state.signInModalOpen = true;
  state.redirectOnLogin = redirectTo || '';
};

/*
*
*/
export const signOutClicked = async ({ state, effects, actions }) => {
  effects.analytics.track('Sign Out', {});
  state.workspace.openedWorkspaceItem = 'files';
  if (state.live.isLive) {
    actions.live.internal.disconnect();
  }
  await effects.api.signout();
  effects.jwt.reset();
  state.currentUser = null;
  effects.browser.reload();
};

/*
*
*/
export const signInButtonClicked = async ({ actions, state }, options) => {
  if (!options) {
    await actions.internal.signIn({
      useExtraScopes: false,
    });
    state.signInModalOpen = false;
    return;
  }
  await actions.internal.signIn(options);
  state.signInModalOpen = false;
};

/*
*
*/
export const modalOpened = ({ state, effects }, props) => {
  effects.analytics.track('Open Modal', { modal: props.modal });
  state.currentModal = props.modal;
  if (props.modal === 'preferences' && props.itemId) {
    state.preferences.itemId = props.itemId;
  } else {
    state.currentModalMessage = props.message || null;
  }
};

/*
*
*/
export const modalClosed = ({ state }) => {
  state.currentModal = null;
};

/*
*
*/
export const toggleSignInModal = ({ state }) => {
  state.signInModalOpen = !state.signInModalOpen;
};

/*
*
*/
export const addNotification = ({ effects }, { message, type, timeAlive }) => {
  console.log(type, 'type addNotification')
  effects.notificationToast.add({
    message,
    // status: effects.notificationToast.convertTypeToStatus(type),
    timeAlive: timeAlive * 1000,
  });
};

/*
*
*/
export const removeNotification = ({ state }, id) => {
  const notificationToRemoveIndex = state.notifications.findIndex(
    notification => notification.id === id
  );

  state.notifications.splice(notificationToRemoveIndex, 1);
};

/*
*
*/
export const notificationAdded = ({ effects }, { title, notificationType, timeAlive }) => {
  console.log(notificationType, 'notificationType notificationAdded')
  effects.notificationToast.add({
    message: title,
    // status: convertTypeToStatus(notificationType),
    timeAlive: timeAlive ? timeAlive * 1000 : undefined,
  });
};

/*
*
*/
export const notificationRemoved = ({ state }, { id }) => {
  const { notifications } = state;
  const notificationToRemoveIndex = notifications.findIndex(
    notification => notification.id === id
  );

  state.notifications.splice(notificationToRemoveIndex, 1);
};

/*
*
*/
export const track = ({ effects }, { name, data }) => {
  effects.analytics.track(name, data);
};

/*
*
*/
export const signInGithubClicked = async ({ state, actions }) => {
  state.isLoadingGithub = true;
  await actions.internal.signIn({ useExtraScopes: true });
  state.isLoadingGithub = false;
};

/*
*
*/
export const signOutGithubIntegration = async ({
  state,
  effects,
}) => {
  if (state.currentUser?.integrations?.github) {
    await effects.api.signoutGithubIntegration();
    delete state.currentUser.integrations.github;
  }
};
