import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { get, find, isEmpty } from 'lodash';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { StyledText, MainBoldFont, MainLightFont, MainRegularFont } from '@/views/Components';
import AttendeesAvatars from './AttendeesAvatars';
import { Sizes, Images } from '@/styles';

const EventItem = ({ item: event, fromOrder }) => {
  const startDate = get(event, 'days[0].startDate', null)
  const endDate = get(event, 'days[0].endDate', null)
  const date = startDate || endDate
  const eventDay = event.days[0]
  const payMessage = eventDay.paymentSetting === 'EACH_PAY' ? 'Everyone pays their way' : 'Your Treat!'
  const role = event.creator && event.creator.id === user.id ? 'HOST' : 'GUEST'
  const navigation = useNavigation()
  const hasNoOrder = isEmpty(find(event.orders, function (o) { return o.user && o.user.id === user.id }))
  const myCart = (event.carts != null ? event.carts.find(o => o.user && o.user.id == user.id) : null)
  const isInvitee = event.invitees.findIndex(i => i.id === user.id) >= 0

  const onAddToOrder = () => {
    navigation.navigate('Kitchens', { event: event })
  }

  const onCheckout = async () => {
    CartStore.fetchCarts(event.id)
    navigation.navigate('SUMMARY', { eventId: event.id })
  }

  const { site } = eventDay
  const address = site.address + ' ' + (site.address2 ? site.address2 : '') + ' ∙ '
    + site.city + ', ' + site.state;

  return (
    <Container onPress={() => navigation.navigate(fromOrder ? 'EventOrderDetail' : 'EventDetail', { event })}>
      <Header>
        <RoleView>
          <Role>{role}</Role>
        </RoleView>
        <EventTitle>
          {((event.name.toUpperCase()).length > 20) ? (((event.name.toUpperCase()).substring(0, 20 - 3)) + '...') : event.name.toUpperCase()}
        </EventTitle>
        <HeaderRight>
          <DateContainer>
            <Date>{moment(date).format('MMM D • hA').toUpperCase()}</Date>
          </DateContainer>
        </HeaderRight>
      </Header>
      <EventDetail>
        <Content disabled={role !== 'HOST'}>
          <Site>
            <Title>
              {eventDay.site?.name || ''}
            </Title>
            <Subtitle>{address}</Subtitle>
          </Site>
        </Content>
        <SiteLeft>
          <AttendeesAvatars style={{ marginLeft: 10 }} width={Sizes.scale(70)} users={event && event.invitees || []} />
        </SiteLeft>
        <AttendesContainer>
          <Attendees>
            {event && event.invitees.length} Attendees {event.days[0].paymentSetting !== "EACH_PAY" && `∙ ${event.creator?.firstName}\'s Treat`}
          </Attendees>
        </AttendesContainer>
        {(event.isLocked || event.isCancelled) ?
          <StateView>
            <Ionicons
              name={event.isCancelled ? 'ios-remove-circle' : (hasNoOrder && 'ios-close-circle')}
              size={12}
              color={(hasNoOrder || event.isCancelled) && '#B70000'}
            />
            <StateText>{event.isCancelled ? 'CANCELLED' : (hasNoOrder && 'UNCONFIRMED')}</StateText>
          </StateView> :
          (
            hasNoOrder ? (
              myCart != null ?
                <StateView>
                  <CartInfoContainer>
                    <CartNumberContainer>
                      <CartNumber>{event.carts?.length || 0}</CartNumber>
                    </CartNumberContainer>
                    <Feather name="shopping-cart" size={15} color="white" style={{ marginRight: 6 }} />
                  </CartInfoContainer>
                </StateView> :
                <StateView>
                  <Image source={Images.icons.PlatterB} style={{ width: 13, height: 13, resizeMode: 'contain' }} />
                  <StateText>Pick Meal</StateText>
                </StateView>
            ) : (
                <StateView>
                  <Ionicons name='ios-checkmark-circle' size={12} color='#1FDE00' />
                  <StateText>CONFIRMED</StateText>
                </StateView>
              )
          )
        }
        <Manage>
          <MyRightArrow name="chevron-right" size={15} color="black" />
        </Manage>
      </EventDetail>
    </Container>
  )
}

const Container = styled.TouchableOpacity`
      margin-top: 18px;
      margin-horizontal: 14px;
      border-radius: 10px;
      background-color: #FFFFFF;
      padding-vertical: 15px;
      padding-horizontal: 16px;
      `

const StateView = styled.View`
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0px;
      top: 2px;
`

const StateText = styled(MainRegularFont)`
      font-size: 9px;
      line-height: 11px;
      font-weight: 600;
      color: #000000;
      margin-left: 3px;
`

const RoleView = styled.View`
      background-color: #EAEAEA;
      padding-horizontal: 9px;
      padding-vertical: 2px;
      border-radius: 8px;
      `

const Header = styled.View`
      flex-direction: row;
      `

const Title = styled(MainLightFont)`
      font-size: 13px;
      line-height: 19px;
      color: #202020;
      font-weight: 600;
      width: 70%;
      `

const Subtitle = styled(StyledText)`
      font-size: 11px;
      line-height: 14px;
      color: #202020;
      width: 70%;
      `

const Content = styled.TouchableOpacity`
      flex-direction: row;
      align-self: stretch;
      align-items: flex-start;
      justify-content:flex-start;
      `

const Site = styled.View`
      flex: 1;
      `

const EventDetail = styled.View`
      align-items: center;
      `

const HeaderLeft = styled.View`
      flex: 1;
      justify-content: center;
      align-items: flex-start;
      `

const HeaderRight = styled(HeaderLeft)`
      align-items: flex-end;
      `

const DateContainer = styled.View`
      align-items: flex-start
      margin-top: 4px
      `

const Date = styled(StyledText)`
      font-size:12px;
      line-height:12px;
      font-weight:bold;
      color:#000;
      text-align: right;
      `

const Role = styled(StyledText)`
      font-size:10px;
      line-height:19px;
      font-weight:bold;
      color:#202020;
      `

const EventTitle = styled(StyledText)`
      font-size: 14px;
      line-height: 19px;
      font-weight:bold;
      color:#202020;
      margin-left: 6px;
      margin-top: 2px;
      `

const Attendees = styled(StyledText)`
      font-size:10px;
      color:#202020;
      line-height:13px;
      margin-top: 5px;
      `

const SiteLeft = styled.View`
      align-self: flex-start;
      align-items: flex-start;
      justify-content:flex-start;
      margin-top: 10px;
      margin-left: -10px;
      `

const AttendesContainer = styled.View`
      align-self: flex-start;
      justify-content:flex-start;
      align-items:flex-start;
      margin-top: -10px;
      margin-left: 5px;
      `

const CartInfoContainer = styled.View`
      width: 50px;
      height: 22px;
      border-radius: 11px;
      background-color: black;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      `

const CartNumberContainer = styled.View`
    height: 19px;
    width: 19px;
    border-radius: 9.5px;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin-left: 1px;
`

const CartNumber = styled(MainBoldFont)`
    font-size: 14px;
    line-height: 17px;
    color: black;
`

const Manage = styled.View`
      align-items: flex-end;
      justify-content: flex-end;
      align-self: flex-end;
      `

const MyRightArrow = styled(Feather)`
      position: absolute;
      right: -5px;
      bottom: 3px;
      `
export default EventItem
