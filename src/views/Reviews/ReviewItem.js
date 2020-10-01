import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';

import { StyledText, ThumbnailView, ThumbnailPlaceholder, ItemSeparator } from '@/views/Components';
import { Spacing, FontSize } from '@/styles/Sizes';
import { Sizes, Styles, Images, Colors } from '@/styles';
import CommentItem from '@/views/Comments/CommentItem';
import { daysAgo } from '@/utils/DateUtil';
import { useOvermind } from '@/store';

export default Component = ({ onReplyPressed, noSubject, ...props }) => {
	//const vm = useViewModel(props);
	const [like, setLike] = useState(props.like);
	const { state } = useOvermind();
	const { currentUser } = state;

	const onLike = async () => {
		setLike(!like);
		const likeId = props.likes.find(o => o.user.id == currentUser.id)?.id;
		const result = await actions.like.like({ userId: currentUser.id, commentId: props.id, likeId });
		props.refresh && props.refresh();
	}

	return (
		<View style={{ flex: 1 }}>
			<Container>
				<RowContainer>
					<ReviewAvatar source={{ uri: props.user?.avatar || "" }} />
					<Fill>
						<ReviewHeader>
							<View>
								{!noSubject && <ReviewTitle>{props.subject || ""}</ReviewTitle>}
								<ReviewAuthor>{props.user?.fullName}</ReviewAuthor>
							</View>
							<ReviewTime>{daysAgo(props.createdAt)}</ReviewTime>
							<Fill />
							{props.rating != null &&
								<Fragment>
									<Feather name='star' size={12} color='#919191' />
									<Rating>{props.rating || 0}</Rating>
								</Fragment>
							}
						</ReviewHeader>
						<ReviewContent>
							{props.message || "No message"}
						</ReviewContent>
						<PhotosView style={{ marginTop: 10 }} photos={(props.images ?? []).map(i => ({ source: { uri: i.url } }))}></PhotosView>
						<CommentsPart>
							<View style={{ flexDirection: 'row' }} >
								{props.topComments.length > 0 && <CommentsCountContainer>
									<CommentsCount>
										{props.topComments.length} Comments
								</CommentsCount>
								</CommentsCountContainer>}
								<HeartIcon onPress={onLike}>
									<Ionicons name={like ? "ios-heart" : "ios-heart-empty"} size={24} color="#F3E422" />
								</HeartIcon>
							</View>
							<TouchableOpacity onPress={onReplyPressed}>
								<LoadMoreText>Reply</LoadMoreText>
							</TouchableOpacity>
						</CommentsPart>
						<FlatList
							data={props.initialized ? props.topComments : props.topComments.slice(0, 5)}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => <CommentItem {...item} />}
						/>
					</Fill>
				</RowContainer>
				<LoadMore>
					{!props.initialized && props.topComments.length > 5 &&
						<TouchableOpacity onPress={props.loadMore}>
							<LoadMoreText>Load More Comments...</LoadMoreText>
						</TouchableOpacity>}
				</LoadMore>
			</Container>
			<ItemSeparator />
		</View >
	)
}

const LoadMore = styled.View`
	align-items: center;
`

const LoadMoreText = styled(StyledText)`
	font-size:11px;
	line-height: 19px;
	font-weight:500;
	text-decoration-line: underline;
`;

const CommentsPart = styled.View`
	margin-top: 8px;
	flex-direction: row;
	justify-content: space-between;
`;

const CommentsCountContainer = styled.View`
	background-color:#f0f0f0;
	border-radius:8px;
	height:24px;
	padding-horizontal: 12px;
	${Styles.center};
`;

const CommentsCount = styled(StyledText)`
	font-weight:500;
	font-size: 11px;
	line-height: 19px;
`

const Fill = styled.View`
	flex: 1
`

const ReviewTitle = styled(StyledText)`
	font-size: 14px;
	font-weight: bold;
`

const ReviewTime = styled(StyledText)`
	margin-top: 2px;
	margin-left: 8px;
	font-size: 12px;
	line-height: 15px;
	color: #6d6d6d;
`

const ReviewAuthor = styled(StyledText)`
	font-size: 12px;
	line-height: 19px;
	font-weight: 600;
`

const Rating = styled(StyledText)`
	font-size: 12px;
	line-height: 15px;
	color: #6d6d6d;
	font-weight: bold;
	margin-left: 5px;
`

const ReviewHeader = styled.View`
	flex-direction: row;
	width: 100%;
`

const ReviewContent = styled(StyledText)`
	margin-top: 6px;
	width: 100%;
	font-size: 12px;
	color: #3f3f3f
`

const ReviewAvatar = styled.Image`
	background-color:#d8d8d8;
	margin-right: 16px;
	width: 30px;
	height: 30px;
	border-radius: 15px;
`;

const CommentAvatar = styled(ThumbnailView)`
	background-color:#d8d8d8;
	width: 30px;
	height: 30px;
`;

const HeartIcon = styled(TouchableOpacity)`
	margin-left: 10px;
`

const Container = styled.View`
	padding-horizontal: ${Spacing.MD}px;
	padding-vertical:${Spacing.MD}px;
	width: 100%;
`;

const RowContainer = styled.View`
	flex-direction:row;
	width: 100%;
`

// Review Photos View definition
const _thumbnailSize = 57;
const PhotosView = ({ photos, style: cstyle }) => {
	if (photos.length == 0) {
		return (null)
	}
	const style = {
		flexDirection: 'row'
	}
	return (
		<PhotosScrollView horizontal contentContainerStyle={style} style={cstyle}>
			{
				photos.map((p, index) => {
					return (
						<Photo key={index} source={p.source} />
					)
				})
			}
		</PhotosScrollView>
	)
}

const PhotosScrollView = styled.ScrollView`
	height: ${_thumbnailSize}px;
	align-self: stretch;
`

const Photo = ({ source }) => {
	return (
		<ReviewImageContainer>
			<ReviewImage resizeMode='cover' source={source} />
		</ReviewImageContainer>
	)
}

const ReviewImageContainer = styled.View`
	width: ${_thumbnailSize}px;
	height: ${_thumbnailSize}px;
	margin-right:10px;
	justify-content:flex-start;
	align-items:flex-end;
`

const ReviewImage = styled.Image`
	position: absolute;
	left:0;
	right:0;
	top:0;
	bottom:0;
`
