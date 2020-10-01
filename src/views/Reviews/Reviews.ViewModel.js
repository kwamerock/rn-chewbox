import React, { useState, useEffect, useCallback, useMemo , useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';
import { useOvermind } from '@/store';

export default viewModel = (props) => {
	const navigation = useNavigation()
	const route = useRoute();
	const { state, actions } = useOvermind();
	const user = state.currentUser;
	const clearCommentRef = useRef()

	// const {data:reviews, refetch, loading} = useGetComments(props.id)

	console.log(route.params)
	// const reviews = [1, 2, 3]

	const [isCommentModalOpen, setCommentModalOpen] = useState(false)

	function submitComment(){

	}

	function onClose(){
		navigation.pop()
	}

	return {
		onClose,
		reviews,
		loading,

		isCommentModalOpen,
		showCommentModal: () => {
			clearCommentRef.current && clearCommentRef.current()
			setCommentModalOpen(true)
		},
		hideCommentModal: () => setCommentModalOpen(false),

		submitComment,
		clearCommentRef,
		title: props.title
	}
}
