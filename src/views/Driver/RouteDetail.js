import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { FlatList, ScrollView, View, Alert, SectionList } from 'react-native';

import { YellowButton, MainSemiBoldFont, MainRegularFont, MainBoldFont } from '@/views/Components';
import { BottomContainer } from '@/views/Components/BottomContainer';
import BaseScreen from '@/views/Components/BaseScreen';
import { Images } from '@/styles';
import { Spacing, FontSize } from '@/styles/Sizes';
import DeliverModal from '@/views/Modals/DeliverModal';

const DeliverInfo = ({ location, date }) => (
  <SectionView>
    <SectionTitle>DELIVER TO</SectionTitle>
    <DeliverToContainer>
      <DeliverToLeft>
        <Deliver>
          <DeliverLocation>{location}</DeliverLocation>
        </Deliver>
      </DeliverToLeft>
      <DeliverToRight>
        <DeliverTime>{date}</DeliverTime>
      </DeliverToRight>
    </DeliverToContainer>
  </SectionView>
)

const Customer = ({ user, description }) => (
  <SectionContainer>
    <Status>CUSTOMER</Status>
    <HostContent>
      <UserContainer>
        <Avatar source={{ uri: user?.avatar || '' }} />
        <UserName>{user?.fullName}</UserName>
      </UserContainer>
      <EventDescription>{description}</EventDescription>
    </HostContent>
  </SectionContainer>
)

const NoteSection = ({ description }) => {
  return (
    <SectionContainer>
      <Status>DELIVERY NOTES</Status>
      <Description style={{ marginLeft: 20 }}>{description}</Description>
    </SectionContainer>
  )
}

const ManifestSection = ({ items }) => {

  return (
    <SectionContainer>
      <Status>MANIFEST</Status>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ItemContainer>
            <RectAvatar source={{ uri: item.product?.images[0]?.url || "" }} />
            <ItemBody>
              <ItemName>{item.product.name}</ItemName>
              <ItemDescription>{item.product.description}</ItemDescription>
            </ItemBody>
          </ItemContainer>
        )}
      />
    </SectionContainer>
  )
}

const RouteDetail = (props) => {

  const [visible, setVisible] = useState(false)

  const region = {
    longitude: 30,
    latitude: 120,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01
  }

  const route = useRoute();
  const { name, avatar, raw: { deliverTo, items, notes, id } } = route.params;

  return (
    <BaseScreen modal title={name}>
      <Background>
        <ScrollView >
          <MapViewContainer>
            <MyMapView
              initialRegion={region}
            >
              <Marker
                coordinate={region}
              >
                <LogoIcon source={Images.logo.chewbox} />
              </Marker>
            </MyMapView>
          </MapViewContainer>
          <DeliverInfo
            location={deliverTo.name + "\n" + deliverTo.address + "\n" + deliverTo.city + " " + deliverTo.state + " " + deliverTo.postalCode}
            date={"11AM-1PM"}
          />
          <Spacer />

          <Customer
            description={""}
            user={{ fullName: name, avatar }}
          />
          <Spacer />
          <ManifestSection
            items={items}
          />
          <Spacer />
          <NoteSection
            description={notes || "No delivery notes posted."}
          />
          <BottomMargin />
        </ScrollView>
        <BottomContainer>
          <YellowButton onPress={() => setVisible(true)}>MARK AS DELIVERED</YellowButton>
        </BottomContainer>
      </Background>
      <DeliverModal
        orderId={id}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </BaseScreen>
  )
}

export default RouteDetail

const SectionContainer = styled.View`
  padding: 20px;
`

const Background = styled.View`
  flex:1;
  background-color: white;
`

const Description = styled(MainRegularFont)`
  font-size: 11px;
  line-height: 19px;
  color: #3F3F3F;
`

const Status = styled(MainBoldFont)`
  font-size: 14px;
  line-height: 19px;
  color: #3F3F3F;
  margin-bottom: 5px;
`

const SectionView = styled.View`
	  align-self:stretch;
	  background-color:white;
    padding-horizontal:${Spacing.LG}px;
    padding-vertical: 10px;
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
    max-width: 70%;
`

const DeliverToRight = styled.View`
	  justify-content: space-between;
	  margin-left:10px;
	  align-items: center;
`

const Deliver = styled.View`
	  align-items:flex-start
	  margin-bottom:13px;
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

const MyMapView = styled(MapView)`
    width: 100%;
    height: 180px;
`

const MapViewContainer = styled.View`
    border-top-width: 1px;
    border-top-color: #D8D8D8;
    border-bottom-width: 1px;
    border-bottom-color: #D8D8D8;
    margin-bottom:-20px;
`

const Spacer = styled.View`
  background-color: #EDEDED;
  height: 9px;
`


const Avatar = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #DBDBDB;
    resize-mode: cover;
    margin: 5px;
`

const UserName = styled(MainRegularFont)`
    font-size: 10px;
    line-height: 13px;
    color: #3f3f3f;
    text-align: center;
`

const UserContainer = styled.View`
  align-items: center;
  width: 90px;
`

const HostContent = styled.View`
  flex-direction: row;
  margin-top: 10px;
`

const EventDescription = styled(MainRegularFont)`
  color: #3F3F3F;
  font-size: 12px;
  margin-left: 10px;
  text-align: justify;
  line-height: 19px;
  flex: 1;
`

const LogoIcon = styled.Image`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`

const ItemContainer = styled.View`
    flex-direction: row;
    margin: 5px;
    margin-left: 20px;
`

const RectAvatar = styled.Image`
    width: 57px;
    height: 57px;
    background-color: #C4C4C4;
`

const ItemBody = styled.View`
    margin-left: 10px;
    flex: 1;
`

const ItemName = styled.Text`
    font-size: 13px;
    color: #3F3F3F;
    font-weight: bold;
`

const ItemDescription = styled.Text`
    font-size: 12px;
    color: #3F3F3F;
    flex: 1;
    text-align: justify
`

const BottomMargin = styled.View`
    height: 80px;
`