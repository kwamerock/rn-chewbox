
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';

import { StyledText, ItemSeparator, ThumbnailView } from '@/views/Components';
import { Spacing, FontSize } from '@/styles/Sizes';
import { Styles, Images, Colors, Sizes } from '@/styles';
import { daysAgo } from '@/utils/DateUtil';

export default Component = (props) => {
	return (
		<RowContainer>
			<Avatar source={{ uri: props.user?.avatar || "" }} />
			<Fill>
				<Header>
					<Author>{props.user?.fullName || ""}</Author>
					<Time>{daysAgo(props.createdAt)}</Time>
				</Header>
				<Content>
					{props.message}
				</Content>
			</Fill>
		</RowContainer>
	)
}

const Fill = styled.View`
	flex: 1
`

const Time = styled(StyledText)`
	margin-left: 8px;
	font-size: 12px;
	color: #6d6d6d;
`

const Author = styled(StyledText)`
	font-size: 12px;
	font-weight: 600;
`

const Header = styled.View`
	flex-direction: row;
	width: 100%;
`

const Content = styled(StyledText)`
	margin-top: 6px;
	width: 100%;
	font-size: 12px;
	color: #3f3f3f
`

const Avatar = styled.Image`
	background-color:#d8d8d8;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	margin-right: 10px;
`;


const RowContainer = styled.View`
	flex-direction:row;
	width: 100%;
	margin-vertical: 12px;
`
