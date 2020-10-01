import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { StyledText } from './Text';
import { Sizes, Colors } from '@/styles';
import { themeProp } from '@/utils/CssUtil';

function textButtonFactory(ContainerComp, TextComp) {
  return props => (
    <ContainerComp {...props} activeOpacity={0.8}>
      <TextComp style={props.textStyle}>{props.children}</TextComp>
    </ContainerComp>
  );
}

const BaseButtonContainer = styled.TouchableOpacity`
  height: ${themeProp('szButton')};
  border-radius: 8px;
  align-items: center;
  justify-content:center;
  width:100%;
`;

// Default YellowButton
const YellowBtnContainer = styled(BaseButtonContainer)`
  border-radius: 8px;  
  shadow-color: #000;  
  shadow-opacity: 0.15;
  background-color: ${Colors.yellow}; 
  shadow-radius: ${Sizes.scale(5)}px;
  shadow-offset: 0px ${Sizes.scale(5)}px;
  elevation: 4;
`;

const RedBtnContainer = styled(YellowBtnContainer)`
  background-color: #B70000;
`

const YellowBtnTitle = styled(StyledText)`
  font-weight: bold;
  font-size: 14px;
`;

const YellowButton = textButtonFactory(YellowBtnContainer, YellowBtnTitle);

// Blue button for Balance
const BlueButton = textButtonFactory(
  styled(BaseButtonContainer)`
    background-color: ${Colors.btnBlue};
  `,
  styled(StyledText)`
    color: white;
    font-size: 16px;
  `
);

const TextButton = ({ onPress, children, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={style}>{children}</Text>
  </TouchableOpacity>
);

export const BlackButtonContainer = styled(YellowBtnContainer)`
  background-color: #000;
`;

export const BlackBtnTitle = styled(YellowBtnTitle)`
  color:white;
`;

const BlackButton = textButtonFactory(BlackButtonContainer, BlackBtnTitle);

//export default StyledButton;
export { BaseButtonContainer, YellowButton, BlueButton, TextButton, YellowBtnContainer, BlackButton, RedBtnContainer };
