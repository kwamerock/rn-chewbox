import { Dimensions, Platform, StatusBar } from 'react-native';
import { AppDetails, AppStores } from '@/Config';

const { width, height } = Dimensions.get('window');

const isIphoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896);

/*
*
*/
export const TabBarStyle = {
  top: 'TOP',
  bottom: 'BOTTOM',
};

/*
*
*/
export const tabBarStyle = TabBarStyle.top;

/*
*
*/
export const Constants = {
  NavBarHeight: 50,
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 35 : 22) : StatusBar.currentHeight,
  ScreenWidth: width,
  ScreenHeight: height,
  tabBarStyle: TabBarStyle.top,
};

/*
*
*/
export const AppUpdate = {
  link2App: () => {
    return Platform.OS === 'ios'
      ? 'itms-apps://itunes.apple.com/us/app/' + AppStores.ios + '?mt=8'
      : 'http://play.google.com/store/apps/details?id=' + AppStores.android;
  },
  title: AppDetails.appName,
  message: AppDetails.updateDescription,
};

// Route parameter keys for reo
export const ParamKeys = {
  // data: 'data',
  // context: 'context',                     // Navigation Flow Context, just needed to be passed to the next.
  // backScreenName: 'backScreenName',       // The screen name that should be popped to
  // backScreenKey: 'backScreenKey',         // The screen key that should be popped to
  // onAddCartItem: 'onAddCartItem',         // The add food handler, if null, it will just display the food, hide the addFoodButton
  // order: 'order',
  // cartItem: 'cartItem',
  // food: 'food',
  // contextName: 'contextName',
  // isEditOrder: 'isEditOrder'
}

/*
*
*/
export const ContextNames = {
  editOrder2AddOrViewFood: 'editOrder2AddOrViewFood'
}

/*
*
*/
export const PaymentSetting = {
  compedByCreator: {value: 'COMPED_BY_CREATOR', title: "It's my treat"},
  eachPay: {value: 'EACH_PAY', title: "We're going Dutch"},
}

PaymentSetting.all = [
  PaymentSetting.compedByCreator,
  PaymentSetting.eachPay
]

/*
*
*/
export const Screens = {
  home: 'Home',
  editOrder: 'EditOrder',
  kitchens: 'Kitchens',
  kitchensModal: 'Kitchens',
  googlePlaceSelector: 'GooglePlaceSelector',
  siteSelector: 'SiteSelector',
  bottomMainMenu: 'bottomMainMenu',
  bottomPlaylists: 'bottomPlayLists',
  bottomPlaylistSongs: 'bottomPlaylistSongs',
  EventDetail: 'EventDetail',
  Profile: 'Profile',
  Payment: 'Payment',
  ClashDone: 'ClashDone',
  SetupRound: 'SetupRound',
  StartClash: 'StartClash',
  InviteList: 'InviteList',
  AnswerClash: 'AnswerClash',
  NewDate: 'NewDate',
  MyAccount: 'MyAccount',
  Menu: 'Menu',
  Transactions: 'Transactions',
  History: 'History',
  TicketPurchases: 'TicketPurchases',
  CreateEvent: 'CreateEvent',
  Notifications: 'Notifications',
  CreateLiveEvent: 'CreateLiveEvent',
  TalkShow: 'TalkShow',
  PhysicalEvent: 'PhysicalEvent',
  SetupDays: 'SetupDays',
  SetupTickets: 'SetupTickets',
  SpecialEvent: 'SpecialEvent'
};