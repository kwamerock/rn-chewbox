import React, { useState, useEffect } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { YellowButton, StyledText, MyTextInput, BaseScreen, MyInputButton, GradientView, Avatar } from '@/views/Components';
import { FontSize } from '@/styles/Dimension';
import { Colors, Images } from '@/styles';
import SitePickerModal from '@/views/Modals/SitePickerModal';
import { Screens } from '@/Constants';
import { useOvermind } from '@/store';
import { useImagePicker, useLoadingHud } from '@/hooks/Utils';

const Profile = (props) => {
  const { state, actions } = useOvermind();
  const { currentUser } = state;
  const isUnset = actions.isProfileUnset();
  const navigation = useNavigation();

  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState(currentUser.title);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [isDatePickerVisible, setVisiblePicker] = useState(false);
  const [lunchtime, setLunchtime] = useState(currentUser.lunchtime);
  const [employer, setEmployer] = useState(currentUser.site || {name:'', id:''});
  const avatar = useImagePicker(!isEmpty(currentUser.avatar) ? {uri: currentUser.avatar} : Images.icons.Avatar);

  /*
  *
  */
  const updateProfile = () => {
    const variables = {
      userId: currentUser.id,
      email,
      firstName,
      lastName,
      lunchtime,
      siteName: employer.name
    };

    if (!lunchtime) delete variables.lunchtime;

    const saveUser = async (variables) => {
      const result = await actions.user.saveUser(variables);
      if(result) goHome();
      else actions.alert.showError('Failed to update user', Title);
    }
  }

  /*
  *
  */
  const onTimePicked = (time) => {
    setLunchtime(time)
    setVisiblePicker(false)
  }

  /*
  *
  */
  function onSchoolPicked(item){
    console.log('Profile.ViewModel:: onSchoolPicked() - ', item)
    setEmployer(item);
  }

  /*
  *
  */
  function goHome(){
    navigation.navigate('Main')
  }

  /*
  *
  */
  const selectSite = () => {    
    if (!isNil(lunchtime)) { // Check if address is selected.
      navigation.navigate("SiteSelector", {
        onSelect: (site) => onSchoolPicked(site)
      })
    } else {
      navigation.navigate(Screens.googlePlaceSelector, {
        onSelect: (site) => onSchoolPicked(site)
      })
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === "ios"}>
      <BaseScreen
        title={isUnset ? "REGISTRATION" : "PROFILE"}
        onClose={isUnset ? undefined : goHome}>
        <Content >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <MyTextInput title="FIRST NAME" value={firstName} onChangeText={setFirstName} error={state.errors.firstName} />
            <MyTextInput title="LAST NAME" value={lastName} onChangeText={setLastName} error={state.errors.lastName} />
            <MyTextInput title="EMAIL ADDRESS" value={email} onChangeText={setEmail} autoCorrect={false} keyboardType='email-address' autoCapitalize='none' error={state.errors.email} />
            <MyInputButton title="DELIVERY SITE" value={employer.name} onPress={selectSite} error={state.errors.site} />
            {/*<MyTextInput title="TITLE" value={title} onChangeText={setTitle} error={state.errors.title} />*/}
            {lunchtime && <MyInputButton
              title="LUNCH TIME"
              value={lunchtime ? moment(lunchtime).format("hh:mm A") : ""}
              onPress={() => setVisiblePicker(true)}
              error={state.errors.lunchtime}
            />}

            <Bottom>
              <Decription>TAP TO SET YOUR AVATAR</Decription>
              <AvatarContainer as={TouchableOpacity} onPress={avatar.pick} >
                <Avatar source={avatar.source} />
              </AvatarContainer>
            </Bottom>
          </ScrollView>
        </Content>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={onTimePicked}
          onCancel={() => setVisiblePicker(false)}
        />
        <GradientBottom
          topColor={"#FFFFFF00"}
          middleColor={"#FFFFFFFF"}
          bottomColor={"#FFFFFFFF"}
        >
          <YellowButton onPress={updateProfile}>{isUnset ? "REGISTER" : "SAVE"}</YellowButton>
        </GradientBottom>
      </BaseScreen>
    </KeyboardAvoidingView>
  );
}

export default Profile;

const Content = styled.View`
  flex: 1;
`;

const Decription = styled.Text`
  fontSize: 12px;
  fontWeight: bold;
  color: rgb(200,200,200);
`

const Bottom = styled.View`
  align-items:center;
  padding: 15px;
  justify-content: center;
  margin-bottom: 20px;
  flex: 1;
`

const AvatarContainer = styled(Avatar)`
  margin: 15px;
  backgroundColor: grey;
`

const ButtonText = styled.Text`
  color: black;
  fontSize: 16px;
  fontWeight: bold;
`

const RowContainer = styled.View`
  flex: 1;
  flexDirection: row;
`;


const GradientBottom = styled(GradientView)`
  width: 100%;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`
