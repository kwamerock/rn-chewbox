import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { Alert, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { isEmpty, defaultTo } from 'lodash';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import { KitchenHeader, KitchenItem, SearchHeader } from '@/views/Kitchens/KitchenItem';
import { useLoadingHud } from '@/hooks/Utils';
import { BaseTextInput, BlackButton, MainBoldFont, MainRegularFont, TabScreen } from '@/views/Components';
import { useOvermind } from '@/store';

/**
 * Rule of thumb : Define refs first!
 * @param {[type]} props [description]
 */

const Kitchens = props => {
  const { state, actions } = useOvermind();
  const { currentUser } = state;
  
  const [keyword, setKeyword] = useState('');

  console.log('RENDERING KITCHENS...')

  useEffect(() => {
    actions.site.getSites({ where: { 'groups_some': { name: 'kitchen' } } });
    console.log("==========>kitchens", state.site.siteList(state.site));

    actions.cart.setSoldOutDays();
    console.log('rendering Kitchen...', 'isSoldOut');
  }, []);

  // useLoadingHud(loading);

  const kitchens = state.site.siteList(state.site).sort((a, b) => a.sortOrder - b.sortOrder)

  const goSearch = () => {
    props.navigation.navigate("Search", { keyword })
  }

  const isEventCart = () => {
    return props.route.params?.event != null
  }

  const isAdmin = () => {
    return (props.route.params?.event?.creator?.id == currentUser.id)
  }

  const onCloseModal = () => {
    // if (isEventCart() && isAdmin()) {
    //     Alert.alert("Warning", "Please complete your meal order in order to finish creating this event.", [
    //         { text: "Continue Ordering", onPress: () => { } },
    //         {
    //             text: "Cancel Event", onPress: () => {
    //                 GlobalStore.cancelEvent(props.route.params?.event?.id, user.id);
    //                 props.navigation.navigate("EventList");
    //             }
    //         }
    //     ])
    // } else {
    //     props.navigation.pop()
    // }
    props.navigation.pop()
  }

  // if (isEventCart() && isAdmin()) {
  //     props.navigation.setOptions({ gestureEnabled: false })
  // }

  const onLike = async (site) => {
    const likeId = site.likes.find(o => o.user.id == currentUser.id)?.id;
    await actions.like.like({ siteId: site.id, userId: currentUser.id, likeId });

    actions.site.getSites({ where: { 'groups_some': { name: 'kitchen' } } });
  }

  const renderContent = () => {
    return (
      <KitchenList
        refreshing={state.site.isLoading}
        onRefresh={()=>actions.site.getSites({ where: { 'groups_some': { name: 'kitchen' } } })}
        data={[...kitchens]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <KitchenItem
            {...item}
            like={item.likes.find(o => o.user.id == currentUser.id) != null}
            onPress={() => props.navigation.navigate("KitchenDetail", {
              data: item,
              id: props.route.params?.event?.id,
              context: props.route.params?.context
            })}
            onLike={() => onLike(item)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={() => <FlatListFooter />}
      />
    )
  }

  const renderNavBar = () => {
    return (
      <SearchBarContainer style={{ backgroundColor: '#F1F1F2' }}>
        <SearchBar>
          <Feather flexDirection="row" name="search" size={14} color="#636363" />
          <SearchText
            placeholder="Search"
            placeholderTextColor='#8e8e93'
            value={keyword}
            onChangeText={setKeyword} />
          {keyword.length > 0 && <GoButton onPress={goSearch}>GO</GoButton>}
        </SearchBar>
      </SearchBarContainer>
    )
  }

  const renderHeader = () => {
    return (
      <SearchBarContainer style={{ width: '100%' }}>
        <SearchBar>
          <Feather flexDirection="row" name="search" size={14} color="#636363" />
          <SearchText
            placeholder="Search"
            placeholderTextColor='#8e8e93'
            value={keyword}
            autoCorrect={false}
            onChangeText={setKeyword} />
          {keyword.length > 0 && <GoButton onPress={goSearch}>GO</GoButton>}
        </SearchBar>
      </SearchBarContainer>
    )
  }

  return (
    <TabScreen {...props}>
      {isEventCart() && <PaddingView >
        <Title>Ordering Food</Title>
        <EventText>{props.route.params?.event.name}</EventText>
      </PaddingView>}

      <ReactNativeParallaxHeader
        headerMinHeight={30}
        headerMaxHeight={50}
        navbarColor="white"
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        renderHeader={renderHeader}
        containerStyle={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        innerContainerStyle={{ flex: 1 }}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
        alwaysShowNavBar={false}
        alwaysShowTitle={false}
        scrollViewProps={{ refreshControl: <RefreshControl onRefresh={()=>actions.site.getSites({ where: { 'groups_some': { name: 'kitchen' } } })} refreshing={state.site.isLoading} /> }}
      />

      {props.route.params?.event != null &&
        <CloseButton onPress={onCloseModal}>
          <Feather name="x" size={24} color="white" />
        </CloseButton>
      }
    </TabScreen>
  );
};

export default Kitchens;

const SearchBarContainer = styled.View`
  background-color:white;
  padding-bottom:10px;
`

const KitchenList = styled.FlatList`
  padding: 15px;
  background-color: white;
`

const SearchBar = styled.View`
  height: 36px;
  border-radius: 10px;
  background-color: #F1F1F2;
  margin-horizontal: 15px;
  margin-top: 15px;
  color: black;
  font-size: 14px;
  flex-direction:row;
  align-items:center;
  padding-left:8px;
  padding-right: 2px;
`

const SearchText = styled(BaseTextInput)`
  color: black;
  font-size:14px;
  margin-left:10px;
  font-weight: bold;
  flex: 1;
`

const ItemSeparator = styled.View`
  height: 20px;
`
const PaddingView = styled.View`
  width:100%;
  height: 60px;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
  z-index: 1000;
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
  z-index: 1001
`

const GoButton = styled(BlackButton)`
  border-radius: 10px;
  width: 70px;
  height: 32px;
`

const Title = styled(MainBoldFont)`
  font-size: 14px;
  color: black;
`

const EventText = styled(MainRegularFont)`
  font-size: 13px;
  color: black;
`

const FlatListFooter = styled.View`
	height:80px;
`
