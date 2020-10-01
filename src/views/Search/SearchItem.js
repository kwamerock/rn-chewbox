import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';

import { MainBoldFont, MainLightFont } from '@/views/Components';
import { Constants } from '@/Constants';

function getUrl(props) {
  let result = ""
  switch (props.type) {
    case "food":
    case "kitchens":
      result = (props.images && props.images.length > 0) ? props.images[0].url : "";
      break;
    case "people":
      result = props.avatar;
      break;
    case "orders":
      result = (props.items && props.items.length > 0 && props.items[0].product.images && props.items[0].product.images.length > 0) ? props.items[0].product.images[0].url : ""
      break;
  }
  if (props.type == "orders") console.log(props.items[0].product)
  return (result || "");
}

function convert(type, item) {
  switch (type) {
    case "food":
      return ({
        image: (item.images && item.images.length > 0) ? item.images[0].url : "",
        name: item.name,
        description: item.description,
        sub_title: item.site.name,
        rating: item.rating ? item.rating.toFixed(1) : '--',
      })
    case "kitchens":
      return ({
        image: (item.images && item.images.length > 0) ? item.images[0].url : "",
        name: item.name,
        description: item.description,
        sub_title: item.tags.join("-"),
        rating: item.rating ? item.rating.toFixed(1) : '--',
      })
    case "people":
      return ({
        image: item.avatar,
        name: item.fullName,
        description: item.bio,
        sub_title: item.site?.name || ""
      })
    case "orders":
      return ({
        image: (item.items && item.items.length > 0 && item.items[0].product.images && item.items[0].product.images.length > 0) ? item.items[0].product.images[0].url : "",
        name: moment(item.deliverBy).format("ddd, MMM, DD, YYYY"),
        description: (item.items && item.items.length > 0) ? item.items[0].product.description : "",
        sub_title: item.items.length + " Items",
        price: item.total ? item.total.toFixed(2) : '--'
      })
  }
  return ({ image: "" })
}

export const SearchItem = (props) => (
  <ItemContainer onPress={props.onPress}>
    <Thumbnail source={{ uri: (props.image || "") }} />
    <Body>
      <BodyTop>
        <BodyLeft>
          <ItemName>{props.name}</ItemName>
          <Info>{props.sub_title}</Info>
        </BodyLeft>
        {props.rating != null && <RatingText>
          <Feather name="star" size={12} color="#6C6C6C" />
          {' ' + props.rating}
        </RatingText>}
        {props.price != null && <RatingText>${props.price}</RatingText>}
      </BodyTop>
      <Description numberOfLines={3} ellipsizeMode='tail'>{props.description}</Description>
    </Body>
  </ItemContainer>
)

export const ResultSection = (props) => {
  const { state, actions } = useOvermind();
  const { hud } = state;
  const navigation = useNavigation();

  const goProductDetail = async (id) => {
    actions.hud.show()
    const { error, result } = await actions.product.getProduct({ productId: id });
    actions.hud.hide();

    console.log("====>get product", error, result)
    if (error == null && result.errors == null) {
      navigation.pop();
      navigation.navigate("FoodDetail", { data: result.data.product })
    }
  }

  const onSelect = (type, item) => {
    switch (type) {
      case "food":
        goProductDetail(item.id);
        break;
      case "kitchens":
        navigation.pop();
        navigation.navigate("KitchenDetail", { data: { id: item.id } })
        break;
      case "people":
        navigation.navigate("SendGift", { id: item.id })
        break;
      case "orders":
        navigation.navigate("OrderSummaryPost", { data: item })
        break;
    }
  }

  return (
    <ResultContainer>
      <SectionTitle>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</SectionTitle>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={props.data}
        horizontal
        renderItem={({ item }) => <SearchItem {...convert(props.title, item)} onPress={() => onSelect(props.title, item)} />}
        ItemSeparatorComponent={ItemSeparator} />
    </ResultContainer>
  )
}
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  background-color: #f3f3f3;
  width: 300px;
  height: 141px;
`

const ItemSeparator = styled.View`
  width: 5px;
`

const Thumbnail = styled.Image`
  background-color: #D8D8D8;
  height: 40px;
  width: 40px;
  border-radius: 20px;
`

const Body = styled.View`
  margin-left: 10px;
  flex:1;
`
const BodyTop = styled.View`
  flex-direction: row;
`
const BodyLeft = styled.View`
  flex:1;
`

const ItemName = styled(MainBoldFont)`
  font-size: 14px;
  color: black;
  line-height: 19px;
`

const Info = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 19px;
  color: #6B6B6B;
`

const RatingText = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 15px;
  color: #6C6C6C;
`

const Description = styled(MainLightFont)`
  font-size: 12px;
  line-height: 19px;
  color: #3F3F3F;
  margin-top: 5px;
`

const ResultContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ECECEC;
  padding-horizontal: 10px;
  padding-bottom: 5px;
`

const SectionTitle = styled(MainBoldFont)`
  font-size: 18px;
  color: black;
  margin-top: 15px;
  margin:9px;
`
