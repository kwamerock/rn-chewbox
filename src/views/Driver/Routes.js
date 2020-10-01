import React, { Fragment, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import DriverTopBar from '@/views/Driver/DriverTopBar';
import { MainBoldFont, FilterStickyTab, FilterTab } from '@/views/Components';
import { Images } from '@/styles/Images';
import RouteItem from '@/views/Driver/RouteItem';
import UtilService from '@/utils/Utils';

const Routes = () => {

  const { data } = useDriverOrders();

  const [selected, setSelected] = useState(0)
  // const data = [
  //     { name: "Alison Hinds", site: "King Drew medical Center", location: "3218 King Blvd.Los angeles, CA 90018", distance: "12 MILES AWAY", duration: "DUE BY 1PM", status: "PENIDING", info: "3 Meals-3 Addons" },
  //     { name: "Alison Hinds", site: "King Drew medical Center", location: "3218 King Blvd.Los angeles, CA 90018", distance: "12 MILES AWAY", duration: "DUE BY 1PM", status: "PENIDING", info: "3 Meals-3 Addons" },
  //     { name: "Alison Hinds", site: "King Drew medical Center", location: "3218 King Blvd.Los angeles, CA 90018", distance: "12 MILES AWAY", duration: "DUE BY 1PM", status: "PENIDING", info: "3 Meals-3 Addons" },
  // ]

  const renderContent = () => {
    const converted = (data || []).map(o => {
      let status = "PENDING"
      if (o.isDelivered || (!o.isCancelledByCustomer &&
        !o.isCancelledByOperator && moment(o.deliverBy) < moment())) {
        status = "COMPLETED"
      } else if (o.isCancelledByCustomer || o.isCancelledByOperator) {
        status = "CANCELED"
      }
      return ({
        name: o.user.fullName,
        site: o.deliverTo.name,
        location: o.deliverTo.address + "," + o.deliverTo.city + "," + o.deliverTo.country,
        distance: UtilService.getDistance(o.deliverTo.gps.lat, o.deliverTo.gps.lon, 33.94301, -118.23776).toFixed(1) + "KM AWAY",
        duration: "DUE BY " + moment(o.deliverBy).format("HA"),
        status,
        info: `${o.items.length} Meals • ${o.items.length} Add-Ons`,
        avatar: o.user.avatar || "",
        raw: o,
      })
    }).filter(o => selected == 0 && o.status == "PENDING" || selected == 1 && o.status != "PENDING")

    console.log("====>dirver", data)

    return converted.length == 0 ?
      (
        <EmptyContainer>
          <EmptyLogo source={Images.icons.Hat2B} />
          <BigString>Stay Tuned!</BigString>
          <EmptyString>
            {"No deliveries have been assigned as yet.\nPlease look out for any notifications\nfrom us regarding new deliveries."}
          </EmptyString>
        </EmptyContainer>
      ) : (
        <FlatList
          data={converted}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RouteItem {...item} />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      )
  }

  const renderHeader = () => {
    return (
      <FilterTab
        titles={["EVERYONE", "ME"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
          // vm.onSelectTab(index)
        }}
        style={{ backgroundColor: '#EAEAEA' }}
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
          // vm.onSelectTab(index)
        }}
      />
    )
  }

  return (
    <Container>
      <DriverTopBar />
      <Content>
        <ReactNativeParallaxHeader
          headerMinHeight={30}
          headerMaxHeight={50}
          extraScrollHeight={20}
          navbarColor="#EAEAEA"
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
          headerTitleStyle={{ backgroundColor: '#EAEAEA' }}
          scrollViewProps={{
            // refreshControl: <RefreshControl onRefresh={vm.refetch} refreshing={vm.isRefetching} />
          }}
        />
      </Content>
    </Container>
  )
}

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#EAEAEA',
    padding: 10
  },
});

const Container = styled(View)`
  flex: 1;
  background-color: #EAEAEA;
`

const Content = styled.View`
  flex: 1;
  overflow: hidden;
`

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

const Separator = styled.View`
  height: 10px;
  background-color: #EAEAEA;
  width: 100%;
`