export default {
  async initialize(actions) {
    actions.pushNotification.initialize();

    actions.window.initialize();

    actions.pushNotification.initialize();

    console.log('check if user is logged in...');
    
    const { token, userId } = await actions.getStoredAuthToken();
    await actions.loginWithToken({ token, userId });
  }
}