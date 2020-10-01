import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { get } from 'lodash';

import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Styles, Images, Colors } from '@/styles';
import { TextButton, MainBoldFont, MainRegularFont, MainLightFont, MainSemiBoldFont } from '@/views/Components';
import PickIngredients from '@/views/Kitchens/PickIngredients';

const FoodItem = ({ item, onRemove }) => {
	return (
		<Container>
			<Food>
				<Header>
					<FoodTitle numberOfLines={1} ellipsizeMode="tail" >{item.product.name?.toUpperCase()}</FoodTitle>
					<UnderlineButton onPress={onRemove}><Title>REMOVE</Title></UnderlineButton>
				</Header>
				<Description>{item.product.description}</Description>
			</Food>
			{get(item, "ingredients.length", 0) > 0 && <PickIngredients item={item} />}
		</Container>
	)
}

export default FoodItem

const Container = styled.View`
	background-color:white;
	width: 100%;
`

const Food = styled.View`
	padding:${Spacing.LG}px;
	padding-bottom:20px;
`

const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const FoodTitle = styled(MainSemiBoldFont)`
	font-size: 18px;
	width: 75%
`

const Description = styled(MainRegularFont)`
	font-size: 13px;
	font-weight: 300;
	line-height: 21px;
	color:#373737;
	margin-top: ${Spacing.SM}px;
`

const UnderlineButton = styled(TouchableOpacity)`
	padding-horizontal: 10px;
	padding-vertical: 8px;
	border-radius: 10px;
	background-color: #F5F5F5;
`

const Title = styled(MainSemiBoldFont)`
	color: ${Colors.blue};
	font-weight:600;
	font-size:${Sizes.scale(11)}px;
	text-decoration-line: underline;
`
