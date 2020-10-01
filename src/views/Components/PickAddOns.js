import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';

import { Spacing } from '@/styles/Sizes';
import { MainBoldFont } from './controls/Text';
import Step from './controls/Step';

export default PickAddOns = ({ style, items, ...props }) => {
	return (
		<SectionView style={props.style}>
			<SectionTitle>CHOOSE ADD-ONS</SectionTitle>
			<AddOnsList
				data={items}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (<AddOnItem item={item} />)}
			/>
		</SectionView>
	)
}

const AddOnsList = styled.FlatList`

`

const SectionView = styled.View`
	align-self:stretch
	background-color:white;
	padding:${Spacing.LG}px;
	margin-bottom:9px;
`

const SectionTitle = styled(MainBoldFont)`
	color: black;
	font-size: 14px;
	margin-bottom: 10px;
`

const AddOnItem = ({ item, ...props }) => {
	const route = useRoute()

	return (
		<ItemContainer>
			<Content>
				<AddonTitle>{item.product.name}</AddonTitle>
				<Price>${item.priceEach.toFixed(2)} each</Price>
			</Content>
			<Step value={item.quantity}
				increase={() => {
					item.increaseQuantity()
					// After this try to call updateOrder
					// const updateOrder = get(route, 'params.triggerUpdateOrder')		// This is from edit order
					// updateOrder && updateOrder()
				}}
				decrease={() => {
					item.decreaseQuantity()
					// After this try to call updateOrder
					// const updateOrder = get(route, 'params.triggerUpdateOrder')		// This is from edit order
					// updateOrder && updateOrder()
				}}
			/>
		</ItemContainer>
	)
}

const ItemContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-vertical:8px;
	justify-content: space-between;
	margin-left:${Spacing.XS}px;
`

const AddonTitle = styled(MainBoldFont)`
	font-size: 13px;
	line-height: 17px;
	color: #808080
`
const Content = styled.View`
	flex:1;
`
const Price = styled(MainBoldFont)`
	font-size: 10px;
	line-height: 12px;
	color: #828282
`
