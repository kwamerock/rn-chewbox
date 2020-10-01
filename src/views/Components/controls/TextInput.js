import React from 'react';
import styled from 'styled-components/native';
import { isArray } from 'lodash';

import { StyledText } from './Text';
import BaseTextInput, { MaskedInput } from './BaseTextInput';
import { themeProp } from '@/utils/CssUtil';


const MyTextInput = ({ title, error, prefix, ...props }) => (
  <Container>
    <Title>{error ? (<ErrorTitle>{error}</ErrorTitle>) : title}</Title>
    <MyTextInputInput prefix={prefix} {...props} />
  </Container>
)

const MyTextInputInput = ({ prefix, style, ...props }) => {
  // Merge style
  if (isArray(style)) {
    style = style.slice(0)
    style.push({ flex: 1 })
  } else if (style) {
    style = [style, { flex: 1 }]
  } else {
    style = { flex: 1 }
  }

  return (
    <InputContainer>
      {prefix ? <Prefix>{prefix}</Prefix> : (null)}
      {(props.type != null && props.options != null) ?
        <MaskedInput {...props} style={style} /> :
        <BaseTextInput {...props} style={style}/>}
    </InputContainer>
  )
}

const InputContainer = styled.View`
  flex-direction:row;
  align-items:center;
`

const Prefix = styled(StyledText)`
  color: ${themeProp('colorTextInputTitle')};
  fontSize: 13px;
  margin-right: 5px;
`

export default MyTextInput;

export const MyTextArea = ({ title, error, description, noBorder, ...props }) => (
  <AreaContainer style={{ borderBottomWidth: noBorder ? 0 : 1 }}>
    <Header>
      <Title>{error ? (<ErrorTitle>{error}</ErrorTitle>) : title}</Title>
      <Description>{description}</Description>
    </Header>
    <CustomTextArea {...props} multiline />
  </AreaContainer>
)

const BaseContainer = styled.View`
  width: 100%;
  border-bottom-width: ${themeProp('szListDivider')};
  border-bottom-color: ${themeProp('colorInputBorder')};
  padding-horizontal: ${themeProp('szPaddingHorizontal')};
  justify-content:center;
`;

const Container = styled(BaseContainer)`
  height: ${themeProp('szInputContainerHeight')};
`;

const AreaContainer = styled(BaseContainer)`
  height: ${themeProp('szInputAreaContainerHeight')};
`;

const Title = styled(StyledText)`
  fontSize: ${themeProp('szTextInputTitle')};
  fontWeight: bold;
  color: ${themeProp('colorTextInputTitle')};
`;

const ErrorTitle = styled.Text`
  color: red;
`

const CustomTextArea = styled(BaseTextInput)`
  height: ${themeProp('szInputAreaHeight')};
`;

const Header = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between
`;

const Description = styled(StyledText)`
  fontSize: ${themeProp('szTextInputTitle')};
  color: ${themeProp('colorTextInputTitle')};
`;