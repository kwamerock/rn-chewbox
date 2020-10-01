import React, { useState } from 'react';
import styled from 'styled-components/native';
import { string, object } from 'yup';
import { assignIn } from 'lodash';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { YellowButton, MyTextInput, MyTextArea, BaseScreen, BottomContainer } from '@/views/Components';
import { useOvermind } from '@/store';

// Just return the function
const errorMessage = (key, message) => {
  // Return function
  return (params) => {
    return { [key]: message }
  }
}

const schema = object().shape({
  subject: string().required(errorMessage('subject', 'ENTER SUBJECT')),
  message: string().required(errorMessage('message', 'ENTER MESSAGE')),
})

const Help = props => {
  const { state, actions } = useOvermind();
  const { alert, hud, user } = state;

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const onSendRequest = async () => {
    try {
      const variables = { userId: user.id, subject, message }
      const validated = await schema.validate(variables, { abortEarly: false })

      hud.show()
      const { error, result } = await Api.requestSupport(validated)
      hud.hide()

      if (error == null && result.errors == null) {
        alert.showSuccess('Someone will be in touch with you ASAP. Thanks!', 'Chewbox')
        props.navigation.pop()
      }

    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = assignIn({}, ...err.errors)
        setErrors(errors)
      }
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
      <BaseScreen title="HELP" onClose={() => props.navigation.pop()}>
        <Content >
          <MyTextInput title="NAME" value={user.fullName} editable={false} />
          <MyTextInput title="SUBJECT" value={subject} onChangeText={setSubject} error={errors.subject} />
          <MyTextArea title="MESSAGE" value={message} onChangeText={setMessage} error={errors.message} />

          <BottomContainer>
            <YellowButton onPress={onSendRequest}>SEND</YellowButton>
          </BottomContainer>
        </Content>
      </BaseScreen>
    </KeyboardAvoidingView>
  );
};

export default Help;

const Content = styled.View`
  flex: 1;
`;

const Decription = styled.Text`
  fontSize: 12px;
  fontWeight: bold;
  color: rgb(200,200,200);
`

const Bottom = styled.View`
  alignItems:center;
  padding: 15px;
`

const Avatar = styled.View`
  width: 140px;
  height : 140px;
  borderRadius: 70px;
  margin: 15px;
  backgroundColor: grey;
`

const ButtonText = styled.Text`
  color: black;
  fontSize: 16px;
  fontWeight: bold;
`
