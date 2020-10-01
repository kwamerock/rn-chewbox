import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
	StyledText, Container, NormalNavBar, MyTextInput, YellowButton, BlackButton, TextButton, MainBoldFont,
	MainRegularFont, MainLightFont, MainSemiBoldFont, MainMediumFont, PickAddOns, BottomContainer, DatePicker
} from '@/views/Components';
import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Styles, Images, Colors } from '@/styles';
import FoodItem from '@/views/Orders/FoodItem';
import TipSelector from '@/views/Cart/TipSelector';
import OrderSummary from '@/views/Orders/OrderSummaryYellowBox';
import { getAddressMultiline } from '@/utils/MiscUtil';
import CartSummary from '@/views/Cart/CartSummary';
import useViewModel from './EditOrder.ViewModel';
import { useOvermind } from '@/store';

const EditOrder = (props) => {
	const { order, foods, addOns, ...vm } = useViewModel(props);
	const isEvent = !isEmpty(get(order, "event.id"));
	const { state, actions } = useOvermind();
	const { hud, user } = state;
	const isSetLunchTime = user.lunchtime !== null;
	const isNotShow = !isEvent && !isSetLunchTime;
	const isEditOrder = props.route.params.isEditOrder;

	return (
		<Screen>
			<PickDateHeader>
				<UnderLine />
				<PickHeaderTitle>CHOOSE DATE</PickHeaderTitle>
				<UpdateOrderContainer>
					<UpdateOrderText>{vm.isUpdatingOrder ? 'Updating...' : (vm.isUpdateFailed ? (<StyledText style={{ color: 'red' }}>Failed to update</StyledText>) : '')}</UpdateOrderText>
				</UpdateOrderContainer>
				<MonthYear>{moment(order.deliverBy).format("MMM YYYY")}</MonthYear>
			</PickDateHeader>
			{!isEvent && <DatePicker onChange={vm.onChangeDate} value={order.deliverBy} />}
			<KeyboardAvoiding style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
				<ContentScrollView>
					<SectionView>
						<SectionTitle>DELIVER TO</SectionTitle>
						<DeliverToContainer>
							<DeliverToLeft>
								<Deliver>
									{order.deliverTo?.name !== order.deliverTo?.address && <DeliverSite numberOfLines={2}>{order.deliverTo.name}</DeliverSite>}
									<DeliverLocation>{getAddressMultiline(order.deliverTo)}</DeliverLocation>
								</Deliver>
								{!isEvent && <UnderlineButton onPress={vm.pickSite}>
									<Title>
										CHANGE
									</Title>
								</UnderlineButton>}
							</DeliverToLeft>
							<DeliverToRight>
								<DeliverTime>{isEvent ? moment(order.deliverBy).format('h:mmA') : (isSetLunchTime) ? moment(order.deliverBy).format('h:mmA') : "11AM-1PM"}</DeliverTime>
								{!isEvent && isSetLunchTime && <UnderlineButton onPress={() => vm.showDatePicker()}><Title>
									CHANGE
								</Title></UnderlineButton>}
							</DeliverToRight>
						</DeliverToContainer>
					</SectionView>
					<FoodSeparator />
					<Foods>
						<FlatList
							data={order.foods}
							keyExtractor={(item, index) => index}
							renderItem={
								({ item, index }) => (<FoodItem item={item} onRemove={() => vm.onRemoveFood(item, index)} />)
							}
							ItemSeparatorComponent={FoodSeparator}
						/>
						<AddMoreButton>
							<UnderlineButton onPress={() => vm.onAddItem(isEditOrder)}><Title>
								ADD ANOTHER MEAL
							</Title></UnderlineButton>
						</AddMoreButton>
					</Foods>
					<FoodSeparator />
					<PickAddOns items={order.addOns} />
					<FoodSeparator />
					<Bottom style={{ paddingBottom: 100 }}>
						<CartSummary
							{...order}
							onChangeTip={vm.onChangeTip}
						/>
					</Bottom>
				</ContentScrollView>
			</KeyboardAvoiding>

			<DateTimePickerModal
				isVisible={vm.isDatePickerVisible}
				onConfirm={vm.onPickTime}
				onCancel={vm.hideDatePicker}
				mode='time'
				date={order.deliverBy}
			/>
			<BottomContainer>
				<EditMealPlanButton onPress={vm.saveOrder}>UPDATE MEAL</EditMealPlanButton>
			</BottomContainer>
		</Screen>
	)
}

export default EditOrder;

const FoodSeparator = styled.View`
	align-self:stretch;
	height:9px;
	background-color:${Colors.bgSemiWhite};
`

const KeyboardAvoiding = styled.KeyboardAvoidingView`

`

const Screen = styled(Container)`
	background-color:white;
`

const ContentScrollView = styled.ScrollView`
	width: 100%;
`

const UpdateOrderContainer = styled.View`
	justify-content:center;
	align-items:center;
	flex: 1;
`

const UpdateOrderText = styled(MainRegularFont)`
	color: #7E7E7E;
	font-size: 12px;
`

const SectionView = styled.View`
	align-self:stretch;
	background-color:white;
	padding:${Spacing.LG}px;
`

const PickDateHeader = styled.View`
    height: 40px;
    background-color: #EDEDED;
    flex-direction: row;
    align-items: center;
`
const UnderLine = styled.View`
    height: 100%;
    border-bottom-width:2px;
    border-bottom-color: #6A6A6A;
    width:15px;
`

const PickHeaderTitle = styled(MainBoldFont)`
    font-size:14px;
    line-height:17px;
    color: black;
`

const MonthYear = styled(MainBoldFont)`
    color: #7E7E7E;
    font-size: 10px;
    line-height:12px;
    margin-right:15px;
`

const Foods = styled.View`
	width: 100%;
	background-color:white;
	margin-bottom: 9px;
`

const AddMoreButton = styled.View`
	width: 100%;
	align-items:center;
	padding-bottom: ${Spacing.MD}px;
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

const SectionTitle = styled(MainSemiBoldFont)`
	font-size: ${FontSize.Medium}px;
	margin-bottom: ${Spacing.SM}px;
`

const DeliverToContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`

const DeliverToLeft = styled.View`
	align-items: center;
`

const DeliverToRight = styled.View`
	justify-content: space-between;
	margin-left:10px;
	align-items: center;
`

const Deliver = styled.View`
	align-self: stretch
	align-items: flex-start
	justify-content: flex-start;
	margin-bottom:13px;
	width: 210px
`

const DeliverSite = styled(MainBoldFont)`
	color: #686868;
	font-size:14px;
	line-height: 17px;
`

const DeliverLocation = styled(MainRegularFont)`
	color: #686868;
	font-size:12px;
	line-height: 15px;
`

const DeliverTime = styled(MainSemiBoldFont)`
	color: #686868;
	font-size: 24px;
`

const Bottom = styled.View`
	background-color:white;
	padding-bottom:40px;
`

const TipBox = styled(TipSelector)`
	padding-horizontal:5px;
	margin-bottom: 33px;
`

const EditMealPlanButton = styled(BlackButton)`
	margin-top: 14px;
`
