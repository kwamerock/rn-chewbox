import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { SectionList, ScrollView, Alert, View } from 'react-native';
import { get, defaultTo } from 'lodash';

import { BottomContainer, BlackButton, YellowButton, MainBoldFont, MainRegularFont, MainLightFont, MainSemiBoldFont, GradientView, NavBarFilter, BaseScreen } from '@/views/Components';
import { Constants, ParamKeys, Screens } from '@/Constants';
import { Colors } from '@/styles';
import { OrderSummaryItem, OrderHeader } from '@/views/Orders/OrderItem';
import EventItem from '@/views/Events/EventItem';
import OrderStatus from '@/views/Orders/OrderStatus';
import CommentModal from '@/views/Modals/WriteCommentModal';
import { useLoadingHud } from '@/hooks/Utils';
import { useOvermind } from '@/store';

const LightInfo = ({ name, value }) => (
  <InfoItem>
    <LightText>{name}</LightText>
    <LightText>{value}</LightText>
  </InfoItem>
)

const BoldInfo = ({ name, value }) => (
  <InfoItem>
    <BoldText>{name}</BoldText>
    <BoldText>{value}</BoldText>
  </InfoItem>
)

const RedInfo = ({ name, value, eventName }) => (
  <InfoItem>
    <RedText>{name + " (" + eventName + ")"}</RedText>
    <RedText>{value}</RedText>
  </InfoItem>
)

const OrderSummaryPost = props => {
  const { state, actions } = useOvermind();
  const { alert, hud, user } = state;
  const [order, setOrder] = useState(props.route.params.data);
  const [myEvent, setEvent] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [cur_item, setItem] = useState({})

  console.log(props)

  const isEventCart = () => {
    return (props.route.params != null && props.route.params.data?.event != null)
  }

  const prefix = () => {
    if (isEventCart()) {
      return 'Event '
    }
    return ''
  }

  const [isLoading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useLoadingHud(isLoading)

  const fetchEvent = async () => {
    if (!isEventCart()) return;

    const { error, result } = await Api.getEvent({ eventId: order.event.id })

    if (error == null && result.errors == null) {
      console.log("result.data", result.data)
      setEvent(result.data.event)
    }
  }

  const refresh = (order) => {
    let items = []

    if (order && order.items && order.items.length > 0) {
      let temp = {}
      order.items.map(o => {
        const deliverBy = moment(order.deliverBy).format("ddd • MMM D, YYYY")
        if (temp[deliverBy]) {
          temp[deliverBy].push(o)
        } else {
          temp[deliverBy] = [o]
        }
      })
      items = Object.keys(temp).map(key => ({ deliverBy: key, data: temp[key] }))
    }

    setItems(items)

    fetchEvent()
  }

  useEffect(() => {
    refresh(order)
  }, [])

  const cancelOrder = async () => {
    Alert.alert(
      "Confirming cancellation",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "Nevermind",
          onPress: () => { }
        },
        {
          text: "Cancel Order",
          onPress: async () => {
            setLoading(true)
            const { error, result } = await Api.cancelOrder({
              orderId: order.id,
              userId: user.id,
              eventId: props.route.params?.data?.event?.id
            })
            setLoading(false)
            console.log("cancelOrder", error, result)
            if (error == null && result.errors == null) {
              props.navigation.pop()
              alert("Order successfully canceled.")

              // Trigger Orders update
              actions.order.triggerOrdersUpdate()
            }
          }
        }
      ]
    )
  }

  const refetchOrder = async () => {
    try {
      console.log("===Start===>");
      hud.show()
      const { error, result } = await Api.getOrders({ where: { id: order.id } });
      hud.hide();

      console.log("====>refetch===>", error, result)

      if (error == null && result.errors == null) {
        setOrder(result.data.orders[0]);
        refresh(result.data.orders[0])
      }
    } catch (e) {
      console.log("===>refetch", e)
    }
  }

  const editOrder = () => {
    props.navigation.navigate(
      Screens.editOrder,
      {
        [ParamKeys.order]: OrderStore.create(order), // Just pass the order to make it editable
        isEditOrder: true,
        update: async (value) => {
          setTimeout(() => {
            refetchOrder()
          }, 3000)
        }
      }
    )
  }

  const sendEmail = async () => {
    hud.show();
    const { error, result } = await Api.emailReceipt({ orderId: order.id })
    hud.hide();

    console.log("==>Email===>", error, result)
    if (error == null && result.errors == null) {
      alert('Success!')
    }
  }

  const onRating = (item) => {
    setOpen(true)
    setItem(item)
  }

  const onSubmitComment = async (message, subject, rating, photos) => {
    if (message == "") {
      return;
    }
    if (cur_item == null) return;
    setOpen(false)

    try {
      hud.show()
      const images = defaultTo(photos, []).map(p => p.base64)
      const { error, result } = await Api.createComment({
        user: { id: user.id },
        order: { id: order.id },
        product: { id: cur_item.product.id },
        item: { id: cur_item.id },
        message,
        subject,
        rating,
        images
      })

      console.log("===comment", error, result)

      if (error == null && result.errors == null) {
        refetchOrder()
        GlobalStore.refreshAlert();
      }
    } catch (ex) {

    } finally {
      hud.hide()
    }
  }

  const deliveryNote = () => {
    if (get(order, "event.id", undefined)) {
      return 'DELIVER BY ' + moment(get(order, "event.days[0].startDate", '')).format('LT')
    } else if (user.lunchtime) {
      return 'DELIVER BY ' + moment(user.lunchtime).format("LT");
    } else {
      return 'DELIVERY BETWEEN 11AM-1PM';
    }
  }
  console.log(order);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: 'white' }}>
          <Title>{prefix()}Order Confirmation</Title>
          <Description>Edit this order until 6pm the day before delivery</Description>
          {order != null && <HeaderCenter>
            <OrderNumber>ORDER #{order?.id?.slice(-6)?.toUpperCase()}</OrderNumber>
            <TotalPrice>${order.total?.toFixed(2)}</TotalPrice>
            {isEventCart() && <Wrapper>
              <NavBarFilter
                disabled
                title={deliveryNote()}
                filter={order.deliverTo.name} />
            </Wrapper>}
          </HeaderCenter>}
          {isEventCart() && myEvent != null && <EventItem item={myEvent} fromOrder />}
        </View>
        <FlatListContainer>
          <SectionList
            sections={items}
            keyExtractor={(item, index) => index.toString() + Math.random() * 10000}
            renderItem={({ item }) => <OrderSummaryItem
              {...item}
              isDelivered={order.isDelivered}
              showPrice
              onPress={() => onRating(item)}
            />}
            ItemSeparatorComponent={ItemSeparator}
            renderSectionHeader={({ section: { deliverBy, data } }) => (
              <OrderHeader
                centerDate
                deliverDate={deliveryNote()}
                deliverBy={deliverBy}
                user={user}
                deliverTo={data[0].deliverTo}
                isShow={isEventCart()}
              />
            )}
          />
        </FlatListContainer>
        {order != null && <PaddinView>
          <GreyBox>
            <LightInfo name="Subtotal" value={"$" + order.subtotal.toFixed(2)} />
            <LightInfo name="Tax" value={"$" + order.tax.toFixed(2)} />
            <LightInfo name="Tip" value={"$" + order.tip.toFixed(2)} />
            {(order.discount && order.discount !== 0) &&
              <RedInfo name="Discount" value={"$" + get(order, "discount")} eventName={get(order, "event.name")} />
            }
            <BoldInfo name="Grand Total" value={"$" + order.total?.toFixed(2)} />
          </GreyBox>
        </PaddinView>}
        <OrderStatus {...order} />
      </ScrollView>

      <BottomContainer>
        {order.isPaid && <WhiteButton onPress={sendEmail}>Email Receipt</WhiteButton>}
        {!(order.isPaid || order.isCancelledByCustomer || order.isCancelledByOperator) &&
          <Fragment>
            <YellowCustomButton onPress={() => editOrder()}>EDIT ORDER</YellowCustomButton>
            <RedButton onPress={() => cancelOrder()}>CANCEL ORDER</RedButton>
          </Fragment>}
      </BottomContainer>
      <CloseButton onPress={() => props.navigation.pop()}>
        <Feather name="x" size={24} color="black" />
      </CloseButton>
      {isOpen && <CommentModal
        isOpen={isOpen}
        showSubject={true}
        showRating={true}
        onClose={() => setOpen(false)}
        fnClearProvide={() => { }}
        onSubmit={onSubmitComment}
        title={cur_item ? cur_item.product.name : ""}
        comment={""}
      />}
    </Container>
  );
};

