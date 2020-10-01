import React from 'react';
import { get } from 'lodash';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import VersionNumber from 'react-native-version-number';
import { useNavigation } from '@react-navigation/native';

import { Constants } from '@/Constants';
import { Styles, Images, Sizes } from '@/styles';
import { Spacing, FontSize } from '@/styles/Dimension';
import { StyledText, MainSemiBoldFont, Avatar, CloseButton } from '@/views/Components';
import { useOvermind } from '@/store';

const Menu = props => {
  const { state, actions } = useOvermind();
  const { window, currentUser, notification } = state;
  const navigation = useNavigation();

  const avatarSource = currentUser.avatar ? { uri: currentUser.avatar } : Images.icons.Avatar;
  const showUserPaymentMethods = actions.user.addUserBraintreePayment();

  const isDriver = (currentUser.groups.find(o => o.name == 'driver'))

  const menus = [
    { title: 'EDIT PROFILE', onPress: navigate => navigate("Profile"), visible: true },
    { title: 'EVENTS', onPress: navigate => navigate("EventList"), visible: !isDriver },
    { title: isDriver ? "PAYMENT ACCOUNTS" : 'PAYMENT METHODS', onPress: () => showUserPaymentMethods(), visible: true },
    { title: 'GET HELP', onPress: navigate => navigate("Help"), visible: true },
    {
      title: 'SIGN OUT', onPress: (navigate) => {
        Alert.alert(
          "Please confirm",
          "Are you sure you want to sign out?",
          [
            { text: "Cancel", style: 'cancel', onPress: () => { } },
            {
              text: "OK", style: 'ok', onPress: () => {
                actions.user.logout();
                navigate("SignIn");
              }
            }
          ]
        )
      }, visible: true
    },
  ];

  const userSiteName = get(currentUser, 'site.name', '');
  const userSiteAddress = get(currentUser, 'site.address', '');
  const userSiteFullAddress = get(currentUser, 'site.address', '');

  return (
    <MenuContainer>
      {/* <BackgroudImage source={Images.background.homedrawer} width={window.width} resizeMode='repeat' /> */}
      <HeaderContainer>
        <CloseButton onPress={() => props.navigation.closeDrawer()} />
      </HeaderContainer>
      {window.isiOS ?
        <ProfileContainer>
          <Avatar source={avatarSource} />
          <UserName>{currentUser.fullName}</UserName>
          {userSiteName !== userSiteAddress && <Employ>{userSiteName}</Employ>}
          <Address>{userSiteFullAddress}</Address>
          {currentUser.lunchtime != null && <LunchTimeContainer> <LunchTime>LUNCHTIME {moment(currentUser.lunchtime).format('h:mmA')}</LunchTime> </LunchTimeContainer>}
        </ProfileContainer> :
        <ScrollView style={{ paddingVertical: 10 }}>
          <ProfileContainer>
            <Avatar source={avatarSource} />
            <UserName>{currentUser.fullName}</UserName>
            {userSiteName !== userSiteAddress && <Employ>{userSiteName}</Employ>}
            <Address>{userSiteFullAddress}</Address>
            {currentUser.lunchtime != null && <LunchTimeContainer> <LunchTime>LUNCHTIME {moment(currentUser.lunchtime).format('h:mmA')}</LunchTime> </LunchTimeContainer>}
          </ProfileContainer>
        </ScrollView>
      }

      <Bottom>
        {menus.map((item, index) => item.visible && (
          <View key={index} style={{ width: '100%' }}>
            <MenuItem
              activeOpacity={0.8}
              key={index}
              onPress={() => item.onPress(navigation.navigate, currentUser, notification)}
              style={{ height: window.isiOS ? 60 : 50 }}
            >
              <MenuText>{item.title}</MenuText>
              <Feather name='chevron-right' size={20} color='white' />
            </MenuItem>
            {index < (menus.length - 1) ? (<MenuSeparator />) : <LastMenuSeparator />}
          </View>
        ))}
        <AppVersion>App Version {VersionNumber.appVersion} ({VersionNumber.buildVersion})</AppVersion>
      </Bottom>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.View`
    flex: 1;
    background-color: white;
`;

const BackgroudImage = styled.Image`
    ${Styles.absolute_full}
    width:100%;
    height:100%;
`;

const HeaderContainer = styled.View`
    padding-top: ${Constants.ToolbarHeight}px;
    height: ${Constants.ToolbarHeight + Constants.NavBarHeight}px;
    flex-direction: row;
    align-items: center;
    padding-left: 5px;

    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-bottom-color: #d6d6d6;
    background-color: white;
`;

const ProfileContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex:1;
`;

const UserName = styled(StyledText)`
    font-weight: bold;
    font-size: ${FontSize.Huge}px;
    line-height: ${Sizes.scale(27)}px;
    margin-top: ${Spacing.MD}px;
`;

const Employ = styled(StyledText)`
    font-size: ${FontSize.Medium}px;
    line-height: ${Sizes.scale(17)}px;
`;

const Address = styled(StyledText)`
    font-style: normal;
    color: #757575;
    line-height: ${Sizes.scale(16)}px;
    font-size: ${FontSize.Small}px;
`;

const LunchTimeContainer = styled.View`
    background-color:#f3e322;
    border-radius:${Spacing.MD}px;
    height:${Sizes.scale(27)}px;
    width: 168px;
    margin-top: ${Spacing.XS}px;
    ${Styles.center};
`;

const LunchTime = styled(StyledText)`
    font-weight: bold;
    font-size: ${FontSize.Small}px;
    line-height: ${Sizes.scale(15)}px;
`;

const MenuItem = styled.TouchableOpacity`
    height: 60px;
    width: 100%;
    background-color: black;
    padding-horizontal: ${Spacing.MD}px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const MenuSeparator = styled.View`
    height:2px;
    background-color:white;
    width:100%;
`;

const LastMenuSeparator = styled.View`
    height: ${StyleSheet.hairlineWidth}px;
    border-top-width:${StyleSheet.hairlineWidth}px;
    border-top-color:#ccc;
`;

const MenuText = styled(MainSemiBoldFont)`
    color: white;
    font-size: ${FontSize.Medium}px;
`;

const Bottom = styled.View`
    align-items:center;
    padding-bottom:${Sizes.bottomSafeArea1}px;
`

const AppVersion = styled(StyledText)`
    color: #c9c9c9;
    font-size: ${FontSize.Small}px;
    margin-vertical: ${Spacing.SM}px;
`;
