import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';
import StarRating from 'react-native-star-rating';
import Feather from 'react-native-vector-icons/Feather';

import { StyledText, MyTextInput, BlackButton, MyTextArea } from '@/views/Components';
import { Sizes, Styles } from '@/styles';
import { Spacing } from '@/styles/Sizes';
import { themeProp } from '@/utils/CssUtil';
import { useImagePicker } from '@/hooks/Utils';
import { useOvermind } from '@/store';

export default Component = ({ isOpen, onClose, title, ...props }) => {
  const [comment, setComment] = useState('');
  const [subject, setSubject] = useState('');
  const [starCount, setStartCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const { state } = useOvermind();
  const { alert } = state;

  const { pick: pickImage } = useImagePicker(undefined, ({ result }) => {
    if (isNil(result)) {
      return
    }
    const { source, mimeType, base64 } = result

    // Update photos
    setPhotos([...photos, { source, mimeType, base64 }])
  }, { useFrontCamera: false })

  function onRemove(photo) {
    const index = photos.indexOf(photo)
    const copied = photos.slice(0)
    if (index >= 0) {
      copied.splice(index, 1)
    }
    setPhotos(copied)
  }

  function onWriteComment() {
    props.onSubmit(comment, subject, starCount, photos);
    setComment("")
  }

  function onCameraPressed() {
    if (photos.size >= 5) {
      alert.showWarning('You can add up to 5 photos', 'Comment')
      return
    }
    pickImage()
  }

  // useEffect(() => {
  // 	fnClearProvide(() => {
  // 		setComment('')
  // 	})
  // }, [fnClearProvide])

  return (
    <MyModal
      isVisible={isOpen}
      onBackdropPress={onClose}
    >
      <KeyboardAvoiding behavior="padding" enabled={Platform.OS === 'ios'}>
        <Container>
          <Header>
            <HeaderTitle>{title}</HeaderTitle>
          </Header>
          {props.showSubject === true && <MyTextInput title="TITLE" value={subject} onChangeText={setSubject} />}
          <MyTextArea title='COMMENT' description='50 character limit' value={comment} onChangeText={setComment} />
          {props.showRating === true && <StarContainer>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              selectedStar={setStartCount}
              starSize={20}
              starStyle={{ margin: 5 }}
              halfStarEnabled
            />

            <PhotosSection>
              <CameraButton onPress={onCameraPressed}>
                <Feather name="camera" size={20} color="#636363" />
              </CameraButton>
              <PhotosView photos={photos} onRemove={onRemove} />
            </PhotosSection>

          </StarContainer>}

          <Bottom>
            <SubmitButton onPress={onWriteComment}>Submit</SubmitButton>
          </Bottom>

        </Container>
      </KeyboardAvoiding>
    </MyModal>
  )
}

const MyModal = styled(Modal)`
	margin-horizontal:0px;
	justify-content: flex-end;
`

const Space = styled.TouchableOpacity`
	flex: 1
`
const KeyboardAvoiding = styled.KeyboardAvoidingView`

`
const Container = styled.View`
	width: 100%;
	background-color:white;
	border-top-left-radius: ${Sizes.scale(25)}px;
	border-top-right-radius: ${Sizes.scale(25)}px;
`

const SubmitButton = styled(BlackButton)`
`

const Header = styled.View`
	height: ${Sizes.scale(50)}px;
	${Styles.center}
	border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${themeProp('colorInputBorder')};
`

const PhotosSection = styled.View`
	padding-top: 15px;
	margin-top: 10px;
	width: 100%;
	${Styles.center}
	border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${themeProp('colorInputBorder')};
`

const HeaderTitle = styled(StyledText)`
	font-size: ${Sizes.scale(14)}px;
	font-weight: bold;
`
const Bottom = styled.View`
	padding-horizontal: ${Spacing.MD}px;
	padding-top: ${Spacing.MD}px;
	padding-bottom: ${Spacing.XL}px;
`

const StarContainer = styled.View`
	align-items:center;
	justify-content: center;
	margin-vertical: 15px;
`

const CameraButton = styled.TouchableOpacity`
	padding: 5px;
`

const _thumbnailSize = 57;
const PhotosView = ({ photos, onRemove }) => {
  const { state } = useOvermind();
  const { window } = state;
  if (photos.length == 0) {
    return (null)
  }
  const style = {
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: window.width
  }
  return (
    <PhotosScrollView horizontal contentContainerStyle={style}>
      {
        photos.map((p, index) => {
          return (
            <Photo key={index} source={p.source} onPressRemove={() => onRemove(p, index)} />
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

const Photo = ({ source, onPressRemove }) => {
  return (
    <ReviewImageContainer>
      <ReviewImage resizeMode='cover' source={source} />
      <RemoveImageButton onPress={onPressRemove} />
    </ReviewImageContainer>
  )
}

const ReviewImageContainer = styled.View`
	width: ${_thumbnailSize}px;
	height: ${_thumbnailSize}px;
	margin-left:5px;
	margin-right:5px;
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

const RemoveImageButton = (props) => {
  return (
    <RemoveImageButtonContainer {...props}>
      <Feather name='x' color='black' size={14} />
    </RemoveImageButtonContainer>
  )
}

const RemoveImageButtonContainer = styled.TouchableOpacity`
  border-radius: 10px;
	width: 20px;
	height: 20px;
  background-color: white;
  align-items: center;
	justify-content: center;
`
