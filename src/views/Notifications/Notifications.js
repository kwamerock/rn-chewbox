import React, { useState, Fragment, useEffect } from 'react';
import { View, RefreshControl, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import { MainBoldFont, TabScreen } from '@/views/Components';
import NotificationPlaceholder from './NotificationPlaceholder';
import NotificationItem from './NotificationItem';
import FilterTab from '../Components/FilterTab';
import FilterStickyTab from '../Components/FilterStickyTab';
import { Images } from '@/styles';
import useSetupNotification from '@/hooks/Notification';
import { useOvermind } from '@/store';

export const NotificationSubscribeComponent = () => {
  useSetupNotification();
  return (null)
}

export default Component = (props) => {
  console.log('RENDERING --> NOTIFICATIONS');

  const { state, actions } = useOvermind();
  const { currentUser, notification } = state;

  const [selected, setSelected] = useState(0);
  const navigation = useNavigation();


  useEffect(() => {
    actions.notification.getNotifications({ userId: currentUser.id });
    console.log("====>notifications", state.notification.notificationList(state.notification));
  }, []);

  /*
  *
  */
  function onPressAlert(alert) {
    navigation.navigate('Reviews', { alert: alert })
  }

  /*
  *
  */
  const onSelectTab = (index) => {
    setSelected(index)
  }

  /*
  *
  */
  const getNotifications = () => {
    if (selected === 0) {
      return notification.notificationList(state.notification).filter(o => o.toAll)
    }
    if (selected === 1) {
      return notification.notificationList(state.notification).filter(o => o.user?.id == currentUser.id)
    }
  }

  const renderContent = () => {
    return (
      <Fragment>
        <NotificationPlaceholder isLoading={false} />
        {getNotifications().length === 0 &&
          <EmptyContainer>
            <EmptyLogo source={Images.icons.MouthB} />
            <BigString>Hey!</BigString>
            <EmptyString>
              This is where you see what is going on in the world of ChewBox! Who is ordering what and where events are happening!
						</EmptyString>
          </EmptyContainer>
        }
        <FlatList
          data={getNotifications()}
          renderItem={({ item }) => { return (<NotificationItem currentUser={currentUser} item={item} onPress={() => onPressAlert(item)} />) }}
          // onRefresh={refetch}
          // refreshing={isRefetching}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => <FlatListFooter />}
        />
      </Fragment>

    )
  }

  const renderHeader = () => {
    return (
      <FilterTab
        titles={["EVERYONE", "ME"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
          onSelectTab(index)
        }}
      />
    )
  }

  const renderNavBar = () => {
    return (
      <FilterStickyTab
        titles={["EVERYONE", "ME"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
          onSelectTab(index)
        }}
      />
    )
  }

  return (
    <TabScreen {...props}>
      <Container>
        <ReactNativeParallaxHeader
          headerMinHeight={30}
          headerMaxHeight={50}
          extraScrollHeight={20}
          navbarColor="white"
          renderNavBar={renderNavBar}
          renderContent={renderContent}
          renderHeader={renderHeader}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
            onScrollEndDrag: () => console.log('onScrollEndDrag'),
          }}
          alwaysShowNavBar={false}
          alwaysShowTitle={false}
          headerTitleStyle={{ backgroundColor: 'white' }}
          scrollViewProps={
            {
              refreshControl: <RefreshControl onRefresh={() => actions.notification.getNotifications({ userId: currentUser.id })} refreshing={state.notification.isLoading} />
            }
          }

        />

        <NotificationSubscribeComponent />
      </Container>
    </TabScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const EmptyContainer = styled.View`
    padding:30px;
    align-items:center;
`

const EmptyString = styled(MainBoldFont)`
    font-size: 13px;
    color:#B8B8B8
    line-height: 30px;
    text-align:center;
`

const EmptyLogo = styled.Image`
    opacity: 0.25;
    width: 180px;
    height: 180px;
    resize-mode: contain;
`

const BigString = styled(MainBoldFont)`
    font-size: 24px;
    color: #B8B8B8;
`

const Logo = styled.Image`
	width:100%;
	resize-mode: contain;
`;

const FlatListFooter = styled.View`
	height:60px;
`

const Container = styled.View`
	background-color: white;
	flex: 1;
`
