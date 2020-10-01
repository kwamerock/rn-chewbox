import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { get } from 'lodash';

import { StyledText, MainRegularFont, MainSemiBoldFont } from '@/views/Components';
import { ThumbnailView } from '@/views/Components/controls/ImageViews';
import { daysAgoShort } from '@/utils/DateUtil';
import { useOvermind } from '@/store';
import NotificationTitle from './NotificationTitle';

export default Component = ({ currentUser, item: alert, onPress }) => {
  const avatar = get(alert, 'contentUser.avatar', '') || "";
  const time = alert?.createdAt ? daysAgoShort(alert.createdAt) : '';

  const renderRight = () => {
    const { event, product, order, type, secondaryUser } = alert
    let uri = "";
    switch (type) {
      case "BASIC":
        break;
      case "REVIEW":
        uri = product && product.images && product.images.length > 0 ? product.images[0].url : "";
        break;
      case "MEAL_PLAN":
        const images = (order?.items?.find(o => !o.isAddOn)?.product.images) || []
        uri = images.length > 0 ? images[0].url : ""
        break;
      case "NEW_EVENT":
        uri = (event && event.invitees && event.invitees.length > 0 ? event.invitees[0].avatar : "")
        break;
      case "RIDDLE":
        break;
      case "POINT":
        uri = secondaryUser?.avatar || ""
        break;
      case "INVITED_YOU":
        uri = currentUser.avatar
        break;
    }

    uri = uri || ""

    if (type == "POINT" || type == "INVITED_YOU" || type == "NEW_EVENT") {
      return <RoundAvatar source={{ uri }} />
    }
    if (type == "REVIEW" || type == "MEAL_PLAN") {
      return <RectAvatar source={{ uri }} />
    }
    return null;
  }

  const getStyle = () => {
    if (alert.user?.id == currentUser.id) {
      return ({
        backgroundColor: '#F8F8F8',
        borderLeftColor: '#C4C4C4'
      })
    }
    return undefined
  }

  return (
    <ItemContainer onPress={onPress}>
      <Thumbnail source={{ uri: avatar }} />
      <Body>
        {/* <Title numberOfLines={2}>{title}<Time>{time}</Time></Title> */}
        <NotificationTitle
          disabled={true}
          Link={Link}
          Text={Normal}
          title={alert.sentence}
          daysAgo={time}
          style={{ textAlign: 'left' }}
        />
      </Body>
      {renderRight()}
    </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
	height: 70px;
	flex-direction: row;
	align-items: center;
	padding-horizontal: 20px;
	background-color: white;
	border-left-width: 3px;
	border-left-color: white;
`

const Title = styled(StyledText)`
  color: black;
  font-size: 12px;
	line-height: 20px;
	width: 100%
`;

const Thumbnail = styled(ThumbnailView)`
	background-color: #c4c4c4;
  marginRight: 10px;
`

const Body = styled.View`
  flex: 1
`

const Link = styled(MainSemiBoldFont)`
	color: black;
	font-size: 12px;
`

const Normal = styled(MainRegularFont)`
	color: black;
	font-size: 12px;
`

const RectAvatar = styled.Image`
	width: 40px;
	height: 40px;
	background-color:#C4C4C4;
`

const RoundAvatar = styled(RectAvatar)`
	border-radius: 20px;
`
