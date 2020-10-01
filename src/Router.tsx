import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';
import { tabBarScreenOptions, tabBarOptions, TopTabBar, BottomButton } from '@/views/Components/TabBar';
import { tabBarStyle, Screens, Constants, TabBarStyle } from '@/Constants';

import SignIn from '@/views/SignIn/SignIn';
import SiteSelector from '@/views/Modals/SiteSelector';
import UserSelector from '@/views/Modals/UserSelector';
import GooglePlaceSelector from '@/views/Modals/GooglePlaceSelector';
import Menu from '@/views/Menu/Menu';
import Alerts from '@/views/Notifications/Notifications';
import Kitchens from '@/views/Kitchens/Kitchens';
import Orders from '@/views/Orders/Orders';
import Balance from '@/views/Gifts/Balance';
import KitchenDetail from '@/views/Kitchens/KitchenDetail';
import Profile from '@/views/Profile/Profile';
import ConfirmPlan from '@/views/Cart/ConfirmPlan';
import CreateEvent from '@/views/Events/CreateEvent';
import EventList from '@/views/Events/EventList';
import FoodDetail from '@/views/Kitchens/FoodDetail';
import SendGift from '@/views/Gifts/SendGift';
import Help from '@/views/Help/Help';
import Reviews from '@/views/Reviews/Reviews';
import Search from '@/views/Search/Search';
import EditOrder from '@/views/Orders/EditOrder';
import EditCart from '@/views/Cart/EditCart';
import OrderSummaryPost from '@/views/Orders/OrderSummaryPost';
import EventDetail from '@/views/Events/EventDetail';
import Transactions from '@/views/Transactions/Transactions';
import Routes from '@/views/Driver/Routes';
import RouteDetail from '@/views/Driver/RouteDetail';

import { useOvermind } from '@/store';

const Stack = createStackNavigator();
const isTopTabBar = tabBarStyle === TabBarStyle.top;
const Tab = isTopTabBar ? createMaterialTopTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

enableScreens();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iosModalOptions: <ParamList extends ParamListBase>(props: {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: any;
}) => object = ({ route, navigation }) => ({
  ...TransitionPresets.ModalPresentationIOS,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: false,
  headerStatusBarHeight: navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
});

const Router: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const { state, actions } = useOvermind();

  useEffect(() => {
    actions.product.getProducts();

    SplashScreen.hide();
    setInitialized(true);

    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === 'android') StatusBar.setBackgroundColor("#FFEC00");
    StatusBar.setHidden(true);
  }, []);

  if (!initialized) return null;
  
  const isDriver = state.currentUser?.groups.find(o => o.name == 'driver');

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFEC00" />
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main">
          {() =>
            <Drawer.Navigator initialRouteName={isDriver ? "Routes" : "Home"} drawerContent={props => <Menu {...props} />} drawerStyle={{ width: Constants.ScreenWidth }}>
              <Drawer.Screen name="Home">
                {() =>
                  <Stack.Navigator screenOptions={iosModalOptions}>
                    <Stack.Screen name="Home">
                      {() =>
                        <TabNavigatorContainer>
                          <Tab.Navigator
                            tabBar={isTopTabBar ? props => <TopTabBar {...props} /> : undefined}
                            tabBarOptions={tabBarOptions}
                            initialRouteName="ALERTS"
                            screenOptions={tabBarScreenOptions}>

                            <Tab.Screen name="ALERTS" component={Alerts} />
                            <Tab.Screen name="KITCHENS" component={Kitchens} />
                            {!isTopTabBar && <Tab.Screen name="SUMMARY" component={ConfirmPlan} />}
                            <Tab.Screen name="ORDERS" component={Orders} />
                            {!isTopTabBar && <Tab.Screen name="GIFTS" component={Balance} />}
                          </Tab.Navigator>

                          {isTopTabBar && <BottomButton />}
                        </TabNavigatorContainer>
                      }
                    </Stack.Screen>

                    <Stack.Screen name="Reviews" component={Reviews} />
                    <Stack.Screen name="OrderSummaryPost" component={OrderSummaryPost} />
                    <Stack.Screen name="KitchenDetail" component={KitchenDetail} />
                    <Stack.Screen name="FoodDetail" component={FoodDetail} />
                    <Stack.Screen name="SendGift" component={SendGift} />
                    <Stack.Screen name="EditOrder" component={EditOrder} />
                    <Stack.Screen name="EditCart" component={EditCart} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="CreateEvent" component={CreateEvent} />
                    <Stack.Screen name="UserSelector" component={UserSelector} />
                    <Stack.Screen name="EventOrderDetail" component={EventDetail} />
                    <Stack.Screen name={Screens.siteSelector} component={SiteSelector} />
                    <Stack.Screen name={Screens.googlePlaceSelector} component={GooglePlaceSelector} />
                    <Stack.Screen name={Screens.kitchensModal} component={Kitchens} />
                    {isTopTabBar && <Tab.Screen name="GIFTS" component={Balance} />}
                    {isTopTabBar && <Tab.Screen name="SUMMARY" component={ConfirmPlan} />}
                  </Stack.Navigator>
                }
              </Drawer.Screen>

              <Drawer.Screen name="Routes" initial={true}>
                {() =>
                  <Stack.Navigator screenOptions={iosModalOptions}>
                    <Stack.Screen name="Routes" component={Routes} />
                    <Stack.Screen name="Transactions" component={Transactions} />
                    <Stack.Screen name="RouteDetail" component={RouteDetail} />
                  </Stack.Navigator>
                }
              </Drawer.Screen>
            </Drawer.Navigator>
          }
        </Stack.Screen>

        <Stack.Screen name="Profile">
          {() =>
            <Stack.Navigator screenOptions={iosModalOptions}>
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name={Screens.siteSelector} component={SiteSelector} />
              <Stack.Screen name={Screens.googlePlaceSelector} component={GooglePlaceSelector} />
            </Stack.Navigator>
          }
        </Stack.Screen>

        <Stack.Screen name="EventList" >
          {() =>
            <Stack.Navigator screenOptions={iosModalOptions}>
              <Stack.Screen name="EventList" component={EventList} />
              <Stack.Screen name="CreateEvent" component={CreateEvent} />
              <Stack.Screen name={Screens.siteSelector} component={SiteSelector} />
              <Stack.Screen name={Screens.googlePlaceSelector} component={GooglePlaceSelector} />
              <Stack.Screen name="UserSelector" component={UserSelector} />
              <Stack.Screen name="Kitchens" component={Kitchens} />
              <Stack.Screen name="KitchenDetail" component={KitchenDetail} />
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
              <Stack.Screen name="SUMMARY" component={ConfirmPlan} />
              <Stack.Screen name="EventDetail" component={EventDetail} />
              <Stack.Screen name="EventEditOrder" component={EditOrder} />
              <Stack.Screen name="EditCart" component={EditCart} />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
          }
        </Stack.Screen>
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Router;

const TabNavigatorContainer = styled.View`
  flex: 1;
`
