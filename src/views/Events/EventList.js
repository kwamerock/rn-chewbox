import React, { Fragment, useState } from 'react';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import moment from 'moment';
import { SectionList, Button, RefreshControl, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { ItemSeparator } from '@/views/Components/ListItemContainer';
import { FilterTab, FilterStickyTab, NavBarFilter, StyledText, Container, NavBarContainer, CloseButton, BlackButton, BottomContainer, MainBoldFont } from '@/views/Components';
import { Images } from '@/styles';
import { Spacing } from '@/styles/Dimension';
import { themeProp } from '@/utils/CssUtil';
import EventPlaceholder from '@/views/Events/EventPlaceholder';
import EventItem from '@/views/Events/EventItem';
import { useOvermind } from '@/store';

const EventList = props => {
  const { state, actions } = useOvermind();
  const { currentUser } = state;

  actions.event.getEvents({userId: currentUser.id});
  
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);

  function onClose() {
    props.navigation.pop()
  }

  function onNewEvent() {
    navigation.navigate('CreateEvent', { refetch: ()=> actions.event.getEvents({userId: currentUser.id}) } );
  }

  console.log(state.event.eventsList(state.event), 'event list=======>');

  const renderHeader = () => {
    return (
      <FilterTab
        titles={["UPCOMING", "PAST"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
        }}
        style={{ backgroundColor: "#EAEAEA" }}
      />
    )
  }

  const renderNavBar = () => {
    return (
      <FilterStickyTab
        titles={["UPCOMING", "PAST"]}
        selected={selected}
        onPress={(index) => {
          setSelected(index)
        }}
      />
    )
  }

  const getData = () => {
    return state.event.eventsList(state.event)
      .filter(o => (
        selected === 1 ? (moment(o.days[0]?.startDate) < moment() || o.isCancelled)
          : !(moment(o.days[0]?.startDate) < moment() || o.isCancelled)))
      .sort((a, b) => (new Date(a.days[0]?.startDate) - new Date(b.days[0]?.startDate)))
  }

  const data = getData();

  const renderContent = () => {
    return (
      <Fragment>
        <EventPlaceholder isLoading={state.event.isLoading} />

        {data && data.length == 0 &&
          <EmptyContainer>
            <EmptyLogo source={Images.icons.Hat2B} />
            <BigString>Introducing Events</BigString>
            <EmptyString>
              Introducing Events Chewbox makes it easy for groups of people to enjoy meals delivered at the same time. Treat your friends, go dutch, or donate meals recipients can customize. All meals come to one location in the same delivery. Set a specific time of day. $50 minimum.
            </EmptyString>
          </EmptyContainer>
        }

        {data && data.length > 0 &&
          <FlatList
            // refreshing={vm.loading}
            // onRefresh={vm.refetch}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={prop => (<EventItem {...prop} />)}
            // ItemSeparatorComponent={() => <ItemSeparator />}
            // ListHeaderComponent={() => <EmptyHeader />}
            ListFooterComponent={() => <BottomPadding />}
          />
        }
      </Fragment>
    )
  }

  return (
    <Container>
      <MyNavBarContainer>
        <NavBarLeft>
          <CloseButton name="chevron-left" onPress={onClose} />
        </NavBarLeft>
        <Title>EVENTS</Title>
        {/*<NavBarFilter title='EVENT FILTER' filter='Showing all events' />*/}

        <NavBarRight>
          <CloseButton style={{ opacity: 0 }} disabled />
        </NavBarRight>
      </MyNavBarContainer>

      <ReactNativeParallaxHeader
        headerMinHeight={30}
        headerMaxHeight={50}
        navbarColor="white"
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        renderHeader={renderHeader}
        containerStyle={{ flex: 1, backgroundColor: '#EAEAEA' }}
        contentContainerStyle={{ flexGrow: 1 }}
        innerContainerStyle={{ flex: 1 }}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
          refreshControl: <RefreshControl onRefresh={actions.event.getEvents({userId: currentUser.id})} refreshing={state.event.isLoading} />
        }}
        alwaysShowNavBar={false}
        alwaysShowTitle={false}
        headerTitleStyle={{ backgroundColor: '#EAEAEA' }}
      />
      <BottomContainer>
        {<CreateButton onPress={onNewEvent}>CREATE EVENT</CreateButton>}
      </BottomContainer>
    </Container>
  )
};

const Bottom = styled.View`
  padding-horizontal: ${Spacing.XL}px;
  padding-bottom: ${Spacing.XL}px;
`;

const CreateButton = styled(BlackButton)`
`;

const SmallCreateButton = styled(BlackButton)`
  height: 24px;
  width: 200px;
  margin-top: 30px;
  border-radius: 4px;
`

const EmptyHeader = styled.View`
  width: 100%;
  height: 29px;
`;

const MyNavBarContainer = styled(NavBarContainer)`
  justify-content: space-between;
`;

const NavBarLeft = styled.View`
  margin-right:30px;
`;

const NavBarRight = styled.View`
  align-items:flex-end;
  margin-left:30px;
`;

const Title = styled(StyledText)`
  font-size: ${themeProp('szTextNavBar')};
  font-weight: ${themeProp('fontWeightNavBar')};
`;

const EmptyContainer = styled.View`
  padding:30px;
  align-items:center;
`

const EmptyString = styled(MainBoldFont)`
  font-size: 14px;
  color:#B8B8B8
  line-height: 30px;
  text-align:center;
  margin-top:30px;
`

const BottomPadding = styled.View`
  height: 80px;
`

const BigString = styled(MainBoldFont)`
  font-size: 24px;
  color: #B8B8B8;
`

const EmptyLogo = styled.Image`
  opacity: 0.25;
  width: 180px;
  height: 180px;
  resize-mode: contain;
`

export default EventList;
