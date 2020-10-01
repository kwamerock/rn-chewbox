import React, { useState } from 'react';
import { View, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { get, dropWhile } from 'lodash';

import { MyTextInput, YellowButton, MyInputButton, NormalNavBar, Container, MyTextArea, BaseContainer as InputBaseContainer, Title as InputTitle } from '@/views/Components';
import ItemContainer from '@/views/Components/ListItemContainer';
import BaseScreen from '@/views/Components/BaseScreen';
import { BottomContainer } from '@/views/Components/BottomContainer';
import UserItem from '@/views/Components/multiuserspicker/UserItem';
import UsersPicker from '@/views/Components/multiuserspicker/MultiUsersPicker';
import RadioOptions from '@/views/Components/RadioOptions';
import { Spacing, FontSize } from '@/styles/Dimension';
import SitePickerModal from '@/views/Modals/SitePickerModal';
import { formatDeliveryDate } from '@/utils/DateUtil';
import { useOvermind } from '@/store';
import { useSitePicker } from '@/hooks/Utils';

const CreateEvent = props => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const { state, actions } = useOvermind();
  const { currentUser } = state;
  currentDate.setDate(currentDate.getDate() + 3);

  const [name, setEventName] = useState('');
	const [description, setDescription] = useState('')
	const [deliveryDate, setDeliveryDate] = useState();
	const [site, setSite] = useState();
	const [payment, setPayment] = useState();
	const [maxSpend, _setMaxSpend] = useState();
	const [isDatePickerVisible, setDatePickerVisible] = useState(false);
	const [attendies, setAttendies] = useState([])
	const [errors, setErrors] = useState({})
	const [isOrder, setOrder] = useState(false);
	const _pickSite = useSitePicker()
  const paymentSettingItems = PaymentSetting.all.map(i => i.title)
  const [paymentSettingIndex, setPaymentSettingIndex] = useState(1)	// Selected second option for defaults
  
  /*
  *
  */
  const sortAttendies = () => {
    const index = attendies.findIndex(a => a.id === currentUser.id);
    if (index >= 0) {
      const cutOut = attendies.splice(index, 1)[0];
      attendies.unshift(cutOut);
      return attendies;
    } else {
      return attendies;
    }
  }

  /*
  *
  */
  function onPickDate(date) {
		console.log("============================", date);
		setDeliveryDate(date);
		setDatePickerVisible(false);
	}

  /*
  *
  */
	function addAttend(user) {
		if (attendies.find(r => (r.id === user.id))) return;		
		setAttendies([user, ...attendies])
	}

  /*
  *
  */
	function removeAttend(user) {
		setAttendies(attendies.filter(r => r.id != user.id))
	}

  /*
  *
  */
	function onClose() {
		navigation.pop();
	}

  /*
  *
  */
	function selectUsers(isCreate) {
		navigation.navigate("UserSelector", {
			selected: attendies,
			isCreate,
			done: (selected) => setAttendies(selected)
		})
	}

  /*
  *
  */
	function setMaxSpend(value) {
		_setMaxSpend(value)
  }
  
  /*
  *
  */
  async function createEvent(include) {
		setOrder(include);
    const result = await actions.event.saveEvent();
    
    navigation.pop();
    
		if (attendies.find(o => o.id == currentUser.id) != null) {
			navigation.navigate("Kitchens", { event: { ...data, creator: { id: currentUser.id } } })
		}
	}

  return (
    <BaseScreen modal title="New Event" onClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30}>
        <Content>
          <ScrollView>
            <MyTextInput title="EVENT NAME" onChangeText={setEventName} value={eventName} error={errors.name} />
            <MyInputButton title="DELIVERY DATE" onPress={() => setDatePickerVisible(true)} value={formatDeliveryDate(deliveryDate)} error={errors.deliveryDate} />
            <MyInputButton title="DELIVERY LOCATION" onPress={pickSite} value={get(site, 'name', '')} error={errors.site} />
            <InputBaseContainer as={View} style={{ paddingTop: 10 }}>
              <InputTitle>PAYMENT SETTINGS</InputTitle>
              <PaymentSetting items={paymentSettingItems} selected={paymentSettingIndex} onChange={setPaymentSettingIndex} />
            </InputBaseContainer>
            {paymentSettingIndex == 0 && <MyTextInput title="MAX SPEND PER ATTENDEE" prefix='$' keyboardType='numeric' value={maxSpend} onChangeText={setMaxSpend} error={errors.maxSpend} />}
            <MyInputButton title="EDIT ATTENDEES" onPress={() => selectUsers(true)}
              value={!attendies.length ? 'No users selected' : (attendies.length == 1 ? '1 user selected' : `${attendies.length} users selected`)}
              error={errors.attendies}
            />
            <FlatList
              data={sortAttendies()}
              keyExtractor={(item, index) => item.id}
              renderItem={(props) => (<ItemContainer><UserItem {...props} /></ItemContainer>)}
            />
            <BottomBorder />
            <MyTextArea title="DESCRIPTION" value={description} onChangeText={setDescription} error={errors.description} />
            <Padding />
          </ScrollView>
          <BottomContainer>
            <PublishButton onPress={() => createEvent(attendies.findIndex(a => a.id === currentUser.id) >= 0)}>PUBLISH EVENT</PublishButton>
          </BottomContainer>
        </Content>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={currentDate}
        onConfirm={() => onPickDate}
        onCancel={() => setDatePickerVisible(false)}
        mode='datetime'
      />
    </BaseScreen>
  );
};

export default CreateEvent;

const PublishButton = styled(YellowButton)`
`;

const Padding = styled.View`
  height: 100px;
`

const BottomBorder = styled.View`
  border-bottom-width: 0.3px;
  width: 100%;
  border-bottom-color: lightgrey;
  margin-bottom: 1px;
`

const Content = styled.View`
  flex: 1;
  background-color:white;
`;

const Bottom = styled.View`
  alignItems:center;
  padding-bottom: ${Spacing.XL}px;
  padding-horizontal: ${Spacing.XL}px;
`
const PaymentSetting = styled(RadioOptions)`
	padding-horizontal: ${Spacing.SM}px;
	align-items: flex-start;
	padding-vertical: ${Spacing.XS}px;
`
