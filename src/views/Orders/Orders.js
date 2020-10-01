import React, { useState, useEffect } from 'react';
import { SectionList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import { OrderItem, OrderFooter, OrderHeader } from '@/views/Orders/OrderItem';
import { Images } from '@/styles/Images';
import { BlackButton, MainBoldFont, GradientView, FilterTab, FilterStickyTab, TabScreen } from '@/views/Components';
import { useLoadingHud, useDelay } from '@/hooks/Utils';
import { useOvermind } from '@/store';

const Orders = props => {
  console.log('RENDERING --> ORDERS');

  const { state, actions } = useOvermind();
  const { currentUser } = state;

  const prevUpdateFlag = React.useRef(actions.order.flagOrderUpdate);
  const [selected, setSelected] = useState(0);

  useLoadingHud(state.order.isLoading);

  useEffect(() => {
    actions.order.getOrders({ where: { user: { id: currentUser.id } } } );
    console.log("====>orders", state.order.ordersList(state.order));
  }, []);

  const onRefresh = () => {
    actions.order.getOrders({ where: { user: { id: currentUser.id } } } );
  }

  const onEdit = (title, order) => {
    props.navigation.navigate("OrderSummaryPost", { data: order, refresh: onRefresh })
  }

  const onVisitKitchens = () => {
    props.navigation.navigate("KITCHENS")
  }

  const onClickEvent = (id) => {
    const event = state.event.eventsList(state.event).filter(e => e.id === id)[0];
    props.navigation.navigate("EventOrderDetail", { event });
  }

  const filteredData = () => {
    const data = state.event.eventsList(state.event);
    data.map(o => {
      const newArray = [];
      // console.log(o.data, '0.data')
      newArray.push(o.data.filter(d => d && !d.product.isAddOn)[0]);
      o.data = newArray;
    });
    if (selected === 0) {
      return data.filter(o => o.title == "PENDING"
        // o.raw?.isCancelledByCustomer === false &&
        // o.raw?.isCancelledByOperator === false &&
        // o.raw?.isPaid === false &&
        // o.raw?.isDelivered === false && 
        // o?.data?.map(d => d.product?.isAddon === false)
      ).sort((a, b) => (new Date(a.raw.deliverBy) - new Date(b.raw.deliverBy)))
    }
    if (selected === 1) {
      return data.filter(o => o.title != "PENDING"
        // !(o.raw?.isCancelledByCustomer === false &&
        // o.raw?.isCancelledByOperator === false &&
        // o.raw?.isPaid === false &&
        // o.raw?.isDelivered === false)
      ).sort((a, b) => (new Date(a.raw.deliverBy) - new Date(b.raw.deliverBy)))
    }
  }

  console.log('filteredData Orders', filteredData());

  const renderContent = () => {
    if (filteredData() == null || filteredData().length === 0) {
      return <EmptyContainer>
        <EmptyLogo source={Images.icons.PlatterB} />
        <BigString>Hey!</BigString>
        <EmptyString>You have not set any meals as yet.</EmptyString>
        <EmptyString>Proceed to set your first meal by tapping</EmptyString>
        <EmptyString>on kitchens tab in the menu bar.</EmptyString>
        <SmallCreateButton onPress={onVisitKitchens} textStyle={{ fontSize: 11 }}>
          Visit Our Kitchens
        </SmallCreateButton>
      </EmptyContainer>
    } else {
      return (
        <MySectionList
          refreshing={site.order.isLoading}
          onRefresh={()=> actions.order.getOrders({ where: { user: { id: currentUser.id } } } )}
          sections={filteredData()}
          keyExtractor={(item, index) => "" + index + Math.random() * 10000}
          renderItem={({ item, section: { title, raw, deliverBy, eventId } }) =>
            <OrderItem
              {...item}
              user={currentUser}
              showRating
              raw={raw}
              title={title}
              deliverBy={deliverBy}
              eventId={eventId}
              onClick={() => onClickEvent(eventId)}
              onPress={() => onEdit(title, raw)} />}
          SectionSeparatorComponent={SectionSeparator}
          stickySectionHeadersEnabled={false}
        />
      )
    }
  }

  const renderHeader = () => {
    return (
      <FilterTab
        titles={["UPCOMING", "PAST"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
        }}
        style={{ backgroundColor: "#EAEAEA" }}
      />
    )
  }

  const renderNavBar = () => {
    return (
      <FilterStickyTab
        titles={["UPCOMING", "PAST"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
        }}
      />
    )
  }

  return (
    <TabScreen {...props}>
      <ReactNativeParallaxHeader
        headerMinHeight={30}
        headerMaxHeight={50}
        navbarColor="white"
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        renderHeader={renderHeader}
        containerStyle={{ flex: 1, backgroundColor: '#EAEAEA' }}
        contentContainerStyle={{ flexGrow: 1 }}
        innerContainerStyle={{ flex: 1 }}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
          refreshControl: <RefreshControl onRefresh={()=> actions.order.getOrders({ where: { user: { id: currentUser.id } } } )} refreshing={state.order.isLoading} />
        }}
        alwaysShowNavBar={false}
        alwaysShowTitle={false}
        headerTitleStyle={{ backgroundColor: '#EAEAEA' }}
      />
    </TabScreen>
  );
};

export default Orders;

const Header = styled(GradientView)`
  align-items: center;
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  padding-vertical: 5px;
`;

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #D2D2D2;
`;

const SectionSeparator = styled.View`
  width: 100%;
`

const MySectionList = styled.SectionList`
  background-color: #EAEAEA;
`

const EmptyContainer = styled.View`
  padding:30px;
  align-items:center;
`

const EmptyString = styled(MainBoldFont)`
  font-size: 12px;
  color:#B8B8B8
  line-height: 20px;
  text-align:center;
`

const BigString = styled(MainBoldFont)`
  font-size: 24px;
  color: #B8B8B8;
`

const EmptyLogo = styled.Image`
  opacity: 0.25;
  width: 180px;
  height: 180px;
  resize-mode: contain;
`

const SmallCreateButton = styled(BlackButton)`
  height: 24px;
  width: 200px;
  margin-top: 30px;
  border-radius: 4px;
`
