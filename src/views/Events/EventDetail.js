import React, { useState, useEffect, Fragment } from 'react';
import { FlatList, ScrollView, View, Alert, SectionList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import moment from 'moment';
import { get, find, isEmpty, defaultTo } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';

import { Spacing, FontSize } from '@/styles/Sizes';
import { getAddressMultiline } from '@/utils/MiscUtil';
import { InviteeItem } from '@/views/Orders/OrderItem';
import OrderSummary from '@/views/Orders/OrderSummaryYellowBox';
import { ParamKeys } from '@/Constants';
import { Images } from '@/styles';
import { MainSemiBoldFont, MainRegularFont, MainBoldFont, RedBtnContainer, YellowBtnContainer, BaseScreen } from '@/views/Components';
import { useOvermind } from '@/store';

const StatusInfo = ({ icon, color, name }) => (
  <StateView>
    <Ionicons name={icon} size={24} color={color} />
    <StateText>{(name || "").toUpperCase()}</StateText>
  </StateView>
)

const DeliverInfo = ({ name, location, date }) => (
  <SectionView>
    <SectionTitle>DELIVER TO</SectionTitle>
    <DeliverToContainer>
      <DeliverToLeft>
        <Deliver>
          {name != null && <DeliverSite>{name}</DeliverSite>}
          <DeliverLocation>{location}</DeliverLocation>
        </Deliver>
      </DeliverToLeft>
      <DeliverToRight>
        <DeliverTime>{moment(date).format('h:mmA')}</DeliverTime>
      </DeliverToRight>
    </DeliverToContainer>
  </SectionView>
)

const HostSection = ({ onCancel, isCancellable, user, description }) => (
  <SectionContainer>
    <Status>EVENT HOST</Status>
    <HostContent>
      <UserContainer>
        <Avatar source={{ uri: user?.avatar || '' }} />
        <UserName>{user?.fullName}</UserName>
      </UserContainer>
      <EventDescription>{description}</EventDescription>
    </HostContent>
    {isCancellable && <View>
      <EventCancelButton activeOpacity={0.8} onPress={onCancel}>
        <EventCancelButtonTitle>Cancel Event</EventCancelButtonTitle>
      </EventCancelButton>
      <NotificationText>You will be charged 48 hours before your event begins</NotificationText>
    </View>}
  </SectionContainer>
)

const ItemView = (item) => {
  return (
    <DescView onPress={item.onPress}>
      {!get(item, 'product.isAddOn', false) && <AvatarView>
        <RectAvatar source={{ uri: defaultTo(get(item, 'product.images[0].url'), '') }} />
        <RatingView>
          <Feather name="star" color="#919191" size={12} />
          <Rate>{item.product?.rating?.toFixed(1)}</Rate>
        </RatingView>
      </AvatarView>}
      <Detail>
        <DescTitle>{item.product.name}</DescTitle>
        <Description>{item.product.description}</Description>
      </Detail>
    </DescView>
  )
}

const YourOrderSection = ({ items, onEdit, onCancelOrder, event, isCancelledOrder }) => {
  const region = {
    longitude: event.days[0]?.site?.gps?.lon || 0,
    latitude: event.days[0]?.site?.gps?.lat || 0,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  }
  return (
    <SectionContainer>
      {items && <Status>YOU ORDERED</Status>}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemView {...item} onPress={() => onViewProductDetail(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {(event.isLocked || event.isCancelled) ?
        <Fragment>
          <MapViewContainer>
            <MyMapView
              initialRegion={region}
            >
              <Marker
                coordinate={region}
              >
                <LogoIcon source={Images.logo.chewbox} />
              </Marker>
            </MyMapView>
          </MapViewContainer>
        </Fragment> : !isCancelledOrder ? <Fragment>
          <OrderBtnView>
            <EventCancelButton activeOpacity={0.8} onPress={onEdit}
              style={{ width: 161, backgroundColor: '#FFEC00' }}>
              <EventCancelButtonTitle style={{ color: 'black' }}>Edit Order</EventCancelButtonTitle>
            </EventCancelButton>
            <EventCancelButton activeOpacity={0.8} onPress={onCancelOrder} style={{ width: 161 }}>
              <EventCancelButtonTitle>Cancel Order</EventCancelButtonTitle>
            </EventCancelButton>
          </OrderBtnView>
          <NotificationText>Cancel or Edit up to 48 hours prior to event</NotificationText>
        </Fragment> : <Fragment>
            <StatusInfo icon={"ios-close-circle"} name="ORDER CANCELLED" color={"#B70000"} />
          </Fragment>}
    </SectionContainer>
  )
}

const PendingOrderSection = ({ event, onAddToOrder, onCheckout }) => (
  <PendingContainer>
    <Status>PENDING ORDERS</Status>
    <CartInfoContainer>
      <CartNumberContainer>
        <CartNumber>{event.carts?.length || 0}</CartNumber>
      </CartNumberContainer>
      <Feather name="shopping-cart" size={24} color="white" style={{ marginRight: 10 }} />
    </CartInfoContainer>


    <OrderBtnView>
      <EventCancelButton activeOpacity={0.8} onPress={onCheckout}
        style={{ width: 160, backgroundColor: '#FFEC00' }}>
        <EventCancelButtonTitle style={{ color: 'black' }}>Checkout Now</EventCancelButtonTitle>
      </EventCancelButton>
      <EventCancelButton activeOpacity={0.8} onPress={onAddToOrder} style={{ width: 160, backgroundColor: 'black' }}>
        <EventCancelButtonTitle>Add to Order</EventCancelButtonTitle>
      </EventCancelButton>
    </OrderBtnView>
    <NotificationText>Place order up to 48 hours prior to event</NotificationText>
  </PendingContainer>
)

const AwaitingOrderSection = ({ onAddToOrder }) => (
  <SectionView>
    <Status>AWAITING YOUR ORDER</Status>
    <EventButton activeOpacity={0.8} onPress={onAddToOrder}>
      <EventButtonTitle>Pick Your Meal</EventButtonTitle>
    </EventButton>
    <NotificationText>Place order up to 48 hours prior to event</NotificationText>
  </SectionView>
)

const InviteeOrders = ({ inviteeOrders, add, selected, props, done, event, notify }) => {
  return (
    <InviteeContainer>
      <InviteeOrderHeader>
        <View>
          <Status>ATTENDEE ORDERS</Status>
          <EventDescription style={{ marginLeft: 0 }}>
            {event.invitees.length} Invited - {event?.orders?.length || 0} Confirmed
          </EventDescription>
        </View>
        {add && <Add onPress={() => {
          props.navigation.navigate('UserSelector', {
            selected: inviteeOrders,
            added: selected,
            done: (added) => {
              done(added)
            }
          })
        }}><AddTitle>+</AddTitle></Add>}
      </InviteeOrderHeader>
      <SectionView>
        {event.days[0].paymentSetting !== "EACH_PAY" && <AlertView>
          <AlertTitle>{notify}</AlertTitle>
        </AlertView>}
      </SectionView>
      <FlatList
        data={event.invitees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <InviteeItem {...item} orders={inviteeOrders} />}
      />
    </InviteeContainer>
  )
}

const EventDetail = (props) => {
  const { state, actions } = useOvermind();
  const { user, hud } = state;
  const [inviteeOrders, setInviteeOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [event, setEvent] = useState(props.route.params?.event || {});
  const day = event.days ? event.days[0] : null;
  const startDate = day?.startDate;
  const site = day?.site;
  const region = {
    longitude: site?.gps?.lon || 0,
    latitude: site?.gps?.lat || 0,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  }
  const role = event.creator && event.creator.id === user.id ? 'ADMIN' : 'GUEST';
  const hasNoOrder = isEmpty(find(event.orders, function (o) { return o.user && o.user.id === user.id }));
  const myCart = (event.carts != null ? event.carts.find(o => o.user && o.user.id === user.id) : null);
  // const myOrder = (event.orders != null ? event.orders.find(
  //   o => o.user && o.user.id === user.id &&
  //     !o.isCancelledByCustomer && !o.isCancelledByOperator) : null)

  const onClose = () => {
    props.navigation.pop()
  }

  const onAddToOrder = () => {
    props.navigation.navigate('Kitchens', { event: event })
  }

  const onCheckout = async () => {
    CartStore.fetchCarts(event.id)
    props.navigation.navigate('SUMMARY', { eventId: event.id })
  }

  const onCancel = async () => {
    Alert.alert(
      "Are you sure you want to cancel this event?",
      "All invitee orders will be cancelled and notified.",
      [
        {
          text: "Cancel Event", onPress: async () => {
            hud.show()
            if (role === 'ADMIN') {
              await Api.cancelEvent({ eventId: event.id, userId: user.id })
            }
            hud.hide()
            onClose()
            GlobalStore.refreshEvents()
          }
        },
        {
          text: "Nevermind", onPress: () => { }
        }
      ]
    )

  }

  const onEdit = (order) => {
    console.log("=========>onEdit", order)
    props.navigation.navigate(
      "EventEditOrder",
      {
        [ParamKeys.order]: OrderStore.create(order),    // Just pass the order to make it editable
        update: async (value) => {
          setItems(toJS(value).items)
          order.deliverBy = value.deliverBy
          const { error, result } = await Api.getEvent({ eventId: event.id });
          if (error == null && result.errors == null) {
            setEvent(result.data.event);
          }
        },
        isEditOrder: true
      }
    )
  }

  const onCancelOrder = async (order) => {
    Alert.alert(
      "Are you sure you want to cancel this order?",
      "You will be marked unconfirmed for the event and not be able to re-order.",
      [
        {
          text: "Cancel Order", onPress: async () => {
            hud.show()
            try {
              const { error, result } = await Api.cancelOrder({ orderId: order?.id, userId: user.id })
              if (error == null && result.errors == null) {

              }
            } catch (e) {
              console.log(e);
            } finally {
              hud.hide()
            }
          }
        },
        { text: "Nevermind", onPress: () => { } }
      ]
    )

  }

  const fetchInviteeOrders = async () => {
    hud.show()
    const { error, result } = await Api.getInviteeOrders({
      userId: user.id,
      eventId: event?.id
    })
    hud.hide()
    if (error == null && result.errors == null) {
      setInviteeOrders(result.data.getInviteeOrders)
    }
  }

  const setMyOrders = () => {
    let items = []
    get(myOrders, "length", 0) > 0 && myOrders.map(o => {
      get(o, "items.length", 0) > 0 && o.items.map(item => {
        items.push(item)
      })
    })
    setItems(items)
  }

  const addInvitees = async (users) => {
    let addedUsers = [];
    users.map(s => addedUsers.push(s.id));
    hud.show();
    const res = await Api.addInviteesToEvent({ users: addedUsers, eventId: event.id })
    hud.hide();

    if (res.error == null && res.result.errors == null) {
      const { error, result } = await Api.getEvent({ eventId: event.id });
      if (error == null && result.errors == null) {
        setEvent(result.data.event);
      }
    }
  }

  useEffect(() => {
    fetchInviteeOrders()
    setMyOrders()
  }, [])

  let notify = ''
  if (event.days[0].paymentSetting === 'COMPED_BY_CREATOR' && user.id !== event.creator.id) {
    notify = 'YOUR HOST IS TREATING YOU TO $' + event.maxBudgetPer + ' MEAL CREDIT!'
  } else if (event.days[0].paymentSetting === 'COMPED_BY_CREATOR' && user.id === event.creator.id) {
    notify = 'YOU ARE TREATING ' + event.invitees.length + ' ATTENDEES TO $' + event.maxBudgetPer + ' MEAL CREDIT'
  } else if (event.days[0].paymentSetting === 'EACH_PAY') {
    notify = 'EVERYONE IS GOING DUTCH'
  }


  const onViewProductDetail = (item) => {
    props.navigation.navigate("FoodDetail", { data: item.product })
  }


  const myOrders = event?.orders?.filter(o => o.user && o.user.id === user.id) || []
  const noLocked = !event.isLocked;
  const noCart = !((event?.carts?.filter(o => o.user.id == user.id) || []).length > 0);
  const noOrder = (myOrders == null || myOrders.length == 0)
  const orderCancelled = (myOrders?.filter(o => (o?.isCancelledByCustomer || o?.isCancelledByOperator)) || []).length > 0;
  const isInvitee = event.invitees.findIndex(i => i.id === user.id) >= 0
  const paymentSetting = event.days[0].paymentSetting;

  const cancelled = event.isCancelled;
  const confirmed = !noLocked && !(noOrder || orderCancelled);
  const unconfirmed = !noLocked && (noOrder || orderCancelled)

  const pending_visible = noLocked && !noCart && noOrder && !cancelled && isInvitee;
  const awaiting_visible = noLocked && noCart && noOrder && !cancelled && isInvitee;
  const summary_visible = !noOrder && !cancelled && !orderCancelled &&
    (paymentSetting == 'COMPED_BY_CREATOR' && user.id === event?.creator?.id || paymentSetting == 'EACH_PAY');
  const TitleDate = moment(event.days[0]?.startDate).format('MMM') + " "
    + moment(event.days[0]?.startDate).format("DD");

  console.log(myOrders, noLocked, noCart, noOrder, orderCancelled, cancelled, event.invitees)

  console.log("==============>", event)

  const notes = event?.orders.filter(o => o.notes !== null);

  return (
    <BaseScreen modal title={event.name.toUpperCase() + " - " + TitleDate.toUpperCase()} onClose={onClose}>
      <Background>
        <ScrollView >
          {(cancelled || confirmed || unconfirmed) && <StatusInfo
            icon={unconfirmed ? 'ios-close-circle' : (confirmed ? 'ios-checkmark-circle' : 'ios-remove-circle')}
            color={(cancelled || unconfirmed) ? '#B70000' : '#1FDE00'}
            name={cancelled ? "CANCELLED" : (confirmed ? "CONFIRMED" : "UNCONFIRMED")}
          />}

          <DeliverInfo
            name={(site?.name !== site?.address) ? (site?.name) : null}
            location={getAddressMultiline(site)}
            date={startDate}
          />
          <Spacer />

          <HostSection
            onCancel={onCancel}
            isCancellable={!cancelled && noLocked && role == "ADMIN"}
            description={event?.description}
            user={event?.creator}
          />

          <Spacer />
          {!noOrder &&
            <YourOrderSection
              items={items}
              onCancelOrder={() => onCancelOrder(myOrders[0])}
              onEdit={() => onEdit(myOrders[0])}
              event={event}
              isCancelledOrder={orderCancelled}
            />}

          {pending_visible &&
            <PendingOrderSection
              event={event}
              onAddToOrder={onAddToOrder}
              onCheckout={onCheckout}
            />}

          {awaiting_visible &&
            <AwaitingOrderSection onAddToOrder={onAddToOrder} />
          }
          {(!cancelled && noLocked && isInvitee) && <Spacer />}
          <InviteeOrders
            event={event}
            notify={notify}
            inviteeOrders={inviteeOrders}
            done={addInvitees}
            selected={event?.invitees}
            props={props}
            add={role == 'ADMIN' && noLocked && !cancelled}
          />

          {summary_visible &&
            <OrderView>
              <OrderSummary order={event.orders[0]} />
              <NotificationText>
                {noLocked ? "You will be charged 48 hours before your event begins." :
                  "Your card ending in XXXX has been charged successfully."}
              </NotificationText>
            </OrderView>
          }

          {notes.length > 0 && <Spacer />}
          {notes.length > 0 && <NoteView>
            <NoteTitle>DELIVERY NOTES</NoteTitle>
            <FlatList
              ItemSeparatorComponent={ItemSeparator}
              data={notes}
              renderItem={({ item }) => (
                <ContentView>
                  <Notes><User>{item.user.fullName} - </User>{item.notes}</Notes>
                </ContentView>
              )}
            />
          </NoteView>}
        </ScrollView>
      </Background>
    </BaseScreen>
  )
}

export default EventDetail;

const SectionContainer = styled.View`
  padding: 20px;
`

const ContentView = styled.View`
  flex-direction: row;
  margin-vertical: 15px;
  margin-horizontal: 14px;
`

const NoteView = styled.View`
  background-color: white;
  padding-horizontal: 20px;
  margin-top: 10px;
  margin-bottom: 50px;
  color: #3f3f3f;
`

const NoteTitle = styled(MainBoldFont)`
  font-size: 14px;
  line-height: 19px;
  color: #3f3f3f;
`

const Notes = styled(MainRegularFont)`
  font-size: 12px;
  line-height: 19px;
`

const User = styled(Notes)`
  font-weight: bold; 
`

const ItemSeparator = styled.View`
  align-self: center;
  width: 150px;
  height: 1px;
  background-color: #d2d2d2;
`

const AvatarView = styled.View`
  padding-right: 10px;
`

const DescTitle = styled(MainBoldFont)`
  font-size: 13px;
  line-height: 19px;
  color: #3F3F3F;
`

const Background = styled.View`
  flex:1;
  background-color: white;
`

const Description = styled(MainRegularFont)`
  font-size: 11px;
  line-height: 19px;
  color: #3F3F3F;
`

const Detail = styled.View`
  margin-left: 5px;
`

const OrderBtnView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
`

const RatingView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-horizontal: 10px;
`

const Rate = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 15px;
  color: #6c6c6c;
  margin-top: -2px;
`

const RectAvatar = styled.Image`
	width: 57px;
	height: 57px;
	background-color:#C4C4C4;
`

const OrderDetail = styled.View`
`
const DescView = styled.View`
  flex-direction: row;
  margin-vertical: 10px;
`

const Status = styled(MainBoldFont)`
  font-size: 14px;
  line-height: 19px;
  color: #3F3F3F;
  margin-bottom: 5px;
`

const OrderView = styled.View`
    padding-horizontal: ${Spacing.LG}px;
    padding-bottom: 30px;
`

const AlertView = styled.View`
    width: 100%;
    height: 32px;
    background-color: #F2F2F2;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
`

const AlertTitle = styled(MainBoldFont)`
    color: #3F3F3F;
    font-size: 11px;
    line-height: 13px;
`

const SectionView = styled.View`
	  align-self:stretch;
	  background-color:white;
    padding-horizontal:${Spacing.LG}px;
    padding-vertical: 10px;
`
const SectionTitle = styled(MainSemiBoldFont)`
	  font-size: ${FontSize.Medium}px;
	  margin-bottom: ${Spacing.SM}px;
`

const DeliverToContainer = styled.View`
	  flex-direction: row;
	  justify-content: space-between;
	  width: 100%;
`

const DeliverToLeft = styled.View`
    align-items: center;
    max-width: 70%;
`

const DeliverToRight = styled.View`
	  justify-content: space-between;
	  margin-left:10px;
	  align-items: center;
`

const Deliver = styled.View`
	  align-items:flex-start
	  margin-bottom:13px;
`

const DeliverSite = styled(MainBoldFont)`
	color: #686868;
	font-size:14px;
	line-height: 17px;
`

const DeliverLocation = styled(MainRegularFont)`
	color: #686868;
	font-size:12px;
	line-height: 15px;
`

const DeliverTime = styled(MainSemiBoldFont)`
	  color: #686868;
	  font-size: 24px;
`

const EventButton = styled(YellowBtnContainer)`
    align-self: center;
    margin-top: 20px;
    border-radius: 4px;
    height: 24px;
    width: 208px;
`

const EventCancelButton = styled(RedBtnContainer)`
    align-self: center;
    margin-top: 10px;
    border-radius: 4px;
    height: 24px;
    width: 208px;
    margin-right: 2px;
`

const EventButtonTitle = styled(MainBoldFont)`
    font-size: 12px;
`

const EventCancelButtonTitle = styled(EventButtonTitle)`
    color: #FFFFFF
`

const NotificationText = styled(MainRegularFont)`
    margin-top: 10px;
    text-align: center;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: #3F3F3F;
`

const CartInfoContainer = styled.View`
    align-self: center;
    width: 90px;
    height: 40px;
    border-radius: 20px;
    background-color: black;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

const CartNumberContainer = styled.View`
    height: 34px;
    width: 34px;
    border-radius: 17px;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin-left: 3px;
`

const CartNumber = styled(MainBoldFont)`
    font-size: 18px;
    color: black;
`
const MyMapView = styled(MapView)`
    width: 100%;
    height: 180px;
`

const MapViewContainer = styled.View`
    border-top-width: 1px;
    border-top-color: #D8D8D8;
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    margin-horizontal: ${-Spacing.LG}px
    margin-bottom:-20px;
    margin-top: 10px
`


const StateView = styled.View`
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: white;
      height: 50px;
      padding-top: 10px;
`

const StateText = styled(MainRegularFont)`
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      margin-left: 5px;
`

const Spacer = styled.View`
  background-color: #EDEDED;
  height: 9px;
`

const InviteeContainer = styled.View`
    margin-vertical: 20px;
`

const InviteeOrderHeader = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
  justify-content: space-between;
`

const AddTitle = styled(MainBoldFont)`
  font-size: 18px;
  color: black;
`

const Add = styled.TouchableOpacity`
  padding-horizontal: 10px;
  margin-right: -10px;
`

const Avatar = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #DBDBDB;
    resize-mode: cover;
    margin: 5px;
`

const UserName = styled(MainRegularFont)`
    font-size: 10px;
    line-height: 13px;
    color: #3f3f3f;
    text-align: center;
`

const UserContainer = styled.View`
  align-items: center;
  width: 90px;
`

const HostContent = styled.View`
  flex-direction: row;
  margin-top: 10px;
`

const EventDescription = styled(MainRegularFont)`
  color: #3F3F3F;
  font-size: 12px;
  margin-left: 10px;
  text-align: justify;
  line-height: 19px;
  flex: 1;
`

const PendingContainer = styled.View`
  padding: 20px;
`

const LogoIcon = styled.Image`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`
