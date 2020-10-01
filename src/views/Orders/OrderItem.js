import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { defaultTo, get } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

import { StyledText, BaseTextInput, MainBoldFont, MainLightFont, MainRegularFont, MainMediumFont, NavBarFilter, GradientView } from '@/views/Components';
import { Spacing } from '@/styles/Dimension';
import { Colors } from '@/styles';
import { useOvermind } from '@/store';

function getStatusStyle(title) {
  return {
    backgroundColor: title === 'PENDING' ? Colors.yellow : (title === 'CANCELED' ? '#D6D6D6' : 'white')
  }
}

const OrderItem = ({ title, deliverBy, raw, eventId, currentUser }) => {
  console.log('RENDERING --> ORDER ITEM');

  const count = raw.items.length;

  const deliveryNote = () => {
    if (get(raw, "event.id", undefined)) {
      return 'DELIVER BY ' + moment(get(raw, "event.days[0].startDate", '')).format('LT')
    } else if (user.lunchtime) {
      return 'DELIVER BY ' + moment(user.lunchtime).format("LT");
    } else {
      return 'DELIVERY BETWEEN 11AM-1PM';
    }
  }

  return (
    <ItemView onPress={props.onPress}>
      <Logo source={{ uri: get(props, 'product.images[0].url', '') }} />

      <Content>
        <RoleView><Role>{title}</Role></RoleView>
        <EventTitle>{deliverBy.toUpperCase()}</EventTitle>
        <HeaderRight>
          <DateContainer>
            <Date>{'$' + raw.total?.toFixed(2)}</Date>
          </DateContainer>
        </HeaderRight>
      </Content>

      <AddressView>
        <Address1>{raw.deliverTo.address}</Address1>
        <Address2>
          {(raw.deliverTo.address2 ? (raw.deliverTo.address2 + ' ∙ ') : '') + raw.deliverTo.city + ', ' +
            raw.deliverTo.state + ' ' + raw.deliverTo.postalCode}
        </Address2>
      </AddressView>
      <Meals>{count + ' items'}</Meals>

      <DeliverBy>
        {deliveryNote()}
      </DeliverBy>
      {eventId && <Users onPress={props.onClick}>
        <Feather name="users" color="#3F3F3F" size={16} />
      </Users>}
    </ItemView>
  )
}

const OrderSummaryItem = props => {
  const priceEach = defaultTo(props.priceEach, 0)
  const quantity = defaultTo(props.quantity, 1)
  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <ItemContainer style={props.style}>
        <Body>
          <Title style={props.showPrice ? { color: 'black' } : {}}>{quantity} x {props.product?.name}</Title>
          <PriceEach>${priceEach.toFixed(2)} each</PriceEach>
        </Body>
        {props.showPrice && <PriceTotal>${quantity * priceEach}</PriceTotal>}
        {props.showRating && props.isReviewed && <Rating>
          <Feather name="star" size={12} color={'#6C6C6C'} />
          {' ' + (props.rating || 0).toFixed(1)}
        </Rating>}
      </ItemContainer>
      {!props.product?.isAddOn && props.isDelivered &&
        <OrderReview
          {...props}
          onPress={props.onPress}
        />}
    </View>
  )
}

