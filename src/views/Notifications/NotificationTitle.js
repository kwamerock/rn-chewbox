import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import { Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useOvermind } from '@/store';

const NotificationTitle = (props) => {
  const navigation = useNavigation();
  const { state, actions } = useOvermind();
  const { alert, hud } = state;

  const goProductDetail = async (id) => {
    hud.show()
    const { error, result } = await actions.product.getProduct({ productId: id });
    hud.hide();

    console.log("====>get product", error, result)
    if (error == null && result.errors == null) {
      navigation.navigate("FoodDetail", { data: result.data.product })
    }
  }

  const link = (item) => {
    switch (item.view) {
      case "sendGift":
        navigation.navigate("SendGift", { id: item.id })
        break;
      case "createEvent":
        navigation.navigate("CreateEvent", { id: item.id })
        break;
      case "kitchenList":
        navigation.navigate("Kitchens", { event: item })
          break;
      case "kitchenDetail":
        navigation.navigate("KitchenDetail", { data: { id: item.id } })
        break;
      case "productDetail":
        goProductDetail(item.id);
        break;
    }
  }

  return (
    <Text style={[{ textAlign: 'center' }, props.style]}>
      {props.title != null && props.title.map((item, index) => (
        <Fragment key={index}>
          {item.text && <props.Text key={index}>{item.text} </props.Text>}
          {item.link && <props.Link
            onPress={props.disabled ? undefined : () => link(item.link)}
            key={index}>
            {item.link.text}
          </props.Link>}
        </Fragment>
      ))}
      <DaysAgo>{" " + props.daysAgo ? props.daysAgo : ''}</DaysAgo>
    </Text>
  )
}

export default NotificationTitle;

const DaysAgo = styled.Text`
  font-size: 12px;
  color: #6D6D6D;
  font-weight: 600;
`
