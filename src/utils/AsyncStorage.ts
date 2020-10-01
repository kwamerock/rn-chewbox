import AsyncStorage from '@react-native-community/async-storage';

/*
*
*/
export function getString(key: string) {
  return AsyncStorage.getItem(key).catch(() => null);
}

/*
*
*/
export function putString(key: string, value: string) {
  return AsyncStorage.setItem(key, value).catch();
}

/*
*
*/
export function getObject<T = any>(key: string): Promise<T | undefined | null> {
  return AsyncStorage.getItem(key)
    .then((str) => {
      if (str) {
        try {
          return JSON.parse(str) as T;
        } catch (ex) {}
      }
      return null;
    })
    .catch(() => null);
}

/*
*
*/
export function putObject(key: string, object: any) {
  return AsyncStorage.setItem(key, JSON.stringify(object)).catch();
}

/*
*
*/
export function remove(key: string) {
  return AsyncStorage.removeItem(key).catch();
}