const OrderHeader = props => {
  if (props.centerDate) {
    return (
      <Container style={{ backgroundColor: '#FFFFFF' }}>
        <HeaderContainerCenter>
          <DateSubTitle>ORDER FOR</DateSubTitle>
          <DateTextCenter>{props.deliverBy.toUpperCase()}</DateTextCenter>
        </HeaderContainerCenter>
        {!props.isShow && <Wrapper>
          <NavBarFilter
            disabled
            title={props.deliverDate}
            filter={get(props, 'deliverTo.name')} />
        </Wrapper>}
      </Container>
    )
  } else {
    return (
      <Container style={{ backgroundColor: props.color ? '#F5F5F5' : '#FFFFFF' }}>
        <HeaderContainer>
          <HeaderTop>
            <DateText>{props.deliverBy.toUpperCase()}</DateText>
            {props.title != null && <Status style={getStatusStyle(props.title)}>
              <StatusText>{props.title}</StatusText>
            </Status>}
          </HeaderTop>
          <HeaderID>
            {props.id != null && <IDText># {props.id.slice(-5).toUpperCase()}</IDText>}
          </HeaderID>
        </HeaderContainer>
        {!props.isShow && props.user && <Wrapper>
          <NavBarFilter
            disabled
            title={props.deliverDate}
            filter={get(props, 'deliverTo.name')} />
        </Wrapper>}
      </Container>
    )
  }
}

const OrderFooter = props => {
  return (
    <BottomContainer style={{
      flexDirection: props.eventId ? 'row' : 'column',
      justifyContent: props.eventId ? 'space-evenly' : 'center'
    }}>
      {props.eventId && <SmallButton onPress={props.onClick}>
        <SmallButtonText>MANAGE EVENT</SmallButtonText>
      </SmallButton>}
      <SmallButton onPress={props.onPress}>
        <SmallButtonText>VIEW ORDER</SmallButtonText>
        <Feather
          name="chevron-right"
          size={18}
          color={'black'}
        />
      </SmallButton>
    </BottomContainer>
  )
}

function isReviewed(item) {
  return (item.rating !== null && item.rating !== undefined &&
    item.comments !== null && item.comments != undefined)
}

const OrderReview = props => (
  <ReviewContainer>
    <ReviewButton onPress={props.onPress}>
      <ReviewTitle>How was your meal?</ReviewTitle>
      <ReviewPoint>
        {isReviewed(props) ? 'You earned 200 Points!' : 'Leave a review. Earn 200 Points'}
      </ReviewPoint>
      <StarContainer>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={props.rating || 0}
          starSize={18}
          starStyle={{ margin: 5 }}
          halfStarEnabled
          fullStarColor={'#F8E71C'}
          emptyStarColor="#919191"
        />
      </StarContainer>
    </ReviewButton>
  </ReviewContainer>
)

function getIndex(p) {
  if (p == undefined) {
    return 1
  }
  if (p === 10) {
    return 0
  } else if (p === 15) {
    return 1
  } else if (p === 20) {
    return 2
  } else {
    return 3
  }
}

const TipSelector = props => {
  const [index, setIndex] = useState(getIndex(props.percent))
  const [tipValue, setTipValue] = useState((props.tip || 0).toFixed(2))
  let input_ref = null

  const onChangeType = (index) => {
    if (props.onChange) {
      const value = [10, 15, 20, Number(tipValue)]
      const type = ['%', '%', '%', '$']
      props.onChange({ tipAmount: value[index], tipType: type[index] })
    }
    setIndex(index)
  }

  const onChangeCustomTip = (text) => {
    setTipValue(text)
    props.onChange && props.onChange({ tipAmount: Number(text), tipType: '$' })
  }

  useEffect(() => {
    setIndex(getIndex(props.percent))
    setTipValue((props.tip || 0).toFixed(2))
  }, [props.percent])

  return (
    <View>
      <TipServiceTitle>TOTALS</TipServiceTitle>
      <TipRow>
        <OptionBox onPress={() => onChangeType(0)} style={{ backgroundColor: index == 0 ? 'black' : '#DBDBDB' }}>
          <Feather name="check" size={16} color={index == 0 ? 'white' : '#DBDBDB'} />
        </OptionBox>
        <TipTitle>10% Tip</TipTitle>
        <TipPrice>${(props.total / 10).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => onChangeType(1)} style={{ backgroundColor: index == 1 ? 'black' : '#DBDBDB' }}>
          <Feather name="check" size={16} color={index == 1 ? 'white' : '#DBDBDB'} />
        </OptionBox>
        <TipTitle>15% Tip <MainRegularFont>(Recommended)</MainRegularFont></TipTitle>
        <TipPrice>${(props.total / 100 * 15).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => onChangeType(2)} style={{ backgroundColor: index == 2 ? 'black' : '#DBDBDB' }}>
          <Feather name="check" size={16} color={index == 2 ? 'white' : '#DBDBDB'} />
        </OptionBox>
        <TipTitle>20% Tip</TipTitle>
        <TipPrice>${(props.total / 100 * 20).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => onChangeType(3)} style={{ backgroundColor: index == 3 ? 'black' : '#DBDBDB' }}>
          <Feather name="check" size={16} color={index == 3 ? 'white' : '#DBDBDB'} />
        </OptionBox>
        <TipTitle>Custom Tip</TipTitle>
        <View>
          <TipInput
            ref={e => input_ref = e}
            placeholder="--"
            placeholderColor="#6B6B6B"
            editable={index == 3}
            keyboardType="decimal-pad"
            onChangeText={onChangeCustomTip}
            value={index != 3 ? '' : tipValue}
          />
          <DollarSign>$</DollarSign>
        </View>
      </TipRow>
    </View>
  )
}

export const InviteeItem = ({ user, items, fullName, avatar, id, orders }) => {
  const order = orders.find(o => o.user.id === id)
  return (
    <InviteeItemContainer>
      <LeftUserContainer>
        <Avatar source={{ uri: avatar || '' }} />
        <UserName>{fullName}</UserName>
      </LeftUserContainer>
      <RightContainer>
        {get(order, 'items.length', 0) > 0 ?
          <FlatList
            data={get(order, 'items')}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <OrderSummaryItem {...item} showPrice style={{ paddingHorizontal: 20 }} />}
            ItemSeparatorComponent={ItemSeparator}
          /> :
          <View style={{ paddingHorizontal: -10 }}>
            <ItemContainer>
              <Body>
                <Title style={{ color: 'lightgray', fontSize: 13, marginLeft: -10 }}>Nothing ordered yet</Title>
              </Body>
              <Price>$--</Price>
            </ItemContainer>
          </View>
        }

      </RightContainer>
    </InviteeItemContainer>
  )
}

