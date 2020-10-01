import React, { Fragment, useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

import { DatePicker, BlackButton, TextButton, GradientView, MainBoldFont, MainRegularFont, MainLightFont, MainSemiBoldFont } from '@/views/Components';
import { Colors, Sizes } from '@/styles';
import { Spacing, FontSize } from '@/styles/Sizes';
import { Ingredients, PickAddons } from '@/views/Kitchens/FoodDetail';
import { getAddressMultiline } from '@/utils/MiscUtil';
import CartSummary from '@/views/Cart/CartSummary';
import { useForceUpdate, useDelayTimeout, useSitePicker } from '@/hooks/Utils';
import { useOvermind } from '@/store';

const EditCart = props => {
  const { state, actions } = useOvermind();
  const { hud, user, alert } = state;

  const forceUpdate = useForceUpdate();
  const editingCartRef = React.useRef(CartStore.copy(props.route.params?.eventId))
  const { sectionData: sections, cart } = editingCartRef.current
  const sectionData = sections/*.filter(s => !editingCartRef.current.isRemovedSection(s))*/

  console.log("=========Edit Cart=====>", props.route.params?.eventId, toJS(cart))
  
  const [showTimeModal, setShowTimeModal] = useState(false)
  const _pickSite = useSitePicker()
  const isSetLunchTime = user.lunchtime !== null;

  const modalIndexRef = React.useRef(0)

  const scheduleUpdate = useDelayTimeout(async (closeAfterSuccess) => {
    const changes = editingCartRef.current.changes()    // {updateItems, addItems, removeItems, tipAmount, tipType}
    console.log("EditCart::updateCart() - Should Update Cart Now", changes)

    hud.show()
    try {
      const error = await CartStore.saveCart(changes, props.route.params?.eventId)
      console.log("===>Edit Cart", error)
      if (error == null) {
        if (CartStore.isEmpty && props.route.params?.eventId == null) {
          // No more items, just pop
          props.navigation.navigate('Home')
          return
        }

        if (closeAfterSuccess) {
          props.navigation.pop()
        }

        // Copy again
        editingCartRef.current = CartStore.copy(props.route.params?.eventId)

        // Trigger update
        forceUpdate()
      } else {
        actions.alert.showError(error.message, 'Edit Cart');
      }

    } catch (error) {
      actions.alert.showError('Failed to save cart', 'Edit Cart')
      console.log("EditCart::updateCart() - ", error, error.networkError, error.gqlErrors)
    } finally {
      // This is important! do not delete
      hud.hide()
    }
  })        // After 1 second

  const onConfirm = () => {
    // Immediately update
    scheduleUpdate(0, true)
  }

  const onPressTime = (index) => {
    setShowTimeModal(true)
    modalIndexRef.current = index
  }

  const onChangeSite = (index) => {
    _pickSite(site => {
      sectionData[index].deliverTo = site
      forceUpdate()
    })
  }

  const onChangeDate = (index, date) => {
    console.log("====onchange")
    const order = sectionData[index]    // Order for the day

    const originalMonth = order.date.getMonth()
    const originalDate = order.date.getDate()

    // Check if date was changed.
    if (date.getDate() === originalDate && date.getMonth() === originalMonth) {
      return
    }

    //preserve hours and minutes
    const hours = order.date.getHours()
    const minutes = order.date.getMinutes()

    date.setHours(hours)
    date.setMinutes(minutes)
    order.date = date

    // scheduleUpdate(1000)
  }

  const onChangeTime = (time) => {
    setShowTimeModal(false)
    sectionData[modalIndexRef.current].date.setHours(new Date(time).getHours())
    sectionData[modalIndexRef.current].date.setMinutes(new Date(time).getMinutes())
    forceUpdate()
  }

  const onChangeTip = ({ tipAmount, tipType }) => {
    if (tipType === '%') {
      cart.tipPercentage = tipAmount
    } else {
      cart.tipPercentage = 40     // not 10, 15, 20, or 0
      cart.tip = tipAmount
    }
    // don't need to force update here, as api will be called soon
    // forceUpdate()
    // scheduleUpdate(1000)
  }

  const onChangeAddOns = () => {
    // scheduleUpdate(1000)
  }

  const removeItem = (item) => {
    if (CartStore.downToLastItem) {
      Alert.alert("Please Confirm", "You are removing the only item on your order.  If you continue, your order will be cancelled. Please confirm.", [
        {
          text: "Okay", onPress: () => {
            item.removed = true
            //forceUpdate()
            // Call immediately cancelling all pending updates scheduled
            scheduleUpdate(0)
          }
        },
        { text: "Cancel", onPress: () => { } }
      ])
    } else {
      item.removed = true;
      console.log('EditCart::removeItem() - ', toJS(item));

      //forceUpdate()
      scheduleUpdate(0)
    }
  }

  const isEventCart = (props.route.params?.eventId != null)
  const eventName = cart.event?.name || "";

  const getDate = () => {
    const event = cart.event
    if (event && event.days && event.days.length > 0) {
      return moment(event.days[0].startDate).format("ddd MMM D, YYYY").toUpperCase();
    }
    return null;
  }

  return (
    <Container >
      <PaddinView>
        <Title>EDIT ORDER</Title>
      </PaddinView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} style={{ flex: 1 }} enabled={Platform.OS === "ios"}>
        <ScrollView>
          {sectionData.map((data, index) => (
            <Fragment key={index}>
              <PickDateHeader>
                <UnderLine />
                <PickHeaderTitle>{isEventCart ? eventName : "MEAL"}</PickHeaderTitle>
                <MonthYear>{moment(getDate() || data.date).format('ddd MMM D, YYYY')}</MonthYear>
              </PickDateHeader>
              {!isEventCart && <DatePicker onChange={date => onChangeDate(index, date)} value={data.date} />}
              <SectionView>
                <SectionTitle>DELIVER TO</SectionTitle>
                <DeliverToContainer>
                  <DeliverToLeft>
                    <Deliver>
                      {data.deliverTo?.name !== data.deliverTo?.address && <DeliverSite>{data.deliverTo.name}</DeliverSite>}
                      <DeliverLocation>{getAddressMultiline(data.deliverTo)}</DeliverLocation>
                    </Deliver>
                    {!isEventCart && <UnderlineButton onPress={() => onChangeSite(index)}>CHANGE</UnderlineButton>}
                  </DeliverToLeft>
                  <DeliverToRight>
                    <DeliverTime>{!isSetLunchTime ? "11AM-1PM" : moment(data.date).format('h:mmA')}</DeliverTime>
                    {!isEventCart && isSetLunchTime && <UnderlineButton onPress={() => onPressTime(index)}>CHANGE</UnderlineButton>}
                  </DeliverToRight>
                </DeliverToContainer>
              </SectionView>
              <FlatList
                data={data.data.filter(o => o.product.isAddOn == false /*&& o.removed != true */)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <CartItem item={item} onRemove={() => removeItem(item)} />
                )}
                ItemSeparatorComponent={ItemSeparator}
              />

              <PickAddons data={data.addOns} onChange={onChangeAddOns} />
            </Fragment>
          ))
          }

          <CartSummary
            tip={cart.tip}
            tipPercentage={cart.tipPercentage}
            subtotal={cart.subtotal}
            tax={cart.tax}
            total={cart.total}
            onChangeTip={onChangeTip}
          />
          <BottomPadding />
        </ScrollView>
      </KeyboardAvoidingView>
      <GradientBottom
        topColor={"#FFFFFF00"}
        middleColor={"#FFFFFFFF"}
        bottomColor={"#FFFFFFFF"}
      >
        <BlackButton onPress={() => onConfirm()}>CONFIRM UPDATES</BlackButton>
      </GradientBottom>
      <CloseButton onPress={() => props.navigation.pop()}>
        <Feather name="x" size={24} color="black" />
      </CloseButton>

      {showTimeModal && <DateTimePickerModal
        isVisible={true}
        onConfirm={time => onChangeTime(time)}
        onCancel={() => setShowTimeModal(false)}
        mode='time'
        date={new Date()}
      />}
    </Container>
  );
};

