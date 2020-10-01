import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';

import { ItemSeparator } from '@/views/Components/ListItemContainer';
import { StyledText, Container, NormalNavBar, MyTextInput, YellowButton, BlackButton } from '@/views/Components';
import { Spacing, FontSize } from '@/styles/Dimension';
import { Sizes, Styles, Images, Colors } from '@/styles';
import ItemPickerModal from './ItemPickerModal';

export default Component = ({ items, fnFilter, isOpen, onItemPick, onClose, searchPlaceholder }) => {
  function filterSchools(schools, keyword) {
    let filtered = defaultTo(schools, []);
    if (isEmpty(keyword)) {
      return filtered;
    }
    keyword = keyword.toLowerCase();
    filtered = filtered.filter(item => {
      return [item.name, item.address2, item.address, item.city, item.state, item.country]
        .filter(item => !isEmpty(item))
        .find(elem => elem.toLowerCase().includes(keyword))
    });
    return filtered;
  }
  return (
    <ItemPickerModal
      items={items}
      isOpen={isOpen}
      onItemPick={onItemPick}
      onClose={onClose}
      searchPlaceholder={searchPlaceholder}
      ItemRenderComponent={SchoolItem}
      itemKeyProvider={({ item, index }) => item.id}
      useRemoteSearch={false}
      fnFilter={fnFilter || filterSchools}
    />
  )
}

const SchoolItem = ({ item }) => {
  const address = [item.address2, item.address, item.city, item.state, item.country].filter(item => !isEmpty(item)).join(' ');
  return (
    <SchoolItemContainer>
      <SchoolItemTitle>{item.name}</SchoolItemTitle>
      <SchoolItemAddress>{address}</SchoolItemAddress>
    </SchoolItemContainer>
  );
}

const SchoolItemContainer = styled.View`
  flex: 1;
`;

const SchoolItemTitle = styled(StyledText)`
  fontSize: ${ FontSize.Medium}px;
  color: ${Colors.darkText};
`;

const SchoolItemAddress = styled(StyledText)`
  fontSize: ${ FontSize.Small}px;
  color: ${Colors.lightText};
`;
