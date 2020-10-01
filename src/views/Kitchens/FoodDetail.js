import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather'
import { View } from 'react-native';
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { map, find, get } from 'lodash';

import { YellowButton, BlackButton, MainBoldFont, MainLightFont } from '@/views/Components';
import { BottomContainer } from '@/views/Components/BottomContainer';
import DatePicker from '@/views/Components/datepicker';
import { Colors } from '@/styles';
import { Ingredients, PickAddons } from '@/views/Components/Food';
import { ParamKeys, Screens } from '@/Constants';
import { useOvermind } from '@/store';

/*
*
*/
const FoodDetail = async (props) => {
  const item = props.route.params?.data ? props.route.params?.data : props.route.params?.cartItem.product;
  const { images, name, description, tasks, pricing, rating, comments } = item;

  const [modifiers, setModifiers] = useState([]);
  const [event, setEvent] = useState(null);
  const isEditOrder = get(props, 'route.params.context.isEditOrder', false);

  const [isOrder, setOrder] = useState([]);
  const [date, setDate] = useState(new Date());

  var price = find(pricing, { type: 'single' });
  price = price.retailPrice;

  const { state, actions } = useOvermind();
  const { alert, hud, user } = state;

  /*
  *
  */
  const toggleIngredient = (task) => {
    const index = modifiers.findIndex(m => m.id === task.id)
    if (index < 0) {    // Not found, just add
      setModifiers([...modifiers, { id: task.id }])
    } else {
      //remove
      const newModifiers = modifiers.slice(0)
      newModifiers.splice(index, 1);
      setModifiers(newModifiers);
    }
  }

  /*
  *
  */
  const getDate = () => {
    if (event && event.days && event.days.length > 0) {
      return moment(event.days[0].startDate).format("MMM DD, YYYY").toUpperCase();
    } else {
      return moment(date).format("YYYY").toUpperCase()
    }
  }

  /*
  *
  */
  const onGetOrdersByDay = (date) => {
    const ordersByDay = user.orders.filter(o => moment(o.deliverBy).format('LL') === moment(date).format('LL'))
    setOrder(ordersByDay);
    setDate(date);
  }

  useEffect(() => {
    if (props.route.params && props.route.params.id) {
      actions.event.getEvent({ eventId: props.route.params.id }); // setEvent(result.data.event)
    }
  }, [])

  /*
  *
  */
  const renderContent = () => {
    const data = (tasks || []).map(t => {
      const selected = modifiers.findIndex(m => m.id === t.id) < 0
      return { o: t, selected }
    })
    return (
      <View>
        <PickDateHeader>
          <UnderLine />
          <PickHeaderTitle>{event ? event.name : 'CHOOSE DATE'}</PickHeaderTitle>
          <MonthYear>{getDate()}</MonthYear>
        </PickDateHeader>
        {((props.route.params == null || props.route.params.id == null) && !isEditOrder) &&
          <DatePicker onChange={(date) => onGetOrdersByDay(date)} value={date} />}
        <Description>{description}</Description>
        {data?.length !== 0 && <Ingredients data={data} modifiers={modifiers} onToggleIngredient={toggleIngredient} />}
        {!isEditOrder && <PickAddons data={GlobalStore.addOns} />}
        <BaddingBottom />
      </View>
    )
  }

  /*
  *
  */
  const linkToReview = () => {
    props.navigation.navigate("Reviews", { product: props.route.params.data, })
  }

  /*
  *
  */
  const renderHeader = () => (
    <Foreground>
      <HeaderBottom>
        <Top>
          <HeaderTitle numberOfLines={1}>{name}</HeaderTitle>
          <HeaderTitle numberOfLines={1}>${(price || 1).toFixed(2)}</HeaderTitle>
        </Top>
        <SmallHeaderText onPress={linkToReview}>
          <Feather name="star" size={12} color="white" />
          {" " + (rating || 0).toFixed(1) + " • " + (comments?.length || 0) + " Reviews"}
        </SmallHeaderText>
      </HeaderBottom>
    </Foreground>
  )

  /*
  *
  */
  const renderSticky = () => (
    <HeaderBottom style={{ backgroundColor: Colors.background, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
      <HeaderTitle numberOfLines={1} ellipsizeMode="tail" style={{ color: 'black' }}>{name}</HeaderTitle>
      <SmallHeaderText style={{ color: 'black' }}>
        <Feather name="star" size={12} color="black" />
        {" " + (rating || 0).toFixed(1) + " • " + (comments?.length || 0) + " Reviews"}
      </SmallHeaderText>
    </HeaderBottom>
  )

  /*
  *
  */
  const onEditOrder = () => {
    props.navigation.navigate(
      Screens.editOrder,
      {
        [ParamKeys.order]: OrderStore.create(data.filter(o => o.raw.id === isOrder[0].id)[0]?.raw), // Just pass the order to make it editable
        isEditOrder: true,
        update: async (value) => {
          setTimeout(() => {
            actions.order.getOrders({ where: { id: isOrder[0].id } });
          }, 3000)
        }
      }
    )
  }

  /*
  *
  */
  const onCreateCart = async () => {
    const { context, cartItem } = props.route.params;
    if (context) {

      const key = context[ParamKeys.backScreenKey]; // Pop to stack

      if (key) {
        props.navigation.navigate({ key })
      } else {
        props.navigation.pop()
      }
      const onAddCartItem = context[ParamKeys.onAddCartItem]
      if (onAddCartItem) {
        onAddCartItem(cartItem)
      }

    } else {
      let deliverBy = new Date(date);
      deliverBy.setHours(new Date(user.lunchtime).getHours())
      deliverBy.setMinutes(new Date(user.lunchtime).getMinutes())

      let addItems = [{
        quantity: 1,
        productId: props.route.params.data.id,
        deliverBy,
        modifiers: modifiers
      }]

      props.route.params.addOns.map(o => {
        o.quantity && o.quantity > 0 && addItems.push({
          quantity: o.quantity,
          productId: o.id,
          deliverBy
        })
      })

      const error = await actions.cart.createCart({ addItems }, props.route.params.id)

      if (error == null) {
        props.navigation.navigate("SUMMARY", { eventId: props.route.params?.id });

      } else {
        actions.alert.showError("error", error);
      }
    }
  }

  /*
  *
  */
  const isEventCart = () => {
    return props.route.params?.id != null
  }

  /*
  *
  */
  const onCloseModal = () => {
    props.navigation.pop();
  }

  const isSoldOut = await actions.cart.isSoldOut();

  return (
    <Container >
      <ParallaxScrollView
        parallaxHeaderHeight={250}
        renderBackground={() => <Thumbnail source={{ uri: images[0].url }} />}
        renderStickyHeader={() => renderSticky()}
        stickyHeaderHeight={60}
        renderForeground={() => renderHeader()}>
        {renderContent()}
      </ParallaxScrollView>

      {!isSoldOut &&
        <BottomContainer>
          {isOrder.length > 0 ?
            <BlackButton onPress={onEditOrder}>EDIT ORDER</BlackButton> :
            <YellowButton onPress={onCreateCart}>
              {(isEventCart() ? "ADD ORDER TO EVENT" : "ADD TO MEAL CALENDAR")}
            </YellowButton>
          }
        </BottomContainer>
      }
      <CloseButton onPress={onCloseModal}>
        <Feather name="x" size={24} color="black" />
      </CloseButton>
    </Container>
  );
};

export default FoodDetail;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Title = styled.Text`
  fontSize: 24px;
  color: black;
  fontWeight: bold;
  margin: 15px;
`

const Foreground = styled.View`
  flex:1
  justify-content: flex-end;
`

const HeaderBottom = styled.View`
  height: 60px;
  background-color: rgba(0,0,0,0.8);
  padding-horizontal: 10px;
  justify-content: center;
`

const HeaderTitle = styled(MainBoldFont)`
  font-size: 20px;
  line-height: 24px;
  color: white;
  width:85%;
`

const SmallHeaderText = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 15px;
  color: white;
`

const Thumbnail = styled.Image`
  width:100%;
  height: 250px;
  resizeMode: cover;
  background-color: grey;
`

const Description = styled(MainLightFont)`
  font-size: 13px;
  line-height: 21px;
  color: #373737;
  margin-horizontal: 30px;
  margin-vertical: 20px;
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
  width:30px;
  height:30px;
  borderRadius: 15px;
  backgroundColor: white;
  alignItems: center;
  justifyContent: center;
  shadow-opacity: 0.4;
  shadow-color: black;
  shadow-radius:4px;
`

const Bottom = styled.View`
  paddingHorizontal:15px;
  paddingVertical:8px;
  padding-bottom:30px;
`

const PickDateHeader = styled.View`
  height: 40px;
  background-color: #EDEDED;
  flex-direction: row;
  align-items: center;
`

const UnderLine = styled.View`
  height: 100%;
  border-bottom-width:2px;
  border-bottom-color: #6A6A6A;
  width:15px;
`

const PickHeaderTitle = styled(MainBoldFont)`
  font-size:14px;
  line-height:17px;
  color: black;
  flex: 1;
`

const MonthYear = styled(MainBoldFont)`
  color: #7E7E7E;
  font-size: 10px;
  line-height:12px;
  margin-right:15px;
`

const Top = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const BaddingBottom = styled.View`
  height: 80px;
`
