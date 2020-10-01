import React from 'react';
import styled from 'styled-components';

import { Constants, TabBarStyle } from '@/Constants';
import { Header } from '@/views/Components/MainHeader';

const isTopTabBar = Constants.tabBarStyle === TabBarStyle.top

const TabScreen = (props) => {
  return (
    <Container>
      {!isTopTabBar && <Header {...props} />}
      {props.children}
    </Container>
  )
}

export default TabScreen;

const Container = styled.View`
  flex: 1;
`
