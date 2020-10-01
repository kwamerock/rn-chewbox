import React, { useState } from 'react';
import { Platform, LayoutAnimation, Alert, Text, KeyboardAvoidingView, Modal } from 'react-native';
import styled from 'styled-components';
//import Modal from 'react-native-modal';

import { MyTextInput, YellowButton, MainMediumFont, MainBoldFont } from '@/views/Components';
import { Colors } from '@/styles';
import { Spacing, FontSize } from '@/styles/Dimension';
import LoadingHud from '@/views/Components/hud';
import { useOvermind } from '@/store';

const tag = 'LoginModal:: ';

const LoginModal = props => {
  const [step, setStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const { state } = useOvermind();
  const width = state.window.width;

  /*
  *
  */
  const hide = () => {
    props.setModalVisible(false);
  };

  /*
  *
  */
  const validNumber = (number) => {
    return number.length == 10;
  };

  /*
  *
  */
  const login = () => {
    const number = mobileNumber.replace(/[^A-Z0-9]/ig, "");

    if (!validNumber(number)) {
      Alert.alert('Please input valid phone number')
      return;
    }
    
    setStep(1);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    props.onLogin && props.onLogin(number);
  };

  /*
  *
  */
  const verify = () => {
    props.onVerify && props.onVerify(verificationCode);
  };

  /*
  *
  */
  const onResend = () => {
    props.onResend && props.onResend();
  };

  /*
  *
  */
  const onChange = () => {
    setStep(0);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  /*
  *
  */
  return (
    <Modal
      visible={props.showModal}
      animationType='slide'
      transparent={true}
    >
      <Space onPress={hide} />
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        <Container>
          <Header>
            <Title>
              LOGIN / REGISTER
            </Title>
          </Header>
          <RowContainer style={{ marginLeft: step === 0 ? 0 : -width }}>
            <FieldsContainer>
              <AuthTextInput
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(999) 999-9999'
                }}
                title="MOBILE NUMBER"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
              />
              <Expander />
              <Bottom>
                <Description>We'll send you a 6-digit verification code.</Description>
                <YellowButton onPress={() => login()}>CONTINUE</YellowButton>
              </Bottom>
            </FieldsContainer>
            <FieldsContainer>
              <AuthTextInput
                title="6-DIGIT VERFICATION CODE"
                keyboardType="number-pad"
                value={verificationCode}
                onChangeText={verificationCode => setVerificationCode(verificationCode)}
              />
              <Bottom>
                <Description>CODE SENT TO {mobileNumber}</Description>
                <LinkTextContainer>
                  <Link onPress={() => onResend()}>Resend Code</Link>
                  {' | '}
                  <Link onPress={() => onChange()}>Change Number</Link>
                </LinkTextContainer>
                <YellowButton onPress={() => verify()}>CONTINUE</YellowButton>
              </Bottom>
            </FieldsContainer>
          </RowContainer>
        </Container>
      </KeyboardAvoidingView>
      <LoadingHud />
    </Modal>
  )
}

export default LoginModal;

const Container = styled.View`
  backgroundColor: white;
  width:100%;
`

const FieldsContainer = styled.View`
  flex:1;
`

const Space = styled.TouchableOpacity`
  flex:1;
  backgroundColor: transparent;
`

const Header = styled.View`
  height: 56px;
  backgroundColor: ${Colors.darkBack};
  paddingHorizontal: ${Spacing.SM}px;
  justifyContent: center;
`

const Title = styled(MainBoldFont)`
  fontSize: ${FontSize.Medium}px;
  color: ${Colors.black};
  fontWeight: bold;
`

const Bottom = styled.View`
  padding: ${Spacing.MD}px;
  margin-bottom: 10px;
`

const Description = styled(MainMediumFont)`
  color: ${Colors.lightText};
  fontSize: ${FontSize.Small}px;
  textAlign: center;
  marginBottom: ${Spacing.SM}px;
`

const Link = styled.Text`
  color: ${Colors.linkText};
  fontSize: ${FontSize.Small}px;
  textAlign: center;
  marginBottom: ${Spacing.SM}px;
  textDecorationLine: underline;
`

const RowContainer = styled.View`
  flexDirection: row;
  width:200%;
`
const Expander = styled.View`
  flex: 1;
`

const AuthTextInput = styled(MyTextInput)`
  text-align:center;
  font-family: Montserrat-Bold;
`

const LinkTextContainer = styled(MainMediumFont)`
  margin-bottom:10px;
  text-align:center;
`