const InviteeOrders = ({ data, add, selected, props, done, users }) => {
  return (
    <InviteeContainer>
      <InviteeOrderHeader>
        <DateTextCenter>ATTENDEE ORDERS</DateTextCenter>
        {add && <Add onPress={() => {
          props.navigation.navigate('UserSelector', {
            selected: users,
            // added: selected,
            done: (added) => {
              done(added)
            }
          })
        }}><AddTitle>+</AddTitle></Add>}
      </InviteeOrderHeader>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <InviteeItem {...item} orders={data} />}
      />
    </InviteeContainer>
  )
}

export { OrderItem, OrderHeader, OrderFooter, TipSelector, InviteeOrders, OrderSummaryItem }

const Container = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    margin-top: 10px;
`

const Users = styled.TouchableOpacity`
    position: absolute;
    right: 11px;
    bottom: 11px;
`

const Meals = styled(MainLightFont)`
    top: -32px;
    right: 11px;
    font-size: 8px;
    line-height: 9px;
    text-align: right;
    justify-content: flex-end;
    align-items: flex-end;
    color: #202020;
`

const DeliverBy = styled(MainRegularFont)`
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: #202020;
  margin-bottom: 11px;
  margin-left: 15px;
`

const AddressView = styled.View`
  padding-left: 15px;
`

const Address1 = styled(MainRegularFont)`
  font-size: 12px;
  line-height: 19px;
  font-weight: 600;
  color: #202020;
`

const Address2 = styled(MainLightFont)`
  font-size: 11px;
  line-height: 11px;
  color: #202020;
`

const Logo = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
  border-radius: 10px;
`

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 11px;
  padding-top: 14px;
`

const RoleView = styled.View`
  background-color: #EAEAEA;
  padding-horizontal: 9px;
  padding-vertical: 2px;
  border-radius: 8px;
`

const Role = styled(StyledText)`
    font-size:10px;
    line-height:19px;
    font-weight:bold;
    color:#202020;
`

const ItemView = styled.TouchableOpacity`
  background-color: white;
  margin-horizontal: 14px;
  margin-top: 14px;
  border-radius: 10px;
`
const EventTitle = styled(StyledText)`
  font-size: 14px;
  line-height: 19px;
  font-weight: bold;
  color: #202020;
  margin-left: 6px;
`

const DateContainer = styled.View`
  align-items: flex-start;  
`

const Date = styled(StyledText)`
    font-size:14px;
    line-height:19px;
    font-weight:bold;
    color:#3F3F3F;
    text-align: right;
`

const HeaderRight = styled.View`
  flex:1;
  justify-content: center;
  align-items: flex-end;
`

const Add = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #FFFFFF;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 6px;
`

const AddTitle = styled(MainBoldFont)`
    font-size: 18px;
    line-height: 22px;
    color: #000000;
`

const Wrapper = styled.View`
    width: 270px;
    height: 36px;
    margin-top: 10px;
`

const ItemContainer = styled.View`
    padding-horizontal: 30px;
    padding-top: 24px;
    padding-bottom: 19px;
    flex-direction: row;
`

const TipServiceTitle = styled(MainLightFont)`
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    color: #000000;
    margin-top: 26px;
    margin-bottom: 13px;
    padding-horizontal: 5px;
`

