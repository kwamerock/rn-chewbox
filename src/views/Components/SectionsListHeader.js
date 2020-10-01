import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { defaultTo } from 'lodash';

import { themeProp as theme } from '@/utils/CssUtil';
import { StyledText } from './controls/Text';

const HeaderContainer = styled.View`
  height: ${theme('szSectionHeader')};
  background-color: ${theme('colorBgSectionHeader')};
  padding-horizontal: ${theme('szPaddingHorizontal')};
  justify-content: center;
  border-bottom-color: ${theme('colorListDivider')};
  border-bottom-width: ${theme('szListDivider')};
`;

const HeaderTitle = styled(StyledText)`
  font-size: ${theme('szTextSectionHeader')};
  color: ${theme('colorTextSectionHeader')};
`;

/**
 * function for creating section header component
 * @param  {[type]} containerComponent [Header container component, pass null or undefined to use default]
 * @param  {[type]} titleComponent     [Title container component, pass null or undefined to use default]
 * @return {[type]}                    [SectionHeaderComponent]
 */
function sectionHeaderComponentFactory(containerComponent, titleComponent) {
  const Container = defaultTo(containerComponent, HeaderContainer);
  const Title = defaultTo(titleComponent, HeaderTitle);
  return ({ title, ...otherProps }) => {
    return (
      <Container {...otherProps} >
        <Title>{title}</Title>
      </Container>
    )
  }
}

const SectionHeader = sectionHeaderComponentFactory();

export default SectionHeader;

// Also export HeaderContainer & Header Title
export { sectionHeaderComponentFactory, HeaderContainer as ListHeaderContainer, HeaderTitle as ListHeaderTitle };
