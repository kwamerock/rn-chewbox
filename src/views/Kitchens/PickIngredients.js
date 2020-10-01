import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import numeral from 'numeral';
import Feather from 'react-native-vector-icons/Feather';

import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Styles, Images, Colors } from '@/styles';
import { MainBoldFont, MainRegularFont, MainLightFont, Step } from '@/views/Components';


// This works with Cart Item.
const PickIngredients = ({ item: cartItem }) => {
  return (
    <Container>
      <SectionTitle>CHOOSE INGREDIENTS</SectionTitle>
      <FlatList
        data={cartItem.ingredients}
        keyExtractor={(item, index) => `${cartItem.id}` + item.item.id + `${index}`}
        renderItem={({ item: { item, selected } }) =>
          <IngredientItem item={item} selected={selected}
            onPress={() => cartItem.toggleIngredient(item)}
          />
        }
      />
    </Container>
  )
}

export default PickIngredients


const Container = styled.View`
    background-color:white;
    padding:${Spacing.LG}px;
    padding-top: 0px;
	width: 100%;
`

const SectionTitle = styled(MainBoldFont)`
    color: black;
    font-size: 14px;
    margin-bottom: 10px;
`

const IngredientItem = ({ item, selected, onPress }) => (
  <ItemContainer onPress={onPress}>
    <ItemTitle style={{ color: selected ? "black" : Colors.greyText }}>
      {item.inventoryProduct ? item.inventoryProduct.ingredient.name : "Invalid"}
    </ItemTitle>
    <CheckBox style={{ backgroundColor: selected ? "black" : "#E2E2E2" }} onPress={onPress}>
      <Feather name="check" size={20} color={selected ? "white" : "#E2E2E2"} />
    </CheckBox>
  </ItemContainer>
)

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-vertical:8px;
    justify-content: space-between;
    margin-left: ${Spacing.XS}px;
`

const ItemTitle = styled(MainRegularFont)`
    font-size: 13px;
`

const CheckBox = styled.View`
    width: 20px;
    height: 20px;
    border-radius:5px;
    justify-content: center;
    align-items: center;
`
