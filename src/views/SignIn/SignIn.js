import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { getVersion } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';

import { Styles } from '@/styles';
import { Images } from '@/styles/Images';
import { YellowButton } from '@/views/Components';
import { useLoadingHud } from '@/hooks/Utils';
import LoginModal from '@/views/Modals/LoginModal';
import { useOvermind } from '@/store';

const tag = 'SignIn:: ';

const SignIn = props => {
  const { state, actions } = useOvermind();
  const { window, alert, hud, isLoggedIn } = state;

  const [modalVisible, setModalVisible] = useState(false);

  const userDataRef = useRef(null);
  const numberRef = useRef('');
  const backgroundImageRef = useRef(new Animated.Value(0.7));

  console.log('SIGNIN RERENDER');

  /*
  *
  */
  const _go2Next = async () => {
    setModalVisible(false);

    if (await actions.isProfileUnset()) navigation.navigate('Profile');
    else navigation.navigate('Main');
  }

  /*
  * auto-login
  */
  if (isLoggedIn) {
    _go2Next();
  }

  /*
  * spring animation
  */
  const createAnimationImage = (value, easing, delay = 0) => {
    return Animated.spring(value, {
      toValue: 1,
      friction: 0.1,
      easing,
      delay,
      useNativeDriver: true,
    });
  }

  // useEffect without any dependencies is the same as componentDidMount
  useEffect(() => {
    // only start animation in case of user is invalid.
    
    if (state.isLoggedIn) {
      backgroundImageRef.current.setValue(1);

    } else {
      backgroundImageRef.current.setValue(0.8);
      Animated.sequence([
        createAnimationImage(backgroundImageRef.current, Easing.ease)
      ]).start()
    }
  }, []);

  const navigation = useNavigation();

  /*
  *
  */
  const onStart = () => {
    setModalVisible(true);
  };

  /*
  *
  */
  const _createAppUser = async (generateToken) => {
    const mobileNumber = numberRef.current;
    
    try {
      const data = await actions.createAppUser({mobileNumber, generateToken});
      
      console.log('Verification Code: ', data.verificationCode);
      userDataRef.current = data.user;

    } catch(exception) {
      actions.alert.showError('Request to send verification code failed', 'SignIn')
      console.log(tag, 'onLogin() - ', exception)
    }
  }

  /*
  *
  */
  const onLogin = mobileNumber => {
    numberRef.current = mobileNumber;
    _createAppUser(true);
  };

  /*
  *
  */
  const onVerify = async code => {
    actions.hud.show();

    try {
      const user = userDataRef.current;
      const { token } = await actions.verifySmsCode({
        userId: user.id,
        verifyCode: code,
        mobileNumber: numberRef.current
      });
      
      console.log(tag, 'onVerify() - got token', token, user);

      await actions.loginWithToken({token, userId: user.id, version: getVersion()});
      
      _go2Next(); // Move to next screen

    } catch(error) {
      actions.alert.showError('Failed to verify the sms code', 'SignIn');
      console.log(tag, 'onVerify() - ', error);
    }
  };

  /*
  *
  */
  const onResend = () => {
    _createAppUser(!userDataRef.current); // Only generate token when failed.
  };

  const scale = backgroundImageRef.current;
    
  /*
  *
  */
  return (
    <Container>
      <Background>
        {/* {useObserver(() => ( */}
          <BackgroundImage width={window.width} height={window.height} source={Images.background.sign} />
        {/* ))} */}
        <LogoImage as={Animated.Image} width={200} height={170} resizeMode='cover' source={Images.logo.chewbox} style={{ transform: [{ scale }] }} />
        <LogoTitle source={Images.logo.chewbox_title} />
      </Background>
      <SignInButton>
        <YellowButton onPress={onStart}>LOGIN</YellowButton>
      </SignInButton>
      <LoginModal showModal={modalVisible} setModalVisible={setModalVisible} onLogin={onLogin} onVerify={onVerify} onResend={onResend} />
    </Container>
  );
};

export default SignIn;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 30px;
`;

const Background = styled.View`
  ${Styles.absolute_full}
  align-items: center;
  justify-content: flex-start;
`;

const BackgroundImage = styled(Animated.Image)`
  ${Styles.background_image}
`;

const LogoImage = styled.Image`
  margin-top: 120px;
  width: 200px;
  height: 170px;
`;

const LogoTitle = styled.Image`
  margin-top: 0px;
`;

const SignInButton = styled.View`
  margin-bottom: 0px;
  padding-horizontal: 36px;
  width: 100%;
`;

const LoginBox = styled(Animated.View)`
  ${Styles.absolute_top}
  justify-content: flex-end;
  align-items: center;
`;
