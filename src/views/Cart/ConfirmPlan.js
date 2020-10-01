import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import { SectionList, ScrollView, TextInput, View, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { isNil, get } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import {
  NavBarFilter, MainBoldFont, MainRegularFont, MainLightFont, MainSemiBoldFont, BlackButtonContainer, BlackBtnTitle,
  TextButton, BottomContainer, RadioOptions
} from '@/views/Components';
import { Braintree } from '@/views/Components/braintree';
import CartSummary from '@/views/Cart/CartSummary';
import { useLoadingHud, useDelay } from '@/hooks/Utils';
import { Colors } from '@/styles';
import { OrderItem, OrderHeader, InviteeOrders, OrderSummaryItem } from '@/views/Orders/OrderItem';
import { themeProp } from '@/utils/CssUtil';
import { Spacing } from '@/styles/Dimension';
import { Constants, Screens } from '@/Constants';
import { useOvermind } from '@/store';

const tag = 'ConfirmPlan:: ';

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const ConfirmPlan = props => {
  const { state, actions } = useOvermind();
  const { alert, hud, g, user } = state;
  
  const [isLoading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [isUseBalance, setUseBalance] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState(user.firstPaymentMethod)
  const [inviteeOrders, setInviteeOrders] = useState([])
  const [notes, setNotes] = useState('')
  const [isBorder, setBorder] = useState(false);
  const [total, setTotal] = useState(null);
  let summary_ref = null;

  const isEventCart = () => {
    return props.route.params?.eventId !== undefined
  }

  const cart = isEventCart() ? state.eventCart : state.currentCart;
  const sectionData = isEventCart() ? CartStore.eventSectionData : CartStore.sectionData;

  const prefix = () => {
    if (isEventCart()) return 'Event ';
    return '';
  }

  const createOrderInternal = async (method) => {
    const tipAmount = summary_ref?.tipAmount || 0;
    const tipType = summary_ref?.tipType || "$";
    const cart = props.route.params?.eventId ? state.eventCart : state.currentCart;

    console.log(tag, 'createOrderInternal() - Cart Info', cart, isEventCart(), method);

    const variables = {
      cartId: cart?.id,
      useWallet: isUseBalance,
      tipType,
      tipAmount,
      notes
    }
    if (get(method, "id", undefined)) {
      variables.paymentMethodId = method.id;
    }

    console.log("====>create order", variables)

    const { error, result } = await actions.order.createOrder(variables);
    actions.hud.hide();

    console.log("=====>", error, result)
    
    if (error == null && result.errors == null) {
      if (isEventCart()) {
        props.navigation.navigate("EventList");
        actions.event.refreshEvents();

      } else {
        props.navigation.navigate("ORDERS");
        actions.order.refreshOrders();
      }

      // Trigger Orders update
      g.triggerOrdersUpdate()

      actions.cart.fetchCarts();
    }
  }

  const addPaymentFromOption = useAddPayment(({ data, added, error }) => {
    action.hud.hide();
    if (data) {
      // set the payment method from user, not from data from braintree
      setPaymentMethod(added || user.firstPaymentMethod)
    }
    if (error) {
      console.log("ConfirmPlan:: addPaymentFromOption() - Error Occured:", error)
    }
  })

  const addPaymentBeforeConfirm = useAddPayment(({ data, added, error }) => {
    if (added) {
      createOrderInternal(added)
    } else {
      // Fail out, do not call the api
      actions.hud.hide()
    }
  })

  const { showActionSheetWithOptions } = useActionSheet()

  useLoadingHud(CartStore.isfetching || isLoading)

  const onPressContinueEditing = () => {
    navigation.navigate("KITCHENS")
  }

  const createOrder = async () => {
    hud.show()
    if (!paymentMethod && cart.total && cart.total > 0.001) {   // if no paymentmethod is selected and total is set
      addPaymentBeforeConfirm()
    } else if (!paymentMethod && cart.total === 0) {
      await createOrderInternal()
    } else {
      await createOrderInternal(paymentMethod)
    }
  }

  const onChangeTip = (tip) => {
    let changeTip = 0;
    console.log(tip);
    if (tip.tipType === "$") {
      changeTip = parseFloat(tip.tipAmount);
    } else {
      changeTip = cart.subtotal * parseFloat(tip.tipAmount) / 100;
    }
    setTotal(cart.subtotal + changeTip + cart.tax - cart.discount);
  }

  const onChangePaymentMethod = useDelay(() => {
    if (isNil(paymentMethod)) {
      // Show braintree
      hud.show()
      addPaymentFromOption()
    } else {
      let options = ['Add a new payment method']
      const payments = user.paymentMethods.filter(p => p.type === 'payment')
      options = options.concat(payments.map(p => `Card ending in ${(p.last4 || '').replace(/\D/g, '')}`))
      options.push('Cancel')

      const cancelButtonIndex = payments.length + 1
      showActionSheetWithOptions(
        { options, cancelButtonIndex },
        async buttonIndex => {
          if (buttonIndex === 0) {
            // Show braintree
            hud.show()
            addPaymentFromOption()
          } else if (buttonIndex !== cancelButtonIndex) {
            setPaymentMethod(payments[buttonIndex - 1])
          }
        }
      )
    }
  })

  const goEditCart = () => {
    props.navigation.navigate("EditCart", { eventId: props.route.params?.eventId })
  }

  const onEmpty = async () => {
    hud.show();
    try {
      const isSuccess = await CartStore.emptyCart({ deleteCart: true }, cart.event?.id)
      isSuccess && props.navigation.navigate("Home");
    } catch (e) {
      console.log(e);
    } finally {
      hud.hide();
    }
  }

  const fetchInviteeOrders = async () => {
    setLoading(true)
    const { error, result } = await Api.getInviteeOrders({
      userId: user.id,
      eventId: props.route.params.eventId
    })
    console.log('========>fetchInviteeOrders', {
      userId: user.id,
      eventId: props.route.params.eventId
    }, error, result)
    setLoading(false)
    if (error == null && result.errors == null) {
      setInviteeOrders(result.data.getInviteeOrders)
    }
  }

  const onCloseModal = () => {
    props.navigation.pop()
  }

  useEffect(() => {
    if (isEventCart()) {
      fetchInviteeOrders()
    }
  }, []);

  const totalExists = cart && cart.total && cart.total > 0.001;
  const deliveryNote = () => {
    if (get(cart, "event.id", undefined)) {
      return 'DELIVER BY ' + moment(get(cart, "event.days[0].startDate", '')).format('LT')
    } else if (user.lunchtime) {
      return 'DELIVER BY ' + moment(user.lunchtime).format("LT");
    } else {
      return 'DELIVERY BETWEEN 11AM-1PM';
    }
  }

  const renderContent = () => {
    return (
      <Container>
        {isEventCart() && <SiteView>
          <Wrapper>
            <NavBarFilter disabled title={deliveryNote()} filter={get(toJS(sectionData)[0], "deliverTo.name")} />
          </Wrapper>
        </SiteView>}
        <SectionList
          sections={toJS(sectionData)}
          keyExtractor={(item, index) => item.product.name + index + Math.random() * 10000}
          renderItem={({ item }) => <OrderSummaryItem {...item} showPrice />}
          ItemSeparatorComponent={ItemSeparator}
          renderSectionHeader={({ section: { deliverBy, deliverTo } }) => (
            <OrderHeader
              centerDate
              deliverBy={deliverBy}
              user={user}
              deliverTo={deliverTo}
              deliverDate={deliveryNote()}
              isShow={isEventCart()} />
          )}
        />

        {cart != null && <CartSummary
          ref={e => summary_ref = e}
          tip={cart.tip}
          tipPercentage={cart.tipPercentage}
          subtotal={cart.subtotal}
          tax={cart.tax}
          total={cart.total}
          discount={cart.discount}
          eventName={get(cart, 'event.name')}
          onChangeTip={onChangeTip}
        />}

        {cart != null && <BottomPadding>

          {totalExists == true && <PaymentSection>
            <PaymentMethodTitle>PAYMENT METHOD</PaymentMethodTitle>
            <SelectOption style={{ marginTop: 10, marginBottom: 20 }} onPress={onChangePaymentMethod}>
              <SelectOptionTitle>
                {paymentMethod ? `Card ending in ${(paymentMethod.last4 || '').replace(/\D/g, '')}` : 'Add a new payment method'}
              </SelectOptionTitle>
              <SelectOptionIcon>
                <Feather name='chevron-down' size={12} color='#7d7979' />
              </SelectOptionIcon>
            </SelectOption>

            {
              user.points > 0 && <RadioOptions
                style={{ marginBottom: 25 }}
                items={[`Use my ${user.points} points towards my order`]}
                selected={isUseBalance ? 0 : -1}
                onChange={(index) => setUseBalance(!isUseBalance)} />
            }
          </PaymentSection>
          }
        </BottomPadding>
        }
        {cart !== null && <BottomPadding style={{ marginTop: 9, marginBottom: 100 }}>
          <DeliverySection>
            <DeliveryTitle>DELIVERY NOTES</DeliveryTitle>
            <DeliveryContent
              multiline
              numberOfLines={3}
              onChangeText={(value) => setNotes(value)}
              onFocus={() => setBorder(true)}
              onBlur={() => setBorder(false)}
              isBorder={isBorder}
            />
          </DeliverySection>
        </BottomPadding>
        }
      </Container>
    )
  }

  const renderNavBar = () => (
    <StickyHeader>
      <ParallaxTitle>{prefix()}Meal Summary</ParallaxTitle>
      {cart != null &&
        <ParallaxPrice>${total && total.toFixed(2) || cart.total?.toFixed(2)}</ParallaxPrice>}
    </StickyHeader>
  )

  const renderHeader = () => (
    <HeaderContainer pointerEvents="box-none">
      <Title>{prefix()}Order Summary</Title>
      <Description>Edit this order until 6pm the day before delivery</Description>
      {
        cart != null && <HeaderCenter pointerEvents="box-none">
          <TotalPrice>${total && total.toFixed(2) || cart.total?.toFixed(2)}</TotalPrice>
          <BtnView>
            <EditButton onPress={() => goEditCart()}>
              <Link>EDIT ORDER</Link>
            </EditButton>
            <EditButton onPress={() => onEmpty()}>
              <Link>CANCEL ORDER</Link>
            </EditButton>
          </BtnView>
        </HeaderCenter>
      }
    </HeaderContainer>
  )

  return (
    <KeyboardAvoiding behavior="padding" enabled={window.isiOS}>
      <ReactNativeParallaxHeader
        headerMinHeight={60}
        headerMaxHeight={200}
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
      />
      {cart != null && <BottomContainer style={{ alignItems: 'center' }}>
        <ConfirmButton onPress={() => createOrder()}>
          <ConfirmRight />
          <BlackBtnTitle>FINALIZE THIS ORDER</BlackBtnTitle>
          <ConfirmRight>
            <ConfirmOrderTotal>${total && total.toFixed(2) || cart.total?.toFixed(2)}</ConfirmOrderTotal>
          </ConfirmRight>
        </ConfirmButton>
        <ContinueLink onPress={onPressContinueEditing}><MainBoldFont style={{ fontSize: 12, lineHeight: 15 }}>or add more meals to my calendar</MainBoldFont></ContinueLink>
      </BottomContainer>
      }
      <CloseButton onPress={onCloseModal}>
        <Feather name="x" size={24} color="black" />
      </CloseButton>
    </KeyboardAvoiding>
  )
}

export default ConfirmPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: 44,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1
`;

const SiteView = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  background-color: #FFFFFF;
`

const Wrapper = styled.View`
  width: 270px;
  height: 36px;
  margin-top: 10px;
`

const Container = styled.View`
  flex:1;
  background-color: ${Colors.background}
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
  margin-left: 15px;
  margin-top: 4px;
`

const HeaderCenter = styled.View`
  width: 100%;
  padding: 17px;
  align-items: center;
`

const TotalPrice = styled(MainBoldFont)`
  font-size: 36px;
  line-height: 44px;
  color: black;
`

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #D2D2D2;
`;

const ConfirmRight = styled.View`
  flex:1;
  align-items:flex-end;
  margin-right: ${Spacing.MD}px;
`

const ConfirmOrderTotal = styled(MainBoldFont)`
  font-size: 14px;
  color: white;
`

const ConfirmButton = styled(BlackButtonContainer)`
  flex-direction:row;
  height: 37px;
  margin-horizontal: 5px;
`

const ContinueLink = styled(TextButton)`
  margin-top: ${Spacing.XS}px;
  color: #797979;
  text-decoration-line:underline;
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

const BtnView = styled.View`
  flex-direction: row;
  align-items: center;
`

const EditButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #EDEDED;
  padding-horizontal: 11px;
  padding-vertical: 5px;
  margin-horizontal: 4.5px;
  border-radius: 10px;
`

const Link = styled(MainBoldFont)`
  font-size: 12px;
  color: #007AFF;
  margin-vertical:5px;
  text-align: center;
  text-decoration-line: underline;
`

const BottomPadding = styled.View`
  padding-horizontal: 20px;
  background-color: #FFFFFF;
`;

const DeliverySection = styled.View`
  margin-top: 20px;
  padding-horizontal: 5px;
`;

const DeliveryTitle = styled(MainLightFont)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const DeliveryContent = styled(TextInput)`
  height: 100px;
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 9px;
  margin-bottom: 30px;
  padding-horizontal: 12px;
  padding-vertical: 5px;
  border-radius: 10px;
  border-color: ${props => props.isBorder ? "#000000" : "#f2f2f2"};
  border-width: 1px;
`;

const PaymentSection = styled.View`
  margin-top:26px;
  background-color: #FFFFFF;
`

const PaymentMethodTitle = styled(MainBoldFont)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
`

const SelectOption = styled.TouchableOpacity`
  height: 50px;
  border-radius: 12px;
  background-color: #F2F2F2;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
`

const SelectOptionTitle = styled(MainSemiBoldFont)`
  font-size: 13px;
  line-height: 19px;
  color:#3f3f3f;
`

const SelectOptionIcon = styled.View`
  align-items:center;
  justify-content:center;
`

const HeaderContainer = styled.View`
  width: 100%;
  background-color: white;
`

const ParallaxTitle = styled(MainBoldFont)`
  font-size: 14px;
  text-align: center;
`

const StickyHeader = styled.View`
  padding-top: 15px;
  shadow-opacity: 0.4;
  shadow-color: black;
  shadow-radius:3;
  background-color: white;
  height: 60px;
`

const ParallaxPrice = styled(MainBoldFont)`
  font-size: 16px;
  line-height: 20px;
  color: black;
  text-align: center;
`