const Title = styled(MainBoldFont)`
    color: #000000;
    font-size: 14px;
    line-height: 19px;
`

const PriceEach = styled(MainRegularFont)`
    font-size: 12px;
    color: #3F3F3F;
    line-height: 19px;
`
const PriceTotal = styled(MainBoldFont)`
    font-size: 14px;
    line-height: 19px;
    color: #000000;
    margin-right: 10px;
`

const Price = styled(MainBoldFont)`
    font-size: 14px;
    line-height: 19px;
    color: #000000;
`

const Body = styled.View`
    flex: 1;
`

const HeaderContainer = styled.View`
    width: 100%;
`

const HeaderTop = styled.View`
    background-color: black;
    padding-left: 20px;
    padding-right:${Spacing.XS}px;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    align-self:stretch;
`

const HeaderID = styled.View`
    align-items:flex-end;
    padding-right:${Spacing.SM}px;
`

const HeaderContainerCenter = styled.View`
    width: 100%;
    padding-horizontal: 28px;
    margin-bottom: 6px;
    margin-top: 5px;
`

const InviteeOrderHeader = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
`

const DateText = styled(MainBoldFont)`
    font-size: 14px;
    line-height: 19px;
    color: white;
`

const DateSubTitle = styled(MainBoldFont)`
    font-size: 12px;
    line-height: 19px;
    color: #000000;
`

const DateTextCenter = styled(MainBoldFont)`
    font-size: 18px;
    line-height: 19px;
    color:black;
`

const Status = styled.View`
    background-color: ${Colors.yellow};
    height: 20px;
    border-radius: 10px;
    width: 100px;
    align-items: center;
    justify-content: center;
`

const StatusText = styled(MainBoldFont)`
    font-size: 10px;
    color: black;
`

const BottomContainer = styled.View`
    height: 50px;
    width: 100%;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 45px;
`

const ReviewContainer = styled.View`
    width: 100%;
    padding-left: 20px;
    justify-content: center;
`

const SmallButton = styled.TouchableOpacity`
    height: 35px;
    width: 159px;
    flex-direction: row;
    border-radius: 30px;
    border-color: #000000;
    border-width: 1px;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 18px;
`

const ReviewButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`

const SmallButtonText = styled(MainBoldFont)`
    font-size: 12px;
    line-height: 15px;
    color: black;
`

const TipRow = styled.View`
    flex-direction: row;
    height: 33px;
    align-items: center;
    padding-horizontal: 16px;
`

const OptionBox = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`

const TipTitle = styled(MainLightFont)`
    color: black;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    margin-left: 8px;
    flex: 1;
`

const TipPrice = styled(MainLightFont)`
    color: black;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
`

const TipInput = styled(BaseTextInput)`
    height:33px;
    width: 56px;
    background-color: #E4E4E4;
    border-radius: 20px;
    margin-right: -10px;
    color: black;
    padding-right: 8px;
    padding-left: 16px;
    text-align:center;
    font-size: 12px;
`

const IDText = styled(MainBoldFont)`
    font-size: 12px;
    line-height: 19px;
    color: #b5b5b5;
`

const Rating = styled(MainBoldFont)`
    font-size: 12px;
    color: #6C6C6C;
`

const InviteeContainer = styled.View`
    border-bottom-color: #D2D2D2;
    border-bottom-width: 1px;
    margin-vertical: 20px;
`

const InviteeItemContainer = styled.View`
    flex-direction: row;
    background-color: white;
    border-bottom-width: 1px;
    border-bottom-color: #D2D2D2;
`

const RightContainer = styled.View`
    flex: 1;
`

const LeftUserContainer = styled.View`
    width: 25%
    align-items: center;
    padding: 10px;
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

const ItemSeparator = styled.View`
    width: 100%;
    height: 1px;
    background-color: #D2D2D2;
`;

const DollarSign = styled(MainLightFont)`
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 12px;
    line-height: 15px;
    color: #6B6B6B;
`

const ReviewTitle = styled(MainBoldFont)`
    font-size: 17px;
    line-height: 21px;
    color: black;
    text-align: center;

    margin-top: 5px;
`

const ReviewPoint = styled(MainLightFont)`
    font-size: 13px;
    line-height: 16px;
    color: black;
    text-align: center;
`

const StarContainer = styled.View`
    align-items: center;
`