export default EditCart;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Title = styled(MainBoldFont)`
  font-size: 14px;
  line-height: 22px;
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

const PickDateHeader = styled.View`
  height: 40px;
  background-color: #EDEDED;
  flex-direction: row;
  align-items: center;
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

const OrderTitle = styled(MainBoldFont)`
  color: black;
  font-size: 18px;
  line-height: 22px;
  width: 75%;
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

const ItemSeparator = styled.View`
  height: 9px;
  background-color: #EDEDED;
  width: 100%;
`

const PaddinView = styled.View`
  height: 60px;
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #ddd
`

const SectionView = styled.View`
	align-self:stretch;
	background-color:white;
	padding:${Spacing.LG}px;
	margin-bottom:9px;
`

const UnderLine = styled.View`
  height: 100%;
  border-bottom-width:2px;
  border-bottom-color: #6A6A6A;
  width:15px;
`

const UnderlineButton = styled(TextButton)`
	color: ${Colors.blue};
	font-weight:600;
	font-size:${Sizes.scale(12)}px;
	text-decoration-line: underline;
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

const GradientBottom = styled(GradientView)`
  position: absolute;
  left:0;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-horizontal: 20px;
`

const ItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding-horizontal: 15px;
`

const BottomPadding = styled.View`
  height: 60px;
`

const CartItem = ({ item, onRemove }) => {
  const forceUpdate = useForceUpdate()
  return (
    <Fragment>
      <ItemHeader>
        <OrderTitle numberOfLines={1} ellipsizeMode="tail">{item.product.name?.toUpperCase()}</OrderTitle>
        <UnderlineButton onPress={onRemove}>REMOVE</UnderlineButton>
      </ItemHeader>
      <Description>{item.product.description}</Description>
      <Ingredients tasks={item.product.tasks} modifiers={item.modifiers} style={{ borderTopWidth: 0 }}
        onToggleIngredient={(task) => {
          const modifiers = item.modifiers
          const index = modifiers.findIndex(m => m.id === task.id)
          if (index < 0) {    // Not found, just add
            item.modifiers = [...modifiers, { id: task.id }]
          } else {
            //remove
            const newModifiers = modifiers.slice(0)
            newModifiers.splice(index, 1)
            item.modifiers = newModifiers
          }
          forceUpdate()
        }} />
    </Fragment>
  )
}
