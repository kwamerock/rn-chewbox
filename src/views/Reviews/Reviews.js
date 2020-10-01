import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { get } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { StyledText, Container, BlackButton, MainRegularFont, MainBoldFont } from '@/views/Components';
import { ItemSeparator } from '@/views/Components/ListItemContainer';
import { Spacing, } from '@/styles/Sizes';
import ReviewItem from '@/views/Reviews/ReviewItem';
import CommentModal from '@/views/Modals/WriteCommentModal';
import { Constants } from '@/Constants';
import NotificationTitle from '@/views/Notifications/NotificationTitle';
import GradientView from '@/views/Components/GradientView';
import { themeProp } from '@/utils/CssUtil';
import { BottomContainer } from '@/views/Components/BottomContainer';
import { useOvermind } from '@/store';

const point_description = `You can send points to other users as well as your favorite food related charities. Points can be used to purchase meals. 100 points = $1. Every consecutive day you purchase a meal using Chewbox, you earn 100 points to save, use, or share.`

/*
*
*/
const OrderList = (props) => {
  const { state } = useOvermind();
  const navigation = useNavigation();

  const selected = props?.items?.find(o => o.product && o.product.isAddOn == false);

  console.log("+++here----->OrderList", selected, props);

  if (selected == null) return null;
  const uri = (selected.product.images && selected.product.images.length > 0) ? selected.product.images[0].url : "";

  const goProductDetail = async (id) => {
    console.log("====>get product", state.product.products[id], id);
    navigation.navigate("FoodDetail", { data: state.product.products[id] });
  }

  return (
    <ProductContainer2 onPress={() => goProductDetail(selected?.product?.id)}>
      <Left>
        <RectAvatar source={{ uri: uri || "" }} />
        <RatingText>
          <Feather name="star" size={12} color="grey" />
          {' ' + selected && get(selected, 'product.rating', false) ? get(selected, 'product.rating', false).toFixed(1) : ''}
        </RatingText>
      </Left>
      <Right>
        <ItemTitle>{selected.product.name}</ItemTitle>
        <Description>{selected.product.description}</Description>
        <ItemSubTitle><Feather
          name="check-circle"
          size={13}
          color={"green"}
          paddingRight={'6px'}
        /> Meal set for {selected.deliverBy ? moment(selected.deliverBy).format('YYYY-MM-DD') : ''}</ItemSubTitle>
      </Right>
    </ProductContainer2>
  )
}

/*
*
*/
const ProductCommentHeader = (props) => {
  return (
    <ProductHeader>
      <ProductName>{props.name}</ProductName>
      <ProductReviews>{props.comments.length} Reviews</ProductReviews>
    </ProductHeader>
  )
}

/*
*
*/
const CommentHeader = ({ navigation, ...props }) => (
  <HeaderContainer>
    {props.type != "POINT" && props.type != "REVIEW" && <AvatarContainer>
      <Avatar source={{ uri: props.contentUser?.avatar || "" }} />
    </AvatarContainer>}

    {props.type == "REVIEW" && <AvatarContainer>
      <Avatar source={{ uri: props.product.images[0].url || "" }} />
    </AvatarContainer>}


    {props.type == "POINT" && <TwoAvatarContainer>
      <Avatar source={{ uri: props.contentUser?.avatar || "" }} style={{ position: 'absolute', left: 0 }} />
      <Avatar source={{ uri: props.secondaryUser?.avatar || "" }} style={{ position: 'absolute', right: 0 }} />
    </TwoAvatarContainer>}

    {(props.type == "BASIC" || props.type == "RIDDLE") ?
      <Link>{props.title}</Link> :
      <NotificationTitle Link={Link} Text={Normal} title={props.sentence} />
    }

    {props.type == "POINT" && <ProductContainer>
      <Description>{point_description}</Description>
    </ProductContainer>}
    {(props.type == "BASIC" || props.type == "RIDDLE") && <ProductContainer>
      <Description>{props.description}</Description>
    </ProductContainer>}

    {props.type == "MEAL_PLAN" &&
      <FlatList
        data={[props.order]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <OrderList {...item} />}
      />}

    {props.type == "REVIEW" && <ProductContainer>
      <Left>
        <SmallAvatar source={{ uri: props.contentUser.avatar || "" }} />
        <RatingText>
          <Feather name="star" size={12} color="grey" />
          {' ' + (props.comment.rating?.toFixed(1) || "0.0")}
        </RatingText>
      </Left>
      <Right>
        <ItemTitle>{props.comment.subject}</ItemTitle>
        <Description>{props.comment.message}</Description>
        <PhotosView style={{ marginLeft: 10, marginTop: 10 }} photos={(props.comment?.images ?? []).map(i => ({ source: { uri: i.url || "" } }))}></PhotosView>
      </Right>
    </ProductContainer>}

    {props.type == "INVITED_YOU" &&
      <ProductContainer>
        <Left>
          <RectAvatar source={{ uri: props.site.images.length > 0 ? props.site.images[0].url : "" }} />
        </Left>
        <Right>
          <ItemTitle>{props.site.name}</ItemTitle>
          <Description>{props.site.address} {props.site.address2}</Description>
          <Description>{props.site.city} {props.site.state} {props.site.postalCode}</Description>
        </Right>
      </ProductContainer>}

    {/* {props.type == "NEW_EVENT" &&
			<ProductContainer>
				<Left>
					<RectAvatar source={{ uri: props.site.images.length > 0 ? props.site.images[0].url : "" }} />
				</Left>
				<Right>
					<ItemTitle>{props.site.name}</ItemTitle>
					<Description>{props.site.address} {props.site.address2}</Description>
					<Description>{props.site.city} {props.site.state} {props.site.postalCode}</Description>
				</Right>
			</ProductContainer>} */}

    {props.type == "INVITED_YOU" && <HeaderBottom>
      <OrderButton
        onPress={() => props.hasOrder ?
          navigation.navigate("EventOrderDetail", { event: props.event }) :
          navigation.navigate('Kitchens', { event: props.event })
        }
      >
        {props.hasOrder ? "View Event" : "Order Food"}
      </OrderButton>
      <Description>Paid by {props.event.days[0].paymentSetting == "EACH_PAY" ? "guest" : "host"}</Description>
    </HeaderBottom>}
  </HeaderContainer>
)

