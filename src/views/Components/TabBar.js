import React from 'react'
import { Image } from 'react-native';
import moment from 'moment';
import { filter, isEmpty } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Images } from '@/styles';
import { MainBoldFont } from '@/views/Components';
import { Constants } from '@/Constants';
import { useOvermind } from '@/store';

/*
*
*/
export const TopTabBar = (props) => {
  const navigation = props.navigation;

  return (
    <TopTabBarContainer>
      <MenuButton onPress={() => navigation.toggleDrawer()}>
        <Feather name="menu" size={20} color="black" />
      </MenuButton>
      <TabBody>
        {props.state.routes.map((route, index) => {
          const iconsB = [Images.icons.MouthB, Images.icons.Hat2B, Images.icons.PlatterB];
          const iconsW = [Images.icons.MouthW, Images.icons.Hat2W, Images.icons.PlatterW];
          const screens = ["ALERTS", "KITCHENS", "ORDERS"]

          const icon = (props.state.index === index) ? iconsW[index] : iconsB[index];
          const backgroundColor = (props.state.index === index) ? "black" : "transparent";
          const borderRadius = (index == 0) ? { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 } : (index == 2) ? { borderTopRightRadius: 5, borderBottomRightRadius: 5 } : {};

          return (
            <TabBarItem
              onPress={() => navigation.navigate(screens[index])}
              style={{ backgroundColor, ...borderRadius }}
              key={index}>

              <IconImage source={icon} />
              {/* {index == 0 && user.unreadNotifications?.length > 0 && <BadgeContainer>
                  <TopBadgeNumber>
                      <BadgeText>{user.unreadNotifications?.length}</BadgeText>
                  </TopBadgeNumber>
              </BadgeContainer>} */}
            </TabBarItem>
          )
        })}
      </TabBody>
      <RightButton onPress={() => navigation.navigate("GIFTS")}>
        <CoinImage source={Images.icons.CoinB} />
      </RightButton>
    </TopTabBarContainer>
  )
}

/*
*
*/
export const tabBarScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let icons = {
      ALERTS: "bell",
      KITCHENS: "cloud-lightning",
      ORDERS: "layers",
      GIFTS: "award"
    };

    let iconColor = focused ? "black" : "grey";

    if (route.name == 'SUMMARY') {
      return (
        <CenterIcon>
          <ChewBoxIcon source={Images.icons.ChewBox} />
          <BlackBadge>
            <WhiteText>3</WhiteText>
          </BlackBadge>
        </CenterIcon>
      )
    }
    return (
      <TabItem>
        <Feather name={icons[route.name]} size={20} color={iconColor} />
        {focused && <TabName>{route.name}</TabName>}
      </TabItem>
    );
  }
})

/*
*
*/
export const tabBarOptions = {
  showLabel: false,
  tabStyle: { backgroundColor: Colors.tabBarColor },
}

/*
*
*/
const _BottomButton = () => {
  const navigation = useNavigation()
  const { state } = useOvermind();

  // get the cart with no event
  const carts = filter(state.cart.cartList(state.cart), function (o) { return !(o.event && o.event.id); });
  if (isEmpty(carts)) return null;

  const cart = carts[0];
  const cartItems = cart.items;
  if (isEmpty(cartItems)) return null;

  const badgeNumber = cartItems.length;
  const deliverTo = cart.deliverTo;

  if (deliverTo && deliverTo.name) {
    deliverTo.name.toUpperCase();
    deliverTo.name = (deliverTo.name.length > 22) ? ((deliverTo.name.substring(0, 22 - 3)) + '...') : deliverTo.name;

  } else deliverTo.name = null;

  return (
    <BottomContainer pointerEvents="box-none">
      <BottomButtonContainer activeOpacity={0.9} onPress={() => navigation.navigate("SUMMARY")}>
        <Left>
          <BadgeNumber>{badgeNumber}</BadgeNumber>
        </Left>
        <Body>
          <DeliverBy>{(state.currentUser.lunchtime ? 'DELIVER BY ' + moment(state.currentUser.lunchtime).format("LT") : 'BETWEEN 11AM-1PM')}</DeliverBy>
          <Site>{deliverTo.name}</Site>
        </Body>
        <Right>
          <Feather name="shopping-cart" size={20} color="white" />
        </Right>
      </BottomButtonContainer>
    </BottomContainer>
  )
}

export const BottomButton = _BottomButton;

const TabName = styled(MainBoldFont)`
  font-size: 8px;
  color: black;
`

const TabItem = styled.View`
  align-items: center;
`

const CenterIcon = styled.View`
  width: 60px;
  height: 60px;
  background-color: ${Colors.yellow};
  position: absolute;
  top:-25px;
  align-items:center;
  justify-content: center;
  border-radius:20px;
`

const ChewBoxIcon = styled.Image`
  width: 40px;
  height: 40px;
  background-color: ${Colors.yellow};
  border-radius:10px;
  resize-mode: contain;
  padding: 10px;
`

const BlackBadge = styled.View`
  width: 20px;
  height: 20px;
  background-color: black;
  position: absolute;
  bottom:-10px;
  align-items:center;
  justify-content: center;
  border-radius:10px;
`

const WhiteText = styled(MainBoldFont)`
  font-size: 13px;
  font-weight: bold;
  color: white;
`

const TopTabBarContainer = styled.View`
  padding-top: ${Constants.ToolbarHeight + 10}px;
  flex-direction: row;
  background-color: ${Colors.yellow};
  height: ${60 + Constants.ToolbarHeight + 10}px;
  align-items: center;
  width: 100%;
  padding-horizontal: 5px;
`

const TabBody = styled.View`
  flex: 1;
  margin-horizontal: 20px;
  flex-direction: row;
`

const MenuButton = styled.TouchableOpacity`
  padding: 10px;
  align-items:center;
  justify-content: center;
`

const RightButton = styled.TouchableOpacity`
  align-items:center;
  justify-content: center;
  margin-right: 15px;
`

const CoinImage = styled.Image`
  width: 30px;
  height: 30px;
`

const TabBarItem = styled.TouchableOpacity`
  height: 28px;
  flex: 1;
  border-width: 1px;
  border-color: black;
  align-items: center;
  justify-content: center;
`

const BottomContainer = styled.View`
  position: absolute;
  bottom:0;
  left:0;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 40px;
`

const BottomButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  background-color: black;
  border-radius:15px;
  shadow-opacity: 0.4
  shadow-radius: 4px;
  shadow-color: black;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`

const Left = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 17px;
  background-color: white;
  align-items: center;
  justify-content: center;
`

const BadgeNumber = styled(MainBoldFont)`
  color: black;
  font-size: 18px;
  line-height: 22px;
`

const Right = styled.View`
  padding-horizontal: 5px;
`
const Body = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`

const DeliverBy = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 15px;
  color: #BEBEBE;
`

const Site = styled(MainBoldFont)`
  font-size: 13px;
  color: white;
  line-height: 16px;
  padding-horizontal: 3px;
`

const IconImage = styled.Image`
  width: 40px;
  height: 20px;
  resize-mode: contain
`

const BadgeContainer = styled.View`
  width: 100%;
  top: -10px;
  align-items: center;
  position: absolute;
`

const TopBadgeNumber = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  align-items: center;
  justify-content: center;
`

const BadgeText = styled(MainBoldFont)`
  font-size: 14px;
  color: white;
`