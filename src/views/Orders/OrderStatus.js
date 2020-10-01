import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { MainBoldFont, MainRegularFont, MainLightFont } from '@/views/Components';
import { Images } from '@/styles';

const OrderStatus = (props) => {

  const [starCount, setStarCount] = useState(0)
  const region = {
    longitude: props.deliverTo?.gps?.lon || 0,
    latitude: props.deliverTo?.gps?.lat || 0,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  }

  const isCancelled = (props.isCancelledByCustomer || props.isCancelledByOperator)
  const getTime = () => {
    return moment(props.deliverBy).calendar().toUpperCase()
  }

  return (
    <Fragment>
      {(!props.isDelivered && !isCancelled) ?
        <Container>
          <StatusText>{props?.isOnTheWay ? "OUT FOR DELIVERY" : ""}</StatusText>
          <DateText>{props?.isOnTheWay ? "ETA" + getTime() : ''}</DateText>
          <MapViewContainer>
            <MyMapView initialRegion={region}>
              <Marker coordinate={region}>
                <LogoIcon source={Images.logo.chewbox} />
              </Marker>
            </MyMapView>
          </MapViewContainer>
        </Container> :
        <Container>
          <StateView>
            <Ionicons
              name={isCancelled ? 'ios-close-circle' : 'ios-checkmark-circle'}
              size={24}
              color={isCancelled ? '#B70000' : '#1FDE00'}
            />
            <StateText>{isCancelled ? 'CANCELLED' : (props.isReviewed ? 'REVIEWED' : 'DELIVERED')}</StateText>
          </StateView>
        </Container>
      }
    </Fragment>
  )
}

export default OrderStatus;

const Container = styled.View`
  margin-bottom: 150px;
  background-color: white;
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
`

const StatusText = styled(MainBoldFont)`
  color: black;
  font-size: 14px;
  text-align: center;
`

const DateText = styled(MainBoldFont)`
  color: grey;
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;
`

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StateText = styled(MainRegularFont)`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin-left: 5px;
`

const LogoIcon = styled.Image`
  width: 30px;
  height: 30px;
  resize-mode: contain;
`