export default OrderSummaryPost;

const Container = styled.View`
  flex:1;
  background-color: ${Colors.background};
`

const Title = styled(MainBoldFont)`
  font-size: 18px;
  line-height: 22px;
  color: black;
  margin-left: 15px;
  margin-top: 10px;
`

const Description = styled(MainSemiBoldFont)`
  font-size: 12px;
  line-height: 13px;
  color: #3F3F3F;
  width: 80%;
  margin-top: 5px;
  margin-left: 15px;
  margin-bottom: 20px;
`

const HeaderCenter = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`

const TotalPrice = styled(MainBoldFont)`
  font-size: 36px;
  line-height: 44px;
  color: black;
`

const Wrapper = styled.View`
  width: 270px;
  height: 36px;
  margin-top: 10px;
`

const PaddinView = styled.View`
  padding-horizontal: 30px;
  background-color: white;
  padding-vertical: 15px;
  flex: 1;
`

const Bottom = styled(GradientView)`
  padding-horizontal: 30px;
  padding-top:10px;
  padding-bottom: 20px;
  position: absolute;
  bottom:0;
  left:0;
  width:100%
`

const GreyBox = styled.View`
  width: 100%;
  background-color: #EBEBEB;
  border-radius: 25px;
  padding-horizontal: 20px;
  padding-vertical: 15px;
  margin-vertical: 10px;
`

const InfoItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LightText = styled(MainRegularFont)`
  color: #3F3F3F;
  font-size: 13px;
  line-height: 19px;
`

const BoldText = styled(MainBoldFont)`
  color: black;
  font-size: 13px;
  line-height: 19px;
`

const RedText = styled(MainBoldFont)`
  color: red;
  font-size: 13px;
  line-height: 19px;
`;

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #D2D2D2;
`;

const RedButton = styled(BlackButton)`
  background-color: #760000;
  margin-top: 10px;
  height: 46px;
`

const YellowCustomButton = styled(BlackButton)`
  height: 46px;
  margin-top: 10px;
`

const WhiteButton = styled(YellowCustomButton)`
  background-color: white
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
  width:30px;
  height:30px;
  borderRadius: 15px;
  backgroundColor: #E2E2E2;
  alignItems: center;
  padding-left:1px;
  padding-top:1px;
  justifyContent: center;
`

const OrderNumber = styled(MainBoldFont)`
  font-size: 15px;
  color: #B8B8B8;
`

const FlatListContainer = styled.View`
`
