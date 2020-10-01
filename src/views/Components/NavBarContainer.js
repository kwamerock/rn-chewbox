import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

import { themeProp } from '@/utils/CssUtil';
import { Constants } from '@/Constants';

const NavBarContainer = styled.View`
  padding-top: ${Constants.ToolbarHeight}px;
  height: ${Constants.ToolbarHeight + Constants.NavBarHeight}px;
  flex-direction: row;
  align-items: center;
  background-color: ${themeProp('colorBgNavBar')};
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export default NavBarContainer;
