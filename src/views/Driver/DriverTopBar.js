import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Constants } from '@/Constants';
import { Colors } from '@/styles/Colors';

const DriverTopBar = () => {
  const navigation = useNavigation()

  const onMenu = () => {
    navigation.toggleDrawer();
  }

  const onTransaction = () => {
    navigation.navigate("Transactions")
  }

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setHidden(false)
  })

  return (
    <Container>
      <LeftButton onPress={onMenu}>
        <Feather name="menu" color="black" size={24} />
      </LeftButton>
      <RightButton onPress={onTransaction}>
        <Feather name="briefcase" color="black" size={24} />
      </RightButton>
    </Container>
  )
}

export default DriverTopBar;

const Container = styled.View`
  padding-top: ${Constants.ToolbarHeight}px;
  flex-direction: row;
  background-color: ${Colors.yellow};
  height: ${50 + Constants.ToolbarHeight}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 5px;
`

const LeftButton = styled.TouchableOpacity`
  padding: 10px;
`

const RightButton = styled(LeftButton)`

`