import React from 'react'
import styled from 'styled-components/native';

import { StyledText } from './Text';
import BaseTextInput, { MaskedInput } from './BaseTextInput';
import { themeProp } from '@/utils/CssUtil';

const MyInputButton = ({ title, error, value, onPress, ...props }) => (
  <Container disabled={onPress == null} onPress={onPress}>
    <Title>{error ? (<ErrorTitle>{error}</ErrorTitle>) : title}</Title>
    <Value>{value}</Value>
  </Container>
)

export default MyInputButton;

export const BaseContainer = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: ${themeProp('szListDivider')};
  border-bottom-color: ${themeProp('colorInputBorder')};
  padding-horizontal: ${themeProp('szPaddingHorizontal')};
  justify-content:center;
`;

const Container = styled(BaseContainer)`
  height: ${themeProp('szInputContainerHeight')};
`;

export const Title = styled(StyledText)`
  fontSize: ${themeProp('szTextInputTitle')};
  fontWeight: bold;
  color: ${themeProp('colorTextInputTitle')};
`;

const ErrorTitle = styled.Text`
  color: red;
`

const Value = styled(StyledText)`
  ${themeProp('szInputHeight')};
  paddingVertical: 5px;
`