/*
*
*/
export default Component = (props) => {
  const { state, actions } = useOvermind();
  const { currentUser } = state;

  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { product, alert } = props.route.params;

  // const fnClearProvide = React.useCallback((fnClear) => {
  //   // vm.clearCommentRef.current = fnClear
  // }, [])

  console.log("=====>review", alert);

  useEffect(() => {
    fetchComments()
    if (alert) {
      actions.comment.markNotificationRead({ message: { id: alert.id }, userId: currentUser.id });
    }
  }, []);

  const fetchComments = async () => {

    const variables = alert ? { notificationId: alert.id } : (product ? { productId: product.id } : {})
    setLoading(true);

    await actions.comment.getComments(variables);

    setLoading(false);

    console.log("getComment===>", variables, error, result);

    if (error == null && result.errors == null) {
      console.log(props.route.params.alert, result.data.getComments)
      if (alert && alert.comment) {
        setComments(result.data.getComments
          .filter(o => o.id != props.route.params?.alert?.comment?.id && o.parentComment == null))
      } else {
        setComments(result?.data?.getComments.filter(o => o.parentComment == null))

      }

    }
  }

  const createComment = async (message) => {
    setShowModal(false)
    setLoading(true)

    let variables = {
      user: { id: currentUser.id },
      message
    }

    if (currentItem == null) {
      variables['notification'] = { id: alert.id }
    } else {
      variables['parentCommentId'] = currentItem?.id
    }

    actions.comment.createComment(variables);

    // if (error == null && result.errors == null) {
    //   fetchComments()
    // } else {
    //   setLoading(false)
    // }
  }

  const openModal = (item) => {
    setShowModal(true)
    setCurrentItem(item)
  }

  loadMore = (item) => {
    item.initialized = true;
    setComments([...comments])
  }

  const hasOrder = () => {
    return get(alert, "event.orders.length", 0) > 0 && alert.event.orders.filter(o => o.user.id === currentUser.id).length > 0
  }

  return (
    <Screen>
      {product != null &&
        <ProductCommentHeader {...product} comments={comments || []} />}
      <ScrollView>
        {alert != null && <CommentHeader {...alert} navigation={props.navigation} type={product ? "REVIEW" : alert.type} hasOrder={hasOrder()} />}

        {comments && comments.length > 0 &&
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <ReviewItem
                noSubject={product == null}
                {...item}
                onReplyPressed={() => openModal(item)}
                loadMore={() => loadMore(item)}
                refresh={fetchComments}
                like={item.likes?.find(o => o.user.id == currentUser.id) != null}
              />
            )}
            ItemSeparator={ItemSeparator}
            ListFooterComponent={FooterComponent}
            style={{ marginBottom: 50 }}
          />}

        {comments == null || comments.length == 0 &&
          <EmptyContainer>
            <Feather name="message-square" size={40} color="#636363" />
            <EmptyString>Be the first to leave comment.</EmptyString>
            <EmptyString>Tap button below.</EmptyString>
          </EmptyContainer>
        }
      </ScrollView>
      {props.route.params.product == null && <BottomContainer>
        <BlackButton onPress={() => openModal(null)}>COMMENT</BlackButton>
      </BottomContainer>}
      <CommentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={comment => createComment(comment)}
        title={props.title || ""}
        comment={""}
      />
      <CloseButton onPress={() => props.navigation.pop()}>
        <Feather name="x" size={24} color="white" />
      </CloseButton>
    </Screen>
  )
}

