import React, { useState } from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import { BaseTextInput, MainBoldFont, SectionsListHeader } from '@/views/Components';
import { Images, Colors } from '@/styles';
import { Spacing } from '@/styles/Dimension';

function getFirstImage(images) {
  if (images == null || images.length == 0) return Images.background.FoodPlaceHolder;
  return ({ uri: images[0].url })
}

function getAvatar(avatar) {
  if (avatar == null || avatar == "") return Images.icons.Avatar;
  return ({ uri: avatar })
}

export const KitchenItem = props => {
  const [like, setLike] = useState(props.like);

  const onLike = () => {
    setLike(!like);
    props.onLike();
  }

  return (
    <KitchenItemContainer onPress={props.onPress}>
      <ThumbnailContainer>
        <Thumbnail source={getFirstImage(props.images)} />
      </ThumbnailContainer>
      <Bottom>
        <SmallAvatar source={getAvatar(props.avatar)} />
        <Content>
          <KitchenName>{props.name}</KitchenName>
          <Description>
            <Feather name="star" size={12} color={Colors.greyText} />
            <View style={{ width: 5, height: 1 }} />
            {" " + props.rating ? props.rating + " • " : '--  • '}
            {props.tags ? props.tags.join(" • ") : ""}
          </Description>
        </Content>
        <LikeButton onPress={onLike}>
          <Ionicons name={like ? "ios-heart" : "ios-heart-empty"} size={24} color="#F3E422" />
        </LikeButton>
      </Bottom>
    </KitchenItemContainer>
  )
};

export const KitchenHeader = SectionsListHeader;

export const KitchenDetailHeader = (props) => {
  return (
    <Header>
      <KitchenDetailHeaderContainer>
        <KitchenName>{props.name || ''}</KitchenName>
        {props.rating != null && <Description>
          <Feather name="star" size={12} color={Colors.greyText} />
          <View style={{ width: 5, height: 1 }} />
          {" " + props.rating ? props.rating + " • " : "--" + " • "}
          {props.tags ? props.tags.join(" • ") : " "}
        </Description>}
      </KitchenDetailHeaderContainer>
      {props.hideSearch != true && <SearchButton onPress={props.onSearch}>
        <Feather name="search" size={24} color={'black'} />
      </SearchButton>}
    </Header>
  )
}

const KitchenDetailHeaderContainer = styled.View`
  margin-left:${Spacing.MD}px;
  flex: 1;
`

/**
 * Customizable SearchHeader
 * @param {[Boolean]} useStateValue [set this true to update the input value from the state]
 * @param {[String]} value          [Value to be updated]
 * @param {[Object]} style          Style to be applied to container
 * @param {[Function]}
 * @param {[Component]} props    [description]
 */
export const SearchHeader = ({ useStateValue, value, style, onChange }) => {
  const valueProp = useStateValue ? { value } : {};
  return (
    <SearchHeaderContainer style={style}>
      <InputContainer>
        <Feather name="search" size={20} color="grey" />
        <SearchTextInput
          placeholder="Search"
          onChangeText={onChange}
          {...valueProp}
        />
        <Feather name="mic" size={20} color="grey" />
      </InputContainer>
    </SearchHeaderContainer>
  );
};

const KitchenName = styled(MainBoldFont)`
  color: black;
  font-size: 18px;
  line-height: 22px;
`;

const Description = styled(MainBoldFont)`
  font-size: 12px;
  color: ${Colors.greyText}
  line-height: 15px;
`

const Thumbnail = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  background-color: rgb(220, 220, 220);
`;

const SmallAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgb(220, 220, 220);
`;

const Bottom = styled.View`
  flex-direction: row;
  background-color: white;
  align-items: center;
  height: 60px;
`

const Header = styled.View`
  flex-direction: row;
  background-color: rgb(238,238,238);
  align-items: center;
  height: 60px;
`

const Content = styled.View`
  margin-left: 5px;
  flex: 1;
`

const KitchenItemContainer = styled.TouchableOpacity`

`

const BackButton = styled.TouchableOpacity`
  padding:5px;
`

const SearchButton = styled.TouchableOpacity`
  padding:10px;
`

const ThumbnailContainer = styled.View`
`

const SearchHeaderContainer = styled.View`
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-horizontal: 30px;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: rgb(240, 240, 240);
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`;

const SearchTextInput = styled(BaseTextInput)`
  flex: 1;
  margin-horizontal: 10px;
`;

const LikeButton = styled.TouchableOpacity`
  padding: 5px;
`