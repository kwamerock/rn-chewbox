import env from 'react-native-config';

export const AppDetails = {
  appName: 'ChewBox',
  updateDescription: 'A new version of this app is available. For best experience, update your app by tapping "Update".'
}

export const AppStores = {
  ios: 'id1453895499', // itms-apps://itunes.apple.com/us/app/id1453895499?mt=8
  android: 'com.chewbox' // http://play.google.com/store/apps/details?id=
}

export const EndPoint = {
  apiUrl: env.API_URL,
  fileUrl: env.FILE_URL,
  wssUrl: env.WSS_URL,
};

export const OneSignal = {
  appId: 'ad48405c-5a35-4a5e-a5b6-01b7678e03b6',
};

export const SentryConfig = {
  dsn: 'https://f48bf4580b6f4f4d9f5086f2fb5a76bb@o327848.ingest.sentry.io/5221141'
}

export const defaultSiteId = '5ec54da2a7b11b000797055a';

export const google = {
  iosClientId: '1057916978843-8na47pkf7oijo9ggkhruf31lt0jihsie.apps.googleusercontent.com',
  webkey: 'AIzaSyA5W2NuRWgrWtyM7HEz06xi_NCTWyWmlrU'
}