const FooterComponent = styled.View`
  width: 100%;
  height: ${Spacing.XL}px;
`

const PaddinView = styled.View`
  height: 60px;
  background-color: white;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #ddd
`

const Screen = styled(Container)`
	background-color: #f8f8f8;
`

const Title = styled(StyledText)`
  color: black;
  font-size: 16px;
	line-height: 20px;
	text-align: center;
`;

const ItemTitle = styled(MainBoldFont)`
	color: black;
	font-size: 14px;
	margin-left: 10px;
	margin-bottom: 3px;
`

const ItemSubTitle = styled(MainRegularFont)`
	color: #3F3F3F;
	font-size: 12px;
	margin-left: 10px;
	margin-top: 10px;
	font-style: italic;
`

const Bold = styled(Title)`
	font-weight: bold;
`;

const HeaderContainer = styled.View`
	padding-top: 50px;
	padding-horizontal: 30px;
	padding-vertical: 30px;
	border-bottom-width: 1px;
	border-bottom-color: #DDDDDD
`

const AvatarContainer = styled.View`
	align-items: center;
	margin: 10px;
	padding-bottom: 15px;
`

const TwoAvatarContainer = styled.View`
	width:180px;
	height: 100px;
	margin-vertical: 10px;
	margin-left:${Constants.ScreenWidth / 2 - 120}px;
`

const Avatar = styled.Image`
	height: 100px;
	width: 100px;
	border-radius: 50px;
	background-color: #D8D8D8
`

const ProductContainer = styled.View`
	flex-direction: row;
	margin-top: 20px;
`

const ProductContainer2 = styled.TouchableOpacity`
	flex-direction: row;
	margin-top: 20px;
`

const Left = styled.View`
	align-items:center;
`

const Right = styled.View`
	flex: 1;
	align-items:flex-start;
`

const RectAvatar = styled.Image`
	width:57px;
	height: 57px;
	background-color: #C4C4C4;
`

const RatingText = styled(MainBoldFont)`
	font-size: 12px;
	line-height: 15px;
	color:#6C6C6C;
	margin-top: 5px;
`

const Description = styled(MainRegularFont)`
	font-size: 12px;
	line-height: 19px;
	color: #3F3F3F;
	margin-left: 10px;
	flex: 1;
	text-align: justify;
`
const Bottom = styled(GradientView)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding-horizontal: 20px;
	padding-vertical: 30px;
`

const Link = styled(MainBoldFont)`
	color: black;
	font-size: 14px;
`

const Normal = styled(MainRegularFont)`
	color: black;
	font-size: 14px;
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
  width:30px;
  height:30px;
  borderRadius: 15px;
  backgroundColor: black;
  alignItems: center;
  padding-left:1px;
  padding-top:1px;
  justifyContent: center;
`

const ProductHeader = styled.View`
	height: 60px;
	width: 100%;
	padding-horizontal: 20px;
	justify-content: center;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-color: #DDDDDD
	background-color: white;
`
const ProductName = styled(MainBoldFont)`
	font-size: 14px;
	color: black;
`

const ProductReviews = styled(MainRegularFont)`
	font-size: 13px;
	color: #000000;
`

const HeaderBottom = styled.View`
	width: 100%;
	margin-top: 20px;
	align-items:center;
`

const OrderButton = styled(BlackButton)`
	height: 46px;
	margin-bottom:10px;
`

const SmallAvatar = styled.Image`
  width: ${themeProp('szAvatarSmall')};
  height: ${themeProp('szAvatarSmall')};
  border-radius: ${props => props.theme.szAvatarSmall / 2}px;
`;

const EmptyContainer = styled.View`
  padding:30px;
  align-items:center;
`

const EmptyString = styled(MainBoldFont)`
  font-size: 12px;
  color:#636363
  line-height: 20px;
  text-align:center;
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
const PaddinBottom = styled.View`
	height: 60px;
`
