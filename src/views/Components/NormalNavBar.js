import React from 'react';
import styled from 'styled-components/native';

import { Constants } from '@/Constants';
import NavBarContainer from './NavBarContainer';
import { StyledText } from './controls/Text';
import { CloseButton } from './controls/FeatherIconButton';
import { themeProp } from '@/utils/CssUtil';

const NormalNavBar = ({ title, onClose, modal }) => (
  <NavBarContainer style={modal ? { paddingTop: 0, height: Constants.NavBarHeight } : undefined}>
    {!modal && onClose != null && <CloseButton onPress={onClose} name="chevron-left" />}
    <Title>{title}</Title>
    {onClose != null && <CloseButton onPress={onClose} disabled={!modal} />}
  </NavBarContainer>
);

export default NormalNavBar;

const Title = styled(StyledText)`
  font-size: ${themeProp('szTextNavBar')};
  font-weight: ${themeProp('fontWeightNavBar')};
`;

const LeftButton = styled.TouchableOpacity`
  padding: 5px;
`