import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import { UserAvatar, StyledText, BaseTextInput, TextButton, CloseButton, BlackButton, BottomContainer, ItemContainer, ItemSeparator } from '@/views/Components';
import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Styles, Images, Colors } from '@/styles';
import { useSearch, useDelay } from '@/hooks/Utils';
import UserItem from '@/views/Components/multiuserspicker/UserItem';
import { useOvermind } from '@/store';

const UserRemoveButton = (props) => {
  return (
    <UserRemoveButtonContainer {...props}>
      <Feather name='x' color='black' size={15} />
    </UserRemoveButtonContainer>
  )
}

const UserRemoveButtonContainer = styled.TouchableOpacity`
  ${Styles.absolute_top}
  border-radius: 8px;
  width: 16px;
  height: 16px;
  background-color:white;
  ${Styles.center}
`
export default UserSelector = (props) => {
  const { state } = useOvermind();
  const { window, user } = state;
  const theme = props.theme || useTheme();
  const [search, setSearch] = useState('');
  const users = UsersStore.filtered
  const [recipients, setRecipients] = useState([...props.route.params.selected])
  const added = props.route.params.added || [];
  const isCreate = props.route.params.isCreate;

  const delayedSearch = useDelay(() => {
    UsersStore.filterUsers(search)
  })

  function addRecipient(user) {
    if (recipients.find(r => (r.id === user.id))) return
    setRecipients([user, ...recipients])
  }

  function removeRecipient(user) {
    setRecipients(recipients.filter(r => r.id != user.id))
  }

  const filteredUsers = React.useMemo(() => {
    const currentUser = users.splice(users.findIndex(u => u.id === user.id), 1)[0]
    users.unshift(currentUser);
    return (users || []).filter(u => {
      if (added.length > 0) {
        return recipients.findIndex(other => u.id === other.id) < 0 && added.findIndex(a => u.id === a.id) < 0;
      } else if (isCreate) {
        return recipients.findIndex(other => u.id === other.id) < 0;
      } else {
        return recipients.findIndex(other => u.id === other.id) < 0;
      }
    })
  }, [recipients, users])

  function onPressClear() {
    onChangeText('');
  }

  function onChangeText(text) {
    setSearch(text);
    delayedSearch()
  }

  const onClose = () => {
    props.navigation.pop();
    props.route.params && props.route.params.done && props.route.params.done(recipients)
  }

  return (
    <KeyboardAvoiding behavior="padding" enabled={window.isiOS} >
      <Container>
        <InputContainer>
          <FilterInput placeholder='Search users...' placeholderTextColor={theme.colorTextInputTitle} value={search} onChangeText={onChangeText} />
          <ClearButton onPress={onPressClear}>CLEAR</ClearButton>
          <CloseButton onPress={onClose} />
        </InputContainer>
        <ScrollViewContainer>
          {!isEmpty(recipients) ?
            (<UsersScrollView horizontal>
              <SelectedUsers>
                {
                  recipients.map(user => (
                    <SelectedUser key={user.id}>
                      <UserAvatar avatar={user.avatar} fullName={defaultTo(user.fullName, `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`)} />
                      <UserRemoveButton onPress={() => removeRecipient(user)} />
                    </SelectedUser>
                  ))
                }
              </SelectedUsers>
            </UsersScrollView>)
            :
            (<NoItemsText>No users selected</NoItemsText>)
          }
        </ScrollViewContainer>
        <ItemSeparator />
        <UsersList
          data={filteredUsers}
          keyExtrator={(item, index) => item.id}
          renderItem={(props) => (<ItemContainer onPress={() => addRecipient(props.item)}>
            {<UserItem
              {...props}
              isEvent={isCreate}
              onPress={(item) => addRecipient(item)}
            />}
          </ItemContainer>)}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={UsersListFooter}
        />
        <BottomContainer>
          <SaveButton onPress={onClose}>SAVE</SaveButton>
        </BottomContainer>
      </Container>
    </KeyboardAvoiding>
  );
};

const KeyboardAvoiding = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const MyModal = styled(Modal)`

`

const Container = styled.View`
  background-color:white;
  flex: 1;
`;

const height = '70px'

const NoItemsText = styled(StyledText)`
  color: #d8d8d8
  padding-horizontal: ${Spacing.LG}px;
`

const ScrollViewContainer = styled.View`
  width:100%;
  height: ${height};
  justify-content:center;
`

const UsersScrollView = styled.ScrollView`
  width: 100%;
  height: ${height};
`

const SelectedUsers = styled.View`
  padding-horizontal: ${Spacing.MD}px;
  height: ${height};
  flex-direction: row;
  align-items: center;
`;


const UsersList = styled.FlatList`
  flex: 1;
`


const SelectedUser = styled.View`
  padding-horizontal: ${Spacing.XS}px;
  ${Styles.center}
`

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

const SaveButton = styled(BlackButton)`

`

const UsersListFooter = styled.View`
  height: 90px;
`
