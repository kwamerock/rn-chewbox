import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { KitchenDetailHeader } from '@/views/Kitchens/KitchenItem';
import { useLoadingHud, useNavContext } from '@/hooks/Utils';
import Category from '@/views/Components/Category';
import { ContextNames, ParamKeys } from '@/Constants';
import { useOvermind } from '@/store';

const KitchenDetail = props => {
  const { data, context: ctx } = props.route.params;
  const { state } = useOvermind();
  const kitchen = state.site.sites[data.id];

  useEffect(() => {
    console.log("====>kitchen detail", kitchen);
  }, []);

  // Check if this is from edit order, if so, just let select the food
  const context = useNavContext();

  console.log('KitchenDetail::render() - ', context);

  const navigation = useNavigation();

  useLoadingHud(state.site.isLoading);

  let products = {};

  (kitchen.products || []).filter(o => !o.isAddOn && (o.isActive !== false)).map(o => {
    o.categories.map(c => {
      if (products[c] == null) {
        products[c] = [o];
      } else {
        products[c].push(o)
      }
    })
  })

  function onPressFood(food) {
    console.log('KitchenDetail::render():onPressFood() - ', food, props);

    // Determine the logic according to context
    if (context[ParamKeys.contextName] === ContextNames.editOrder2AddOrViewFood) {
      // If this is in edit order add or view food context
      // build cart item and pass as....
      const cartItem = CartItem.create({ product: food })
      const params = {
        [ParamKeys.cartItem]: cartItem,
        [ParamKeys.context]: ctx,
        id: props.route.params?.id,
      }

      navigation.navigate({
        name: 'FoodDetail', params
      });

    } else {
      navigation.navigate("FoodDetail", {
        data: food,
        id: props.route.params?.id,
        addOns: state.product.addOns,
        context: ctx
      })
    }
  }

  const isEventCart = () => {
    return props.route.params?.id != null
  }

  return (
    <Container>
      <KitchenDetailHeader
        {...kitchen}
        onSearch={() => props.navigation.navigate("Search")}
        hideSearch={isEventCart()}
      />
      <Content >
        <FlatList
          refreshing={state.site.isLoading}
          data={Object.keys(products)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <Category
              name={item}
              foods={products[item]}
              onPress={onPressFood}
            />}
          extraData={products}
          ItemSeparatorComponent={ItemSeparator}
        />
      </Content>
    </Container>
  );
};

export default KitchenDetail;

const Container = styled.View`
	flex: 1
`

const Content = styled.View`
	flex: 1;
	background-color: white;
`;

const ItemSeparator = styled.View`
	width: 100%;
	height: 1px;
	background-color: #eee;
`
