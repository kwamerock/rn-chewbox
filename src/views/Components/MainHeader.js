import React from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

import NavBarContainer from '@/views/Components/NavBarContainer';
import NavBarFilter from '@/views/Components/NavBarFilter';

export const Header = (props) => {
  return (
    <NavBarContainer>
      <LeftMenu onPress={() => props.navigation.toggleDrawer()}>
        <Feather name="menu" size={24} color='#000' />
      </LeftMenu>
      <NavBarFilter title='TITLE' filter='FILTER'/>
      <RightMenu>
        <Feather name="search" size={24} color='#000' />
      </RightMenu>
    </NavBarContainer>
  )
}

const LeftMenu = styled.TouchableOpacity`
  margin-right: 30px;
`

const RightMenu = styled.TouchableOpacity`
  margin-left: 30px;
`

const Body = styled.View`
  flex: 1;
  height: 36px;
  border-radius: 18px;
  background-color: rgb(230,230,230)
`
