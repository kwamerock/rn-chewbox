import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { take, defaultTo } from 'lodash';

import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Colors } from '@/styles';
import { MainBoldFont, UserAvatar } from '@/views/Components';

const maxUsers = 4
const avatarSize = Sizes.avatarSmall
const evenBgColor = '#d8d8d8'
const oddBgColor = '#b7b7b7'

function fullName(user) {
  return defaultTo(user.fullName, `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`)
}

export default Component = ({ users, width, style }) => {
  const _users = take(users, maxUsers);
  const margin = (width - avatarSize) / (maxUsers - 1);

  const renderExtra = () => {
    if (users.length <= maxUsers) {
      return (null);
    }
    const moreStyle = {
      width: avatarSize,
      height: avatarSize, left: margin * (maxUsers - 1),
      borderRadius: avatarSize / 2, alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(203, 203, 203, 0.9)'
    }
    return (
      <View style={moreStyle}>
        <MoreUsers>+{users.length - maxUsers}</MoreUsers>
      </View>
    )
  }

  let start = 0;
  // calculate right of each users.
  return (
    <Container style={{ width: width, ...style }}>
      {_users.map((u, index) => {
        const avatarStyle = {
          left: start,
          backgroundColor: (index % 2) ? oddBgColor : evenBgColor
        }
        start += margin;
        return (
          <Avatar style={avatarStyle} key={u.id} fullName={fullName(u)} avatar={u.avatar} />
        )
      })}
      {renderExtra()}
    </Container>
  )
}

const Container = styled.View`
	align-self: flex-start;
	flex-direction: row;
	height: 47px;
`

const Avatar = styled(UserAvatar)`
	position: absolute;
`

const MoreUsers = styled(MainBoldFont)`
	font-size: 14px;
`
