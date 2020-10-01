import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';

const PlaceholderItem = ({ duration = 1500 }) => (
  <ItemContainer>
    <RoundRect duration={duration} autoRun />
  </ItemContainer>
)

const EventPlaceholder = ({ isLoading }) => isLoading ? (
  <Container>
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
  </Container>
) : null;

export default EventPlaceholder;

const Container = styled.View`
  padding: 20px;
  background-color: white;
`

const RoundRect = styled(ShimmerPlaceHolder)`
  width: 100%;
  height: 132;
  border-radius: 15px;
`

const ItemContainer = styled.View`
  padding-vertical: 15px;
`