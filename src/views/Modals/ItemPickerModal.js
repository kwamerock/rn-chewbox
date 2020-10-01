import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Modal from 'react-native-modal';

import { useSearch } from '@/hooks/Utils';
import { Spacing, FontSize } from '@/styles/Dimension';
import { Sizes, Colors, Styles } from '@/styles';
import { themeProp } from '@/utils/CssUtil';
import { BaseTextInput, TextButton, FeatherIconButton, CloseButton, ItemContainer, ItemSeparator } from '@/views/Components';
import { useOvermind } from '@/store';

const ItemPickerModal = ({
  items,
  ItemRenderComponent,
  isOpen,
  fnFilter,
  onItemPick,
  onClose,
  itemKeyProvider,
  searchPlaceholder,
  useRemoteSearch,
  ...props
}) => {

  const { window } = state;
  const theme = props.theme || useTheme();
  const [isVisible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredItems, onFilterChange] = useSearch(items, fnFilter);

  function onPressClear() {
    onChangeText('');
  }

  function onChangeText(text) {
    setSearch(text);
    onFilterChange(text);
  }

  return (
    <Modal isVisible={isOpen}>
      <KeyboardAvoiding behavior="padding" enabled={window.isiOS} >
        <Container>
          <InputContainer>
            <FilterInput placeholder={searchPlaceholder} placeholderTextColor={theme.colorTextInputTitle} value={search} onChangeText={text => onChangeText(text)} />
            <ClearButton onPress={onPressClear}>CLEAR</ClearButton>
            <CloseButton onPress={onClose} />
          </InputContainer>
          <FlatList
            data={useRemoteSearch ? items : filteredItems}
            keyExtrator={itemKeyProvider || ((item, index) => index)}
            renderItem={(props) => (<ItemContainer onPress={() => onItemPick(props)}>{<ItemRenderComponent {...props} />}</ItemContainer>)}
            ItemSeparatorComponent={ItemSeparator}
          />
        </Container>
      </KeyboardAvoiding>
    </Modal>
  );
};

ItemPickerModal.defaultProps = {
  useRemoteSearch: true
}

const KeyboardAvoiding = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Container = styled.View`
  border-radius: ${Sizes.scale(10)}px;
  margin-vertical: ${Spacing.MD}px;
  background-color:white;
  flex: 1;
`;

const InputContainer = styled.View`
  ${Styles.start_center}
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #bbb;
  flex-direction: row;
  height: ${Sizes.scale(60)}px;
  padding-left:${Spacing.LG}px;
  padding-right:${Spacing.XS}px;
`;

const FilterInput = styled(BaseTextInput)`
  font-size: ${FontSize.Large}px;
  flex: 1;
`;

const ClearButton = styled(TextButton)`
  font-size: ${FontSize.Small}px;
  color: ${Colors.darkText};
`;

const ItemsList = styled(FlatList)`
  flex: 1;
`;

export default ItemPickerModal;
