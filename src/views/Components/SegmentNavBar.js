import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { iconButtonComponentFactory } from './controls/FeatherIconButton';
import NavBarContainer from './NavBarContainer';

// To use at toplevel is very important.
const LeftButton = iconButtonComponentFactory('menu');
const RightButton = iconButtonComponentFactory('dollar-sign');

const tabStyle = (tabIndex, index) => ({
  borderColor: index === tabIndex ? 'black' : '#ccc'
});

const SegmentNavBar = ({ tabIndex, onSelect, onRight, onLeft, titles }) => {
  const theme = useTheme();
  return (
    <NavBarContainer>
      <LeftButton onPress={onLeft} />
      <TitleContainer>
        {titles.map((title, index) => (
          <TabItem
            key={index}
            onPress={() => onSelect(index)}
            style={tabStyle(tabIndex, index)}
          >
            <Feather name={title} size={theme.szIconButton} color={theme.colorControl} />
          </TabItem>
        ))}
      </TitleContainer>
      <RightButton onPress={onRight} />
    </NavBarContainer>
  );
};

export default SegmentNavBar;

const TabItem = styled.TouchableOpacity`
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-width: 1px;
  border-radius: 3px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;
