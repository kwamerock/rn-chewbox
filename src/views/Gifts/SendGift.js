import React, { useState } from 'react';
import { string, object, number, date, array } from 'yup';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { get, isEmpty, assignIn } from 'lodash';

import BaseScreen from '@/views/Components/BaseScreen';
import { MyTextArea, YellowButton, MyTextInput, MyInputButton, MainLightFont, MainRegularFont, MainSemiBoldFont } from '@/views/Components';
import ItemContainer from '@/views/Components/ListItemContainer';
import UserItem from '@/views/Components/multiuserspicker/UserItem';
import UsersPicker from '@/views/Components/multiuserspicker/MultiUsersPicker';
import { useLoadingHud } from '@/hooks/Utils';

const Title = 'Profile';
const tag = 'Profile.ViewModel::';

// Just return the function
const errorMessage = (key, message) => {
  // Return function
  return (params) => {
    return { [key]: message }
  }
}

/*
*
*/
const SendGift = props => {
  const [recipients, setRecipients] = React.useState(prefillRecipients(props));
  const [isUsersPickerOpened, setUserPickerOpened] = useState(false);
  const { state, actions } = useOvermind();
  const { alert, hud, user } = state;
  const [isLoading, setLoading] = useState(false);
  const [points, setPoints] = useState("");
  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { data: balance } = useBalance();
  const schema = object().shape({
    numberOfPoints:
      number()
        .required(errorMessage('numberOfPoints', 'ENTER NUMBER OF CREDITS'))
        .integer(errorMessage('numberOfPoints', 'ENTER NUMBER OF CREDITS CORRECTLY'))
        .positive(errorMessage('numberOfPoints', 'ENTER NUMBER OF CREDITS CORRECTLY'))
        .max(balance, errorMessage('numberOfPoints', 'ENTER NUMBER OF CREDITS CORRECTLY')),
    toUsers: array()
      .required(errorMessage('toUsers', 'SELECT AT ONLY ONE RECIPIENT'))
      .max(1, errorMessage('toUsers', 'SELECT AT ONLY ONE RECIPIENT'))
  })// Use Empty.

  useLoadingHud(isLoading)

  console.log("props.route.params===>", props.route.params)

  function addRecipient(user) {
    if (recipients.find(r => (r.id === user.id))) {
      return
    }
    setRecipients([user, ...recipients])
  }

  function removeRecipient(user) {
    setRecipients(recipients.filter(r => r.id != user.id))
  }

  const onSend = async () => {
    try {
      const variables = {
        fromUserId: user.id,
        toUsers: recipients.map(o => o.id),
        numberOfPoints: isEmpty(points) ? undefined : Number(points),
        comment
      }
      const validated = await schema.validate(variables, { abortEarly: false })

      setLoading(true)
      const { error, result } = await Api.sendPoints(validated)
      setLoading(false)

      if (error == null && result.errors == null) {
        props.navigation.pop()
        if (props.route.params.refetch) {
          props.route.params.refetch()
          GlobalStore.refreshAlert()
        }
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = assignIn({}, ...err.errors)
        setValidationErrors(errors)
      }
    }
  }

  const selectUser = () => {
    props.navigation.navigate("UserSelector", {
      selected: recipients,
      done: (selected) => setRecipients(selected)
    })
  }

  const onChangePoints = (text) => {
    setPoints(text.replace(/\D/g, '').replace(/^0+/, ''))
  }

  console.log("recipients====>", recipients)

  return (
    <BaseScreen modal title="Send Points" onClose={() => props.navigation.pop()}>
      <Content >
        <PointContainer>
          <MyTextInput title="NUMBER OF CREDITS" onChangeText={onChangePoints} error={validationErrors.numberOfPoints} keyboardType='numeric' value={points} style={{ paddingLeft: 10 }} />
          <Points>Balance {balance} points</Points>
          {/*<Dollar>$</Dollar>*/}
        </PointContainer>
        <MyTextArea title="COMMENT" description="50 character limit" onChangeText={setComment} />
        <EditRecipientBtn title="Edit Recipients..." onPress={selectUser}
          value={
            !recipients.length ? 'No users selected' : (recipients.length == 1 ? '1 user selected' : `${recipients.length} users selected`)
          }
          error={validationErrors.toUsers}
        />
        <FlatList
          data={recipients}
          keyExtractor={(item, index) => item.id}
          renderItem={(props) => (<ItemContainer><UserItem {...props} /></ItemContainer>)}
        />
        <Bottom>
          <YellowButton onPress={onSend}>SEND POINTS</YellowButton>
          <NotificationText>Order 2 days in a row. Earn 100 Points.</NotificationText>
        </Bottom>

        <UsersPicker
          isOpen={isUsersPickerOpened}
          selected={recipients}
          addUserHandler={addRecipient}
          removeUserHandler={removeRecipient}
          onClose={() => setUserPickerOpened(false)} />
      </Content>
    </BaseScreen>
  );
};

const EditRecipientBtn = styled(MyInputButton)`
  height: 30px;
`

export default SendGift;

const Content = styled.View`
  flex: 1;
  background-color: white;
`;

const NotificationText = styled(MainRegularFont)`
  font-size: 11px;
  line-height: 13px;
  margin-top: 12px;
  color: #3F3F3F;
`

const Bottom = styled.View`
  alignItems:center;
  padding: 15px;
  padding-bottom:30px;
`

function prefillRecipients(props) {
  const id = get(props, 'route.params.id')
  if (isEmpty(id)) {
    return []
  }
  const foundUser = UsersStore.getUser(id)
  return foundUser ? [foundUser] : []
}

const PointContainer = styled.View`

`

const Points = styled(MainLightFont)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  color: #686868;
  font-size: 12px;
  margin-right: 15px;
`

const Dollar = styled(MainLightFont)`
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #686868;
  font-size: 12px;
  margin-right: 15px;
`
